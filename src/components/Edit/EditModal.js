import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textAreaContent: props.itemContent,
      reason: '',
      email: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.hideEditModal();
    alert('submitted');
    const YETI_ENDPOINT = 'https://coa-yeti-staging.herokuapp.com/wiki/';
    debugger;
    axios
      .create({
        headers: { 'Content-Type': 'application/json' },
      })
      .post(YETI_ENDPOINT, {
        email: this.state.email,
        url: window.location.href,
        suggestions: [
          {
            name_of_component: 'textbox',
            original_text: this.props.itemContent,
            altered_text: this.state.textAreaContent,
            language: Cookies.get('lang'),
            reason: this.state.reason,
          },
        ],
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  render() {
    console.log('text to be submitted:', this.state.textAreaContent);
    let inputForm = (
      <form onSubmit={this.handleSubmit}>
        <div className="close-button">
          <button>Close (X)</button>
          <p>
            Please edit content or add a comment to submit for our
            consideration.
          </p>
        </div>
        <div className="coa-EditModal-itemContent">
          <label for="textToEdit" />
          <textarea
            className="form-control"
            id="textToEdit"
            rows="3"
            onChange={e => this.setState({ textAreaContent: e.target.value })}
          >
            {this.state.textAreaContent}
          </textarea>
        </div>
        <div className="form-group">
          <h3>Please select reason for edit:</h3>
          <div className="col-sm-10">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                id="inappropriateContent"
                value="option1"
                checked
              />
              <label className="form-check-label" for="inappropriateContent">
                Inappropriate content
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                id="grammaticalError"
                value="option2"
              />
              <label className="form-check-label" for="grammaticalError">
                Grammatical error
              </label>
            </div>
            <div className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                id="incorrectTranslation"
                value="option3"
              />
              <label className="form-check-label" for="incorrectTranslation">
                Incorrect translation
              </label>
            </div>
            <div className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                id="other"
                value="option4"
              />
              <label className="form-check-label" for="other">
                Other
              </label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label for="addComment" className="col-sm-2 col-form-label">
            Add a reason
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              id="addComment"
              placeholder="Add Reason..."
              onChange={e => this.setState({ reason: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row">
          <label for="email" className="col-sm-2 col-form-label">
            Email (Optional)
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              id="email"
              placeholder="mayor.adler@austintexas.gov"
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Send Request
            </button>
          </div>
        </div>
      </form>
    );

    return (
      <div className="coa-EditModal_container">
        <h1>This is the Editing Modal</h1>
        <div className="coa-EditModal_content">{inputForm}</div>
      </div>
    );
  }
}

export default EditModal;
