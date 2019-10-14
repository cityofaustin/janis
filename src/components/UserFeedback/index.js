import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import parser from 'ua-parser-js';

import {
  form as i18n1,
  userFeedback as i18n2,
  emoji as i18n3,
} from 'js/i18n/definitions';
import { postFeedback } from 'js/helpers/fetchData';
import { logFormEvent } from 'js/helpers/googleAnalytics';
import { emojis } from 'js/helpers/emojis';
import SectionHeader from 'components/SectionHeader';

class UserFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      loading: false,
      feedback: null,
      error: null,
      feedbackSubmitted: false,
      buttonValue: null,
    };
    this.toggleYesButton = this.toggleYesButton.bind(this);
    this.toggleNoButton = this.toggleNoButton.bind(this);
  }

  logEvent(action, optionalData) {
    logFormEvent({
      formName: this.state.name,
      formStep: this.state.step,
      formAction: action,
      optionalData: optionalData,
    });
  }

  toggleYesButton() {
    if (this.state.buttonValue === 'yes') {
      this.setState({buttonValue: null})
    } else {
      this.setState({buttonValue:'yes'})
    }
    console.log(this.state)
  }

  toggleNoButton() {
    if (this.state.buttonValue === 'no') {
      this.setState({buttonValue: null})
    } else {
      this.setState({buttonValue: 'no'})
    }
  }

  renderButton() {
    const { intl } = this.props;
    if (this.state.loading) {
      return (
        <button 
          type="button"
          className="coa-UserFeedback__button-sending"
          onClick={null}
        >
         Sending <div className="coa-UserFeedback__button-loading"></div>
        </button>
        /*<input
          type="button"
          value="Sending..."
          onClick={null}
          className="coa-UserFeedback__button-loading"
        /> */
      )
    } 
    if (this.state.success) {
      return (
        <input
          type="button"
          value="✓" // where do i get this
          onClick={this.handleSubmit}
        />
      )
    }
    return (
      <button
        type="button"
        onClick={this.handleSubmit}
        className="coa-UserFeedback__button-submit"
      > 
        {intl.formatMessage(i18n2.submit)}
      </button>
      )
  }

  handleTextAreaChange = e => {
    this.setState({
      feedback: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    console.log('submit')
    e.preventDefault();

    const { buttonValue } = this.state;

    // todo: bring this back
    // this.logEvent('send-feedback-click', {
    //   feedback: this.state.feedback,
    //   emojiValue: emojiValue,
    //   emojiText: emojiText,
    // });

    // are we allowed to submit empty feedback, as long as they selected yes or no?
    // if (!this.state.feedback) {
    //   this.setState({
    //     step: 3,
    //     emoji: null,
    //     feedback: null,
    //     error: null,
    //   });
    //   return;
    // }

    this.setState({
      loading: true,
      // feedbackSubmitted: true,
    });

    // postFeedback({
    //   title: 'Alpha Site Feedback',
    //   description: `Did they find what they were looking for:**\n${buttonValue}\n
    //     \n**Text feedback:**\n${this.state.feedback}\n
    //     \n**Url:**\n${window.location.href}\n
    //     \n**Device Information:** \n\`\`\`\n${JSON.stringify(
    //       parser(),
    //       null,
    //       2,
    //     )}\n\`\`\`\n\n`,
    // })
    //   .then(({ data }) => {
    //     console.log(data);
    //     this.setState({
    //       step: 3,
    //       loading: false,
    //       emoji: null,
    //       feedback: null,
    //       error: null,
    //     });
    //   })
    //   .catch(e => {
    //     console.log(JSON.stringify(e))
    //     //TODO: better handle error messaging
    //     this.logEvent('post-error', e.response);
    //     console.log('ERROR:', e);

    //     this.setState({
    //       loading: false,
    //       error: true,
    //     });
    //   });
  };

  render() {
    const { intl } = this.props;
    const yesButtonStyle = this.state.buttonValue === 'yes' ? "coa-UserFeedback__button-selected"
      : "coa-UserFeedback__button-dimmed" ;
    const noButtonStyle = this.state.buttonValue === 'no' ? "coa-UserFeedback__button-selected"
      : "coa-UserFeedback__button-dimmed" ;

    return (
      <div className="coa-UserFeedback">
        {this.state.feedbackSubmitted
          ? <div className="coa-UserFeedback__thankYou">
                <h3> {intl.formatMessage(i18n2.received)}</h3>
                <p> {intl.formatMessage(i18n2.thankYou)}</p>
                ✓
              </div>
          :
            <form className="coa-UserFeedback__form">
              <div className="coa-UserFeedback__prompt">
                [?]
                <p>
                  {intl.formatMessage(i18n2.didYouFind)}
                </p>
                <input
                  type="button"
                  className={Boolean(this.state.buttonValue) ? yesButtonStyle : "coa-UserFeedback__button"}
                  onClick={this.toggleYesButton}
                  value={intl.formatMessage(i18n2.yes)}
                />
                <input
                  type="button"
                  onClick={this.toggleNoButton}
                  value={intl.formatMessage(i18n2.no)}
                  className={Boolean(this.state.buttonValue) ? noButtonStyle : "coa-UserFeedback__button"}
                />
              </div>
              {Boolean(this.state.buttonValue)
                &&
                  <div className="coa-UserFeedback__textarea-container">
                    <p>
                      {intl.formatMessage(i18n2.tellUsMore)}
                    </p>
                    <textarea
                      id="userfeedback-textarea"
                      name="userfeedback-textarea"
                      onChange={this.handleTextAreaChange}
                      className="coa-UserFeedback__textarea"
                    />
                    {this.renderButton()}
                  </div>
              }
            </form>
          }
      </div>

    );
  }
}

UserFeedback.propTypes = {};

export default injectIntl(UserFeedback);
