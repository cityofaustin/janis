import React from 'react';
import PropTypes from 'prop-types';
import I18nLink from 'components/I18n/I18nLink';
import ChevronRightSVG from 'components/SVGs/ChevronRight';

const ListLink = ({ url, text }) => (
  <I18nLink className="coa-ListLink" to={url}>
    <span>{text}</span>
    <ChevronRightSVG />
  </I18nLink>
);

ListLink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ListLink;
