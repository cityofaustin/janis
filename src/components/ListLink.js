import React, { Component } from 'react';

class ListLink extends Component {

  render () {

    const {id, url, text, isBoxType} = this.props;

    return (
      <a
        className={ `coa-list_link ${(isBoxType && "coa-list_link--box" )}` }
        key={id}
        to={url}
      >
        <span>{text}</span>
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      </a>
    );
  }
}

export default ListLink;
