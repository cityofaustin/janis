import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { postFeedback } from 'js/helpers/fetchData';
import { logEvent } from 'js/helpers/googleAnalytics';
import SectionHeaderSerif from 'js/modules/SectionHeaderSerif';

import emojiDisappointed from 'images/emojis/disappointed.png';
import emojiSad from 'images/emojis/sad.png';
import emojiNeutral from 'images/emojis/neutral.png';
import emojiSlightlySmiling from 'images/emojis/slightly_smiling.png';
import emojiGrinning from 'images/emojis/grinning.png';

const i18nMessages = defineMessages({
  step1title: {
    id: 'FormFeedback.step1.title',
    defaultMessage: 'How satisfied are you with this page?',
  },
  step2titlea: {
    id: 'FormFeedback.step2.title.a',
    defaultMessage: 'Thank you!',
  },
  step2titleb: {
    id: 'FormFeedback.step2.title.b',
    defaultMessage: 'How can we make this page better?',
  },
  step3title: {
    id: 'FormFeedback.step3.title',
    defaultMessage: 'Thank you for sharing feedback!',
  },
  step3button: {
    id: 'FormFeedback.step3.button',
    defaultMessage: 'Give more feedback',
  },
  emojiDisappointed: {
    id: 'FormFeedback.emojiDisappointed.altText',
    defaultMessage: 'Disappointed',
  },
  emojiSad: {
    id: 'FormFeedback.emojiSad.altText',
    defaultMessage: 'Sad',
  },
  emojiNeutral: {
    id: 'FormFeedback.emojiNeutral.altText',
    defaultMessage: 'Neutral',
  },
  emojiSlightlySmiling: {
    id: 'FormFeedback.emojiSlightlySmiling.altText',
    defaultMessage: 'Slightly Smiling',
  },
  emojiGrinning: {
    id: 'FormFeedback.emojiGrinning.altText',
    defaultMessage: 'Grinning',
  },
});


class FormFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      loading: false,
      emoji: null,
      feedback: null,
      error: null
    };
  }

  logEvent(action, label) {
    logEvent({
     category: 'FORM__site-feedback',
     action: `${action}__step-${this.state.step}`,
     label: label
    });
  }

  handleEmojiClick = (e) => {
    this.logEvent('emoji-click', JSON.stringify({
        'emoji':e.currentTarget.value
      }) );

    this.setState({
      step: 2,
      emoji: e.currentTarget.value
    });
  }

  handleTextAreaChange = (e) => {
    this.setState({
      feedback: e.currentTarget.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.logEvent('send-feedback-click', JSON.stringify({
      'emoji': this.state.emoji,
      'feedback': this.state.feedback
    }));

    if(!this.state.feedback) {
      this.setState({
        step: 3,
        emoji: null,
        feedback: null,
        error: null
      });
      return;
    }

    this.setState({
      loading: true,
    })

    postFeedback({
      title: 'Alpha Site Feedback',
      description: `**Emoji rating:**\n${this.state.emoji}\n\n**Text feedback:**\n${this.state.feedback}\n\n`,
    })
    .then(({data}) => {
      this.setState({
        step: 3,
        loading: false,
        emoji: null,
        feedback: null,
        error: null
      })
    })
    .catch((e) => {
      this.logEvent('send-feedback-error');
      //TODO: better handle error messaging
      console.log('ERROR:', e);

      this.setState({
        loading: false,
        error: true
      })
    })
  }

  handleReset = (e) => {
    this.logEvent('reset');
    this.setState({
      step: 1,
      loading: false,
      emoji: null,
      feedback: null,
      error: null
    })
  }

  render() {

    const {intl} = this.props;

    return (
      <div className="coa-FormFeedback">

      { this.state.step === 1 && (
        <div className="coa-FormFeedback__step1">
          <SectionHeaderSerif title={intl.formatMessage(i18nMessages.step1title)} />
          <div className="coa-FormFeedback__emojis">
            <button onClick={this.handleEmojiClick}
              value="-2"
              aria-label={intl.formatMessage(i18nMessages.emojiDisappointed)}
            >
              <img src={emojiDisappointed} alt={intl.formatMessage(i18nMessages.emojiDisappointed)} />
            </button>
            <button onClick={this.handleEmojiClick}
              value="-1"
              aria-label={intl.formatMessage(i18nMessages.emojiSad)}
            >
              <img src={emojiSad} alt={intl.formatMessage(i18nMessages.emojiSad)} />
            </button>
            <button onClick={this.handleEmojiClick}
              value="0"
              aria-label={intl.formatMessage(i18nMessages.emojiNeutral)}
            >
              <img src={emojiNeutral} alt={intl.formatMessage(i18nMessages.emojiNeutral)} />
            </button>
            <button onClick={this.handleEmojiClick}
              value="1"
              aria-label={intl.formatMessage(i18nMessages.emojiSlightlySmiling)}
            >
              <img src={emojiSlightlySmiling} alt={intl.formatMessage(i18nMessages.emojiSlightlySmiling)} />
            </button>
            <button onClick={this.handleEmojiClick}
              value="2"
              aria-label={intl.formatMessage(i18nMessages.emojiGrinning)}
            >
              <img src={emojiGrinning} alt={intl.formatMessage(i18nMessages.emojiGrinning)} />
            </button>
          </div>
        </div>
      )}

      { this.state.step === 2 && (
        <div className="coa-FormFeedback__step2">
          <SectionHeaderSerif title={intl.formatMessage(i18nMessages.step2titlea)} />
          <SectionHeaderSerif title={intl.formatMessage(i18nMessages.step2titleb)} />
          <form>
            { this.state.error && (
              <p className="coa-FormFeedback__error">Oh no, something went wrong! Please, try submitting your feedback again.</p>
            )}
            <label htmlFor="site-feedback-textarea"
              className="coa-sr-only"
            >{intl.formatMessage(i18nMessages.step2titleb)}</label>
            <textarea id="site-feedback-textarea"
              onChange={this.handleTextAreaChange}></textarea>
            <p>Please do not enter private information because your feedback will be public.</p>
            { !this.state.loading
              ? <input type="submit" value="Send Feedback" onClick={this.handleSubmit} />
              : <input type="submit" value="Sending..." disabled />
            }
          </form>
        </div>
      )}

      { this.state.step === 3 && (
        <div className="coa-FormFeedback__step3">
          <SectionHeaderSerif title={intl.formatMessage(i18nMessages.step3title)} />
          <input type="button" onClick={this.handleReset} value={intl.formatMessage(i18nMessages.step3button)} />
        </div>
      )}

      </div>
    );
  }
}

export default injectIntl(FormFeedback);
