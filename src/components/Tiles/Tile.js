import React from 'react';
import PropTypes from 'prop-types';
import I18nLink from 'components/I18n/I18nLink';
import ChevronCircleRightSVG from 'components/SVGs/ChevronCircleRight';

import { tilePropTypes } from './proptypes';

const Tile = ({ url, text, tag }) => (
  <I18nLink className="coa-Tile" to={url}>
    {tag && <span className="coa-Tile__tag">{tag}</span>}
    <p className="coa-Tile__text">{text}</p>
    <ChevronCircleRightSVG className="coa-Tile__icon" />
  </I18nLink>
);

Tile.propTypes = tilePropTypes;

export default Tile;
