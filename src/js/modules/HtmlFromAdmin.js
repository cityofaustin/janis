import React, { Component } from 'react';

class HtmlFromAdmin extends Component {

  render() {

    const { content, isSection } = this.props;

    return (
      <div className="coa-HtmlFromAdmin" dangerouslySetInnerHTML={{__html: content}} />
    );
  }
}

export default HtmlFromAdmin;
