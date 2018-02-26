import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-static';


const ListLink = ({ url, text, style }) => (
  <Link
    className={ `coa-ListLink coa-ListLink--${style}` }
    to={url}
  >
    <span>{text}</span>
    <i className="fa fa-chevron-right" aria-hidden="true"></i>
  </Link>
);

ListLink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.string,
};

export default ListLink;
