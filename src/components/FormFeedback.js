import React, { Component } from "react";

const rules = {
  'email': (value) => {
    if (!value || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return false;
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
      errors: {}
    };
  }

  handleFieldChange = (e) => {

    const values = Object.assign(this.state.values);
    values[e.target.name] = e.target.value
    const errors = this.validate(values);

    this.setState({
      values: values,
      errors: errors
    });
  }

  handleNextStage = (e) => {

    const errors = this.validate(this.state.values);

    if (!this.isValid(errors)) {
      this.setState({
        errors: errors
      });
      return;
    }

    this.setState((prevState)=> {
      return {
        stage: prevState.stage + 1,
        errors: errors
      }
    });
  }

  handleResetForm = (e) => {
    this.setState({
      stage: 1,
      values: {},
      errors: {}
    });
  }

  handleFormSubmit = (e) => {

    const errors = this.validate(this.state.values);

    if (!this.isValid(errors)) {
      this.setState({
        errors: errors
      });
      return;
    }
    //TODO: post data as needed
    // after successful form submit
    this.setState({
      stage: 0
    })
  }

  validate(values) {

    const that = this;
    const fields = formConfig.stage[this.state.stage];
    const errors = [];

    fields.forEach((field) => {
      errors[field] = [];
      formConfig.fieldRules[field].forEach((fieldRule) => {
        const errortext = rules[fieldRule](values[field]);
        if(errortext) return errors[field].push(errortext);
      });
      errors[field] = errors[field].join(" ");
    })

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

        <form>
        { (this.state.stage === 0 || this.state.stage === 1) && (

          <div>
            <p>Prefer to talk to a person at 311? Call <a className="nowrap" href="tel:512-974-2000">512-974-2000</a>. </p>

            <div className={ `coa-form_input ${ this.state.errors['site-feedback-options'] && "usa-input-error" }` }>

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
                  <label htmlFor="page-content">Information on this page</label>
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
                  <label htmlFor="translation">Language Translation</label>
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
                  <label htmlFor="technical-issue">Technical Issue</label>
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
                  <label htmlFor="other">Something else</label>
                </li>
              </ul>
            </fieldset>
            </div>

            <div className="coa-form_actions">
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

            <div className={ `coa-form_input ${ this.state.errors['site-feedback-textarea'] && "usa-input-error" }` }>
            <fieldset>
              { this.state.errors['site-feedback-textarea'] && (
                <span className="usa-input-error-message" id="input-error-message" role="alert">{this.state.errors['site-feedback-textarea']}</span>
              )}
              <label htmlFor="site-feedback-textarea">
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

            <div className={ `coa-form_input ${ this.state.errors['site-feedback-email'] && "usa-input-error" }` }>
            <fieldset>
              { this.state.errors['site-feedback-email'] && (
                <span className="usa-input-error-message" id="input-error-message" role="alert">{this.state.errors['site-feedback-email']}</span>
              )}
              <label htmlFor="site-feedback-email">
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

            <div className="coa-form_actions">
              <input
                type="button"
                value="Submit"
                onClick={this.handleFormSubmit}
                disabled={!this.isValid(this.state.errors)}
              />
              <a className="coa-form_actions__link" onClick={this.handleResetForm}>Cancel</a>
            </div>
          </div>
        )}

        { this.state.stage === 0 && (
          <div className="coa-overlay">
            <div className="coa-overlay__content">
              <h4>Thank you for sharing your feedback!</h4>
              <p>You can see your feedback in our <a href="#">austin.gov feedback tracker</a></p>
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
