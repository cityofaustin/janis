import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import parser from 'ua-parser-js';

import { userFeedback as i18n2 } from 'js/i18n/definitions';
import { postFeedback } from 'js/helpers/fetchData';
import { logFormEvent } from 'js/helpers/googleAnalytics';

class UserFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      feedback: null,
      error: null,
      feedbackSubmitted: false,
      buttonValue: null,
      char: 0,
    };
    this.toggleYesButton = this.toggleYesButton.bind(this);
    this.toggleNoButton = this.toggleNoButton.bind(this);
  }

  logEvent(action, optionalData) {
    logFormEvent({
      formName: "user feedback form",
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
      )
    } 
    if (this.state.success) {
      return (
        <button
          type="button"
          onClick={null}
          className="coa-UserFeedback__button-check"
        >
          <i className="material-icons">check</i>
        </button>
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
      char: e.currentTarget.value.length,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { buttonValue } = this.state;

    this.logEvent('send-feedback-click', {
      feedback: this.state.feedback,
      buttonValue: this.state.buttonValue,
    });

    this.setState({
      loading: true,
    });

    postFeedback({
      title: 'Alpha Site Feedback',
      description: `**Did they find what they were looking for:**\n${buttonValue}\n
        \n**Text feedback:**\n${this.state.feedback}\n
        \n**Url:**\n${window.location.href}\n
        \n**Device Information:** \n\`\`\`\n${JSON.stringify(
          parser(),
          null,
          2,
        )}\n\`\`\`\n\n`,
    })
      .then(({ data }) => {
        this.setState({
          feedbackSubmitted: true,
          success: true,
          // reset state
          loading: false,
          buttonValue: null,
          feedback: null,
          error: null,
          char: 0,
        });
      })
      .catch(e => {
        this.logEvent('post-error', e.response);
        console.log('ERROR:', e);
        this.setState({
          loading: false,
          error: true,
        });
      });
  };

  render() {
    const { intl } = this.props;
    const yesButtonStyle = this.state.buttonValue === 'yes' ? "coa-UserFeedback__button-selected"
      : "coa-UserFeedback__button-dimmed" ;
    const noButtonStyle = this.state.buttonValue === 'no' ? "coa-UserFeedback__button-selected"
      : "coa-UserFeedback__button-dimmed" ;
    const feedbackLink = `/${intl.locale}/feedback/`;

    return (
      <div className="coa-UserFeedback">
        {this.state.feedbackSubmitted
          ? <div className="coa-UserFeedback__thankYou">
                <div className="coa-UserFeedback__thankYou--check">
                  <div className="coa-UserFeedback__check">
                    <i className="material-icons">check</i>
                  </div>
                </div>
                <h3> {intl.formatMessage(i18n2.received)}</h3>
                <p>
                    <span>{intl.formatMessage(i18n2.furtherHelp)}</span>
                    <a href={feedbackLink}>{intl.formatMessage(i18n2.signUp)}</a>.
                </p>
              </div>
          :
            <Fragment>
              <form className="coa-UserFeedback__form">
                <div className="coa-UserFeedback__prompt">
                  <i className="material-icons">feedback</i>
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
                {Boolean(this.state.buttonValue) // if either button is selected, show textarea
                  &&
                    <div className="coa-UserFeedback__elaborate">
                      <hr className="coa-UserFeedback-hr"/>
                      <p>
                        {intl.formatMessage(i18n2.tellUsMore)}
                      </p>
                      <div className="coa-UserFeedback__textarea-wrapper">
                        <textarea
                          id="userfeedback-textarea"
                          name="userfeedback-textarea"
                          maxLength={2000}
                          onChange={this.handleTextAreaChange}
                          className={this.state.loading ? "coa-UserFeedback__textarea-dimmed": "coa-UserFeedback__textarea"}
                        />
                        <div className="coa-UserFeedback__charlimit">
                          {`${intl.formatMessage(i18n2.characterLimit)}: ${this.state.char} ${intl.formatMessage(i18n2.of)} 2000`}
                        </div>
                      </div>
                      {this.renderButton()}
                    </div>
                }
              </form>
              {this.state.error
                && <div className="coa-UserFeedback__error">
                  <span>
                    <i className="material-icons">error_outline</i>
                  </span>
                  <p>
                    {intl.formatMessage(i18n2.errorMessage)}{' '}
                    <a href={'mailto:participate@austintexas.gov'}>participate@austintexas.gov</a>.
                  </p>
                </div>
              }
            </Fragment>
          }
      </div>

    );
  }
}

UserFeedback.propTypes = {};

export default injectIntl(UserFeedback);
