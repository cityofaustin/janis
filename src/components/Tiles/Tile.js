import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-static';

import { tilePropTypes } from './proptypes';

// TODO: make links better in here
const Tile = ({ url, text, compact }) => (
  <Link className={compact ? 'coa-Tile--compact' : 'coa-Tile'} to={url}>
    <div className="coa-Tile__content">
      <p className="coa-Tile__text">{text}</p>
      <i className="material-icons">arrow_forward</i>
    </div>
  </Link>
);

Tile.propTypes = tilePropTypes;

export default Tile;
