import React, { Component } from 'react';

class HtmlFromAdmin extends Component {

  render() {

    const { content, isSection } = this.props;

    return (
      <div className={ `coa-HtmlFromAdmin ${(isSection && "coa-section")}` } dangerouslySetInnerHTML={{__html: content}} />
    );
  }
}

export default HtmlFromAdmin;
