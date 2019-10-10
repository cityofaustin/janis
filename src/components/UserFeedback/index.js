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
      name: 'site-feedback',
      step: 1,
      loading: false,
      feedback: null,
      error: null,
      buttonSelected: false,
      feedbackSubmitted: false,
      buttonValue: null,
    };
  }

  logEvent(action, optionalData) {
    logFormEvent({
      formName: this.state.name,
      formStep: this.state.step,
      formAction: action,
      optionalData: optionalData,
    });
  }

  handleEmojiClick = e => {
    const emojiText = this.props.intl.formatMessage(
      i18n3[e.currentTarget.value],
    );
    const emojiValue = emojis[e.currentTarget.value].value;

    this.logEvent(`emoji-click-${emojiValue}`, {
      emojiValue: emojiValue,
      emojiText: emojiText,
    });

    this.setState({
      step: 2,
      emoji: e.currentTarget.value,
    });
  };

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
    if (!this.state.feedback) {
      this.setState({
        step: 3,
        emoji: null,
        feedback: null,
        error: null,
      });
      return;
    }

    this.setState({
      loading: true,
    });

    postFeedback({
      title: 'Alpha Site Feedback',
      description: `Did they find what they were looking for:**\n${buttonValue}\n
        \n**Text feedback:**\n${this.state.feedback}\n
        \n**Url:**\n${window.location.href}\n
        \n**Device Information:** \n\`\`\`\n${JSON.stringify(
          parser(),
          null,
          2,
        )}\n\`\`\`\n\n`,
    })
      .then(({ data }) => {
        console.log(data);
        this.setState({
          step: 3,
          loading: false,
          emoji: null,
          feedback: null,
          error: null,
        });
      })
      .catch(e => {
        console.log(JSON.stringify(e))
        //TODO: better handle error messaging
        this.logEvent('post-error', e.response);
        console.log('ERROR:', e);

        this.setState({
          loading: false,
          error: true,
        });
      });
  };

  handleReset = e => {
    this.logEvent('reset');
    this.setState({
      step: 1,
      loading: false,
      emoji: null,
      feedback: null,
      error: null,
    });
  };

  render() {
    const { intl } = this.props;

    return (
      <div>
      <form className="coa-UserFeedback">
        <SectionHeader isSerif={true}> {/*todo: shoudlnt be section header */}
          {intl.formatMessage(i18n2.didYouFind)}
        
        </SectionHeader>
        <input
          type="button"
          className="coa-UserFeedback__button"
          onClick={()=> this.setState({buttonSelected: true, buttonValue: 'yes'})} // language?
          value="YES" // todo turn these into formated messages
        />
        <input
          type="button"
          onClick={()=> this.setState({buttonSelected: true, buttonValue: 'no'})}
          value="NO"
          className="coa-UserFeedback__button"
        />
        {this.state.buttonSelected
          && <div>
          {!this.state.feedbackSubmitted
          ?
            <div>
            Please tell us more about your feedback.
            We'll use this information to improve the site.
            <textarea
              id="userfeedback-textarea"
              name="userfeedback-textarea"
              onChange={this.handleTextAreaChange}
            />
              <input
              type="button"
              value="Submit"
              onClick={this.handleSubmit}
            />
            </div>
            : 
            <div>
            Feedback Received!
            Thank you for helping improve this website!
            </div>
          }
          </div>
        }
      </form>
      </div>

    );
  }
}

UserFeedback.propTypes = {};

export default injectIntl(UserFeedback);
