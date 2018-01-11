import React, { Component } from 'react';

class ListLink extends Component {

  render() {

    const { url, text, linkStyle } = this.props;

    return (
      <a
        className={ `coa-ListLink coa-ListLink--${(linkStyle)}` }
        href={url}
      >
        <span>{text}</span>
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      </a>
    );
  }
}

export default ListLink;
