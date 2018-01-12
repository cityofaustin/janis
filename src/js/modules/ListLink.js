import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getPathWithLangCode from 'js/helpers/language';

class ListLink extends Component {

  render() {

    const { url, text, linkStyle } = this.props;

    return (
      <Link
        className={ `coa-ListLink coa-ListLink--${(linkStyle)}` }
        to={getPathWithLangCode(url)}
      >
        <span>{text}</span>
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      </Link>
    );
  }
}

export default ListLink;
