import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { services as i18n3 } from 'js/i18n/definitions';
import { Link } from 'react-static';
import ArrowRight from 'components/SVGs/ArrowRight';

import Tile from './Tile';
import { tileGroupPropTypes } from './proptypes';

const TileGroup = ({ tiles, text, url, description, intl }) => (
  <div className="coa-TileGroup">
    {/* <div className="wrapper container-fluid"> */}
    {text &&
      url && (
        <h4 className="coa-TileGroup__title">
          <Link to={url}>
            {text}&nbsp;
            <ArrowRight />
          </Link>
        </h4>
      )}

    {text && !url && <h4 className="coa-TileGroup__title">{text}</h4>}

    <div className="row">
      {tiles.map(({ url, text }, index) => (
        <div
          key={index}
          className="coa-TileGroup__tile col-xs-12 col-md-6 col-lg-3"
        >
          <Tile url={url} text={text} />
        </div>
      ))}
    </div>
    {/* </div> */}
  </div>
);

TileGroup.propTypes = tileGroupPropTypes;

export default injectIntl(TileGroup);
