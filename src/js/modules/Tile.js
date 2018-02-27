import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-static';
import ChevronCircleRightSVG from 'js/svg/ChevronCircleRight';



const Tile = ({ url, text, style, tag }) => (
  <Link className="coa-Tile" to={url}>
    <span className="coa-Tile__tag">{tag}</span>
    <p className="coa-Tile__text">{text}</p>
    <ChevronCircleRightSVG size="22"/>
  </Link>
);

Tile.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.string,
};

export default Tile;
