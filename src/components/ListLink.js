import React, { Component } from 'react';

class ListLink extends Component {

  render () {

    const {id, url, text, isBoxType} = this.props;

    return (
      <a
        className={ isBoxType ? "coa-list_link coa-list_link--box" : "coa-list_link" }
        key={id}
        href={url}
      >
        <span>{text}</span>
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      </a>
    );
  }
}

export default ListLink;
