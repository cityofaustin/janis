import React, { Component } from 'react';
import { postFeedback } from 'js/helpers/fetchData';
import { logEvent } from 'js/helpers/googleAnalytics';

const rules = {
  'email': (value) => {
    if (!value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) return false;
    return 'Please enter a valid email.';
  },
  'required': (value) => {
    if (typeof value !== 'undefined' && value !== null && /^\S/.test(value)) return false;
    return 'This field is required.';
  }
};

const formConfig = {
  'stage': {
    1: ['site-feedback-options'],
    2: ['site-feedback-textarea', 'site-feedback-email']
  },
  'fieldRules' : {
    'site-feedback-options': ['required'],
    'site-feedback-textarea': ['required'],
    'site-feedback-email': ['email']
  }
};

class FormFeedback extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      values: {},
      errors: {},
      successUrl: null
    };
  }

  logEvent(action, label) {

    let analyticsEvent = {
      category: 'FORM__site-feedback',
      action: `${action}__stage-${this.state.stage}`,
      label: label
    }

    logEvent(analyticsEvent);
  }

  handleFieldChange = (e) => {

    const values = Object.assign(this.state.values);
    const errors = Object.assign(this.state.errors);
    values[e.target.name] = e.target.value;
    errors[e.target.name] = this.validateField(e.target.name, e.target.value);

    this.setState({
      values: values,
      errors: errors
    });
  }

  handleNextStage = (e) => {

    const errors = this.validate(this.state.values);

    if (!this.isValid(errors)) {
      this.logEvent('next--error', JSON.stringify(errors));
      this.setState({
        errors: errors
      });
      return;
    }

    this.logEvent('next--success');
    this.setState((prevState)=> {
      return {
        stage: prevState.stage + 1,
        errors: errors
      }
    });
  }

  handleResetForm = (e) => {

    this.logEvent('reset');

    this.setState({
      stage: 1,
      values: {},
      errors: {},
      successUrl: null
    });
  }

  handleFormSubmit = (e) => {

    const errors = this.validate(this.state.values);

    if (!this.isValid(errors)) {
      this.logEvent('submit--errors', JSON.stringify(errors));
      this.setState({
        errors: errors
      });
      return;
    }

    this.logEvent('submit--success');

    postFeedback({
      title: this.state.values['site-feedback-options'],
      description: this.state.values['site-feedback-textarea'],
      email: this.state.values['site-feedback-email']
    })
    .then(({data}) => {
      this.setState({
        stage: 0,
        successUrl: data.url
      })
    })
    .catch((e) => {
      console.log('error submitting form.', e)
    })
  }

  validateField(field, value) {

    const errors = [];

    formConfig.fieldRules[field].forEach((fieldRule) => {
      const errortext = rules[fieldRule](value);
      if(errortext) errors.push(errortext);
    });

    return errors.join(" ");
  }

  validate(values) {

    const fields = formConfig.stage[this.state.stage];
    const errors = {};

    fields.forEach((field) => {
      errors[field] = this.validateField(field, values[field]);
    });

    return errors;
  }

  isValid(errors) {

    let isValid = true;
    for (const field in errors) {
      if(isValid && errors[field]) isValid = false;
    }
    return isValid;
  }

  render() {

    return (
      <div>
        <div className="coa-section__title">
          <h3>Send us feedback on this page or city services.</h3>
        </div>

        <form className="coa-form">
        { (this.state.stage === 0 || this.state.stage === 1) && (

          <div>
            <p>Prefer to talk to a person at 311? Call <a className="nowrap" href="tel:512-974-2000">512-974-2000</a>. </p>

            <div className={ `coa-form__input ${ this.state.errors['site-feedback-options'] && "usa-input-error" }` }>

            <fieldset className="usa-fieldset-inputs usa-sans">

              { this.state.errors['site-feedback-options'] && (
                <span className="usa-input-error-message" role="alert">{ this.state.errors['site-feedback-options'] }</span>
              )}

              <legend className="usa-sr-only">Site Feedback Options</legend>
              <ul className="usa-unstyled-list">
                <li>
                  <input
                    id="page-content"
                    type="radio"
                    name="site-feedback-options"
                    value="page-content"
                    checked={this.state.values["site-feedback-options"] === "page-content"}
                    onChange={this.handleFieldChange}
                  />
                  <label className="coa-form__label" htmlFor="page-content">Information on this page</label>
                </li>
                <li>
                  <input
                    id="translation"
                    type="radio"
                    name="site-feedback-options"
                    value="translation"
                    checked={this.state.values["site-feedback-options"] === "translation"}
                    onChange={this.handleFieldChange}
                  />
                  <label className="coa-form__label" htmlFor="translation">Language Translation</label>
                </li>
                <li>
                  <input
                    id="technical-issue"
                    type="radio"
                    name="site-feedback-options"
                    value="technical-issue"
                    checked={this.state.values["site-feedback-options"] === "technical-issue"}
                    onChange={this.handleFieldChange}
                  />
                  <label className="coa-form__label" htmlFor="technical-issue">Technical Issue</label>
                </li>
                <li>
                  <input
                    id="other"
                    type="radio"
                    name="site-feedback-options"
                    value="other"
                    checked={this.state.values["site-feedback-options"] === "other"}
                    onChange={this.handleFieldChange}
                  />
                  <label className="coa-form__label" htmlFor="other">Something else</label>
                </li>
              </ul>
            </fieldset>
            </div>

            <div className="coa-form__actions">
              <input
                type="button"
                value="Continue"
                onClick={this.handleNextStage}
                disabled={!this.isValid(this.state.errors)}
              />
            </div>

          </div>

        )}

        { this.state.stage === 2 && (

          <div>

            <div className={ `coa-form__input ${ this.state.errors['site-feedback-textarea'] && "usa-input-error" }` }>
            <fieldset>
              { this.state.errors['site-feedback-textarea'] && (
                <span className="usa-input-error-message" id="input-error-message" role="alert">{this.state.errors['site-feedback-textarea']}</span>
              )}
              <label className="coa-form__label" htmlFor="site-feedback-textarea">
                Your feedback will be public and can be found at <a className="nowrap" href="#">austin.gov feedback tracker</a>.
                <span>required</span>
              </label>

              <textarea
                id="site-feedback-textarea"
                name="site-feedback-textarea"
                placeholder="Tell Us More"
                onChange={this.handleFieldChange}
              >{this.state.values["site-feedback-textarea"]}</textarea>
            </fieldset>
            </div>

            <div className={ `coa-form__input ${ this.state.errors['site-feedback-email'] && "usa-input-error" }` }>
            <fieldset>
              { this.state.errors['site-feedback-email'] && (
                <span className="usa-input-error-message" id="input-error-message" role="alert">{this.state.errors['site-feedback-email']}</span>
              )}
              <label className="coa-form__label" htmlFor="site-feedback-email">
                Type your email in the box if you would like to receive a link to your feedback. Your email address will be kept private.
                <span>optional</span>
              </label>

              <input
                id="site-feedback-email"
                name="site-feedback-email"
                type="text"
                placeholder="someemail@gmail.com"
                onChange={this.handleFieldChange}
              />
            </fieldset>
            </div>

            <div className="coa-form__actions">
              <input
                type="button"
                value="Submit"
                onClick={this.handleFormSubmit}
                disabled={!this.isValid(this.state.errors)}
              />
              <a className="coa-form__actions__link" onClick={this.handleResetForm}>Cancel</a>
            </div>
          </div>
        )}

        { this.state.stage === 0 && (
          <div className="coa-overlay">
            <div className="coa-overlay__content">
              <h4>Thank you for sharing your feedback!</h4>
              <p>You can see your feedback in our <a href={this.state.successUrl} target="_blank" rel="noopener noreferrer" aria-label="Opens in new window">austin.gov feedback tracker</a></p>
              <button className="usa-button" onClick={this.handleResetForm}>Done</button>
            </div>
          </div>
        )}

        </form>
      </div>
    );
  }

}

export default FormFeedback;
