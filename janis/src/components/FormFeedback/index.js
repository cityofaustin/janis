import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import parser from 'ua-parser-js';

import {
  form as i18n1,
  formFeedback as i18n2,
  emoji as i18n3,
} from 'js/i18n/definitions';
import { postFeedback } from 'js/helpers/fetchData';
import { logFormEvent } from 'js/helpers/googleAnalytics';
import { emojis } from 'js/helpers/emojis';
import SectionHeader from 'components/SectionHeader';

class FormFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'site-feedback',
      step: 1,
      loading: false,
      emoji: null,
      feedback: null,
      error: null,
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
    e.preventDefault();

    const emojiText = this.props.intl.formatMessage(i18n3[this.state.emoji]);
    const emojiValue = emojis[this.state.emoji].value;
    const emoji = emojis[this.state.emoji].emoji;

    this.logEvent('send-feedback-click', {
      feedback: this.state.feedback,
      emojiValue: emojiValue,
      emojiText: emojiText,
    });

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
      title: `Alpha Site Feedback ${emoji}`,
      description: `**Emoji rating (scale of -2 to 2):**\n${emojiValue}: ${emojiText}\n
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
          step: 3,
          loading: false,
          emoji: null,
          feedback: null,
          error: null,
        });
      })
      .catch(e => {
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
      <form name={this.state.name} className="coa-FormFeedback">
        {this.state.step === 1 && (
          <fieldset
            className="coa-FormFeedback__step1"
            name={`${this.state.name}-emojis`}
          >
            <SectionHeader isSerif={true}>
              {intl.formatMessage(i18n2.howSatisfied)}
            </SectionHeader>
            <div className="coa-FormFeedback__content">
              {Object.keys(emojis).map(emojiKey => (
                <div key={emojiKey} className="coa-FormFeedback__emoji">
                  <input
                    id={`${this.state.name}-radio-${emojiKey}`}
                    type="radio"
                    className="coa-sr-only"
                    name={`${this.state.name}-emojis`}
                    value={emojiKey}
                    onChange={this.handleEmojiClick}
                  />
                  <label htmlFor={`${this.state.name}-radio-${emojiKey}`}>
                    <img
                      className="d-block"
                      src={emojis[emojiKey].image}
                      alt={intl.formatMessage(i18n3[emojiKey])}
                    />
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        )}

        {this.state.step === 2 && (
          <fieldset
            className="coa-FormFeedback__step2"
            name={`${this.state.name}-textarea`}
          >
            <SectionHeader isSerif={true}>
              {intl.formatMessage(i18n2.improvePage)}
            </SectionHeader>
            {this.state.error && (
              <p className="coa-FormFeedback__error">{i18n1.error}</p>
            )}
            <div className="coa-FormFeedback__content">
              <label
                htmlFor={`${this.state.name}-textarea`}
                className="coa-sr-only"
              >
                {intl.formatMessage(i18n2.improvePage)}
              </label>
              <textarea
                id={`${this.state.name}-textarea`}
                name={`${this.state.name}-textarea`}
                onChange={this.handleTextAreaChange}
              />
              <input
                type="submit"
                value={intl.formatMessage(i18n2.send)}
                onClick={this.handleSubmit}
                disabled={this.state.loading ? true : false}
              />
            </div>
          </fieldset>
        )}

        {this.state.step === 3 && (
          <fieldset className="coa-FormFeedback__step3">
            <SectionHeader isSerif={true}>
              {intl.formatMessage(i18n2.thankYouForSharing)}
            </SectionHeader>
            <div className="coa-FormFeedback__content">
              <input
                type="button"
                onClick={this.handleReset}
                value={intl.formatMessage(i18n2.giveMore)}
              />
            </div>
          </fieldset>
        )}
      </form>
    );
  }
}

FormFeedback.propTypes = {};

export default injectIntl(FormFeedback);
