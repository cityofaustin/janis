import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListLink extends Component {

  render () {

    const {id, url, text, isBoxType} = this.props;

    return (
      <Link
        className={ isBoxType ? "coa-list_link coa-list_link--box" : "coa-list_link" }
        key={id}
        to={url}
      >
        <span>{text}</span>
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      </Link>
    );
  }
}

export default ListLink;
