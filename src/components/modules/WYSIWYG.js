import React, { Component } from 'react';

class WYSIWYG extends Component {

  render() {

    const { content, isSection } = this.props;

    return (
      <div className={ `coa-wysiwyg ${(isSection && "coa-section")}` } dangerouslySetInnerHTML={{__html: content}} />
    );
  }
}

export default WYSIWYG;
