import React, { Component, Fragment } from 'react';

class EditController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
  }

  handleEditButtonClick(e) {
    console.log(e);
    this.setState({ isEditing: !this.state.isEditing });
  }
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <div className={this.state.isEditing ? 'coa-editing' : ''}>
          {children}
        </div>
        <button className="coa-EditButton" onClick={this.handleEditButtonClick}>
          {this.state.isEditing ? 'Exit Edit Mode' : 'Edit'}
        </button>
      </Fragment>
    );
  }
}

export default EditController;
