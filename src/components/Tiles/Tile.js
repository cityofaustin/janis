import React from 'react';
import PropTypes from 'prop-types';
import I18nLink from 'components/I18n/I18nLink';

import { tilePropTypes } from './proptypes';

const Tile = ({ url, text }) => (
  <I18nLink className="coa-Tile" to={url}>
    <div className="coa-Tile__content">
      <p className="coa-Tile__text">{text}</p>
      <i className="material-icons">arrow_forward</i>
    </div>
  </I18nLink>
);

Tile.propTypes = tilePropTypes;

export default Tile;
