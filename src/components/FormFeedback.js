import React, { Component } from 'react';

class FormFeedback extends Component {

  render() {
    return (
      <form className="usa-form">
        <h4 className="coa-section__title">Send us feedback on this page or city services.</h4>
        <p className="usa-content">Prefer to talk to a person at 311? Call <a className="nowrap" href="tel:512-974-2000">512-974-2000</a>. </p>

        <fieldset className="usa-fieldset-inputs usa-sans">
          <legend className="usa-sr-only">Site Feedback Options</legend>
          <ul className="usa-unstyled-list">
            <li>
              <input id="page-content" type="radio" name="site-feedback-options" value="stanton" />
              <label for="page-content">Information on this page</label>
            </li>
            <li>
              <input id="technical-issue" type="radio" name="site-feedback-options" value="anthony" />
              <label for="technical-issue">Technical Issue</label>
            </li>
            <li>
              <input id="other" type="radio" name="site-feedback-options" value="tubman" />
              <label for="other">Something else</label>
            </li>
          </ul>
        </fieldset>
        <input type="submit" value="Continue" />
      </form>
    );
  }

}

export default FormFeedback;
