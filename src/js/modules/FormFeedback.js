import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { postFeedback } from 'js/helpers/fetchData';
import { logFormEvent } from 'js/helpers/googleAnalytics';
import SectionHeader from 'js/modules/SectionHeader';

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

//TODO: see if you can define messages twice? in a loop? how emojis are defined is too fragments
const emojis = {
  'emojiDisappointed': {
      image: emojiDisappointed,
      value: -2
    },
  'emojiSad': {
      image: emojiSad,
      value: -1
    },
  'emojiNeutral': {
      image: emojiNeutral,
      value: 0
    },
  'emojiSlightlySmiling': {
      image: emojiSlightlySmiling,
      value: 1
    },
  'emojiGrinning': {
      image: emojiGrinning,
      value: 2
    }
};

class FormFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'site-feedback',
      step: 1,
      loading: false,
      emoji: null,
      feedback: null,
      error: null
    };
  }

  logEvent(action, optionalData) {
    logFormEvent({
      formName: this.state.name,
      formStep: this.state.step,
      formAction: action,
      optionalData: optionalData
    });
  }

  handleEmojiClick = (e) => {
    this.logEvent(`emoji-click-${e.currentTarget.value}`, {
      'emoji': e.currentTarget.value
    });

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

    this.logEvent('send-feedback-click', {
      'emoji': this.state.emoji,
      'feedback': this.state.feedback
    });

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
      //TODO: better handle error messaging
      this.logEvent('post-error', e.response);
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
      <form name={this.state.name} className="coa-FormFeedback">

      { this.state.step === 1 && (
        <fieldset className="coa-FormFeedback__step1"
          name={`${this.state.name}-emojis`}
        >
          <SectionHeader isSerif={true}>{intl.formatMessage(i18nMessages.step1title)}</SectionHeader>
          <div className="coa-FormFeedback__emojis">
          {
            Object.keys(emojis).map(emojiKey =>
              <div key={emojiKey} className="coa-FormFeedback__emoji">
                <input id={`${this.state.name}-radio-${emojiKey}`}
                  type="radio"
                  className="d-none"
                  name={`${this.state.name}-emojis`}
                  value={emojis[emojiKey].value}
                  onChange={this.handleEmojiClick}
                />
                <label htmlFor={`${this.state.name}-radio-${emojiKey}`}>
                  <img className="d-block"
                    src={emojis[emojiKey].image}
                    alt={intl.formatMessage(i18nMessages[emojiKey])} />
                </label>
              </div>
            )
          }
          </div>
        </fieldset>
      )}

      { this.state.step === 2 && (
        <fieldset className="coa-FormFeedback__step2"
          name={`${this.state.name}-textarea`}
        >
          <SectionHeader isSerif={true}>
            {intl.formatMessage(i18nMessages.step2titlea)}<br />{intl.formatMessage(i18nMessages.step2titleb)}
          </SectionHeader>
            { this.state.error && (
              <p className="coa-FormFeedback__error">Oh no, something went wrong! Please, try submitting your feedback again.</p>
            )}
            <label htmlFor={`${this.state.name}-textarea`}
              className="coa-sr-only"
            >{intl.formatMessage(i18nMessages.step2titleb)}</label>
            <textarea id={`${this.state.name}-textarea`}
              name={`${this.state.name}-textarea`}
              onChange={this.handleTextAreaChange}></textarea>
            <p>Please do not enter private information because your feedback will be public.</p>
            { !this.state.loading
              ? <input type="submit" value="Send Feedback" onClick={this.handleSubmit} />
              : <input type="submit" value="Sending..." disabled />
            }
        </fieldset>
      )}

      { this.state.step === 3 && (
        <fieldset className="coa-FormFeedback__step3">
          <SectionHeader isSerif={true}>{intl.formatMessage(i18nMessages.step3title)}</SectionHeader>
          <input type="button" onClick={this.handleReset} value={intl.formatMessage(i18nMessages.step3button)} />
        </fieldset>
      )}

      </form>
    );
  }
}

export default injectIntl(FormFeedback);
