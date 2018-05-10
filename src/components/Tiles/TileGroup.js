import React from 'react';
import PropTypes from 'prop-types';

import Tile from 'components/Tiles/Tile';
import SectionHeader from 'components/SectionHeader';
import I18nLink from 'components/I18n/I18nLink';
import ArrowRight from 'components/SVGs/ArrowRight';

const TileGroup = ({ tiles, tag, text, url, description, hasBorder }) => (
  <div className={`coa-TileGroup ${hasBorder ? 'coa-TileGroup--border' : ''}`}>
    {text &&
      url && (
        <SectionHeader hasHighlight={true}>
          <I18nLink to={url}>
            {text}&nbsp;<ArrowRight />
          </I18nLink>
        </SectionHeader>
      )}
    {text && !url && <SectionHeader hasHighlight={true}>{text}</SectionHeader>}

    {description && <p className="coa-TileGroup__description">{description}</p>}
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

TileGroup.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.shape(Tile.propTypes)).isRequired,
  tag: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
  hasBorder: PropTypes.bool,
};

export default TileGroup;
