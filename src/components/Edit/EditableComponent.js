import React, { Component } from 'react';
import MediumEditor from 'medium-editor';

class EditableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditorActive: false,
    };
    this.editor = null;
  }

  toggleEditor = e => {
    if (this.props.isInEditMode) {
      this.setState({ isEditorActive: !this.state.isEditorActive });
    }
    console.log('toggleEditor', this.state.isEditorActive);
  };

  render() {
    const { children } = this.props;

    this.editor = this.state.isEditorActive
      ? new MediumEditor('.coa-isEditable')
      : null;

    return (
      <div className="coa-isEditable" onClick={this.toggleEditor}>
        {children}
      </div>
    );
  }
}

export default EditableComponent;
