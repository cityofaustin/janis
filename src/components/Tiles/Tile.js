import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { misc } from 'js/i18n/definitions';
import { tilePropTypes } from './proptypes';

import guideIcon from 'images/guide_icon.png';

const Tile = ({ url, text, compact, pageName }) => {
  let typeIcon
  if (pageName == "GuidePageNode") {
    typeIcon = guideIcon
  }
  return (
    <Link className={compact ? 'coa-Tile--compact' : 'coa-Tile'} to={url}>
      <div className="coa-Tile__content">
        <p className="coa-Tile__text">{text}</p>
        <i className="material-icons">
          {typeIcon
            ? (<img src={typeIcon} alt={misc.guideIcon.defaultMessage} />)
            : "arrow_forward"
          }
        </i>
      </div>
    </Link>
  )
};

Tile.propTypes = tilePropTypes;

export default Tile;
