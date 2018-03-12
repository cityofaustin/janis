import React from 'react';
import PropTypes from 'prop-types';
import I18nLink from 'js/modules/I18nLink'
import ChevronCircleRightSVG from 'js/svg/ChevronCircleRight';

const Tile = ({ url, text, tag }) => (
  <I18nLink className="coa-Tile" to={url}>
    <span className="coa-Tile__tag">{tag}</span>
    <p className="coa-Tile__text">{text}</p>
    <ChevronCircleRightSVG size="22"/>
  </I18nLink>
);

Tile.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Tile;
