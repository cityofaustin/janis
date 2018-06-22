import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from 'components/SectionHeader';
import I18nLink from 'components/I18n/I18nLink';
import ArrowRight from 'components/SVGs/ArrowRight';

import Tile from './Tile';
import { tileGroupPropTypes } from './proptypes';

const TileGroup = ({ tiles, tag, text, url, description, hasBorder }) => (
  <div className={`coa-TileGroup ${hasBorder ? 'coa-TileGroup--border' : ''}`}>
    {text &&
      url && (
        <SectionHeader hasHighlight={true} description={description}>
          <I18nLink to={url}>
            {text}&nbsp;<ArrowRight />
          </I18nLink>
        </SectionHeader>
      )}

    {text &&
      !url && (
        <SectionHeader hasHighlight={true} description={description}>
          {text}
        </SectionHeader>
      )}

    <div className="row">
      {tiles.map(({ url, text }, index) => (
        <div
          key={index}
          className="coa-TileGroup__tile col-xs-12 col-md-6 col-lg-3"
        >
          <Tile url={url} text={text} tag={tag} />
        </div>
      ))}
    </div>
  </div>
);

TileGroup.propTypes = tileGroupPropTypes;

export default TileGroup;
