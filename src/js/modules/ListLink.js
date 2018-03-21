import React from 'react';
import PropTypes from 'prop-types';
import I18nLink from 'js/modules/I18nLink';
import ChevronRightSVG from 'js/svg/ChevronRight';

const ListLink = ({ url, text, style }) => (
  <I18nLink
    className={ `coa-ListLink coa-ListLink--${style}` }
    to={url}
  >
    <span>{text}</span>
    <ChevronRightSVG size="20" />
  </I18nLink>
);

ListLink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.string,
};

export default ListLink;
