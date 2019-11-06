import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { misc } from 'js/i18n/definitions';
import { tilePropTypes } from './proptypes';

import guideIcon from 'images/guide_icon.png';

const Tile = ({ url, text, compact, __typename }) => {
  console.log("misc :", misc)
  let typename = "arrow_forward"
  if (__typename == "GuidePageNode") {
    typename = guideIcon
  }
  return (
    <Link className={compact ? 'coa-Tile--compact' : 'coa-Tile'} to={url}>
      <div className="coa-Tile__content">
        <p className="coa-Tile__text">{text}</p>
        <i className="material-icons">
          {typename === "arrow_forward"
            ? typename
            : (<img src={typename} alt={misc.guideIcon.defaultMessage} />)
          }
        </i>
      </div>
    </Link>
  )
};

Tile.propTypes = tilePropTypes;

export default Tile;
