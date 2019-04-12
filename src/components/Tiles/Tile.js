import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-static';

import { tilePropTypes } from './proptypes';

const Tile = ({ url, text }) => (
  <Link className="coa-Tile" to={url}>
    <div className="coa-Tile__content">
      <p className="coa-Tile__text">{text}</p>
      <i class="material-icons">arrow_forward</i>
    </div>
  </Link>
);

Tile.propTypes = tilePropTypes;

export default Tile;
