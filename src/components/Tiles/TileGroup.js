import React from 'react';
import PropTypes from 'prop-types';

import Tile from 'components/Tiles/Tile';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import I18nLink from 'components/I18nLinks/I18nLink';
import ArrowRight from 'js/svg/ArrowRight';


const TileGroup = ({ tiles, tag, title, titlePath, description, hasBorder }) => (
  <div className={`coa-TileGroup ${hasBorder ? 'coa-TileGroup--border' : ''}`}>
  { title && titlePath && (
    <SectionHeader hasHighlight={true}>
      <I18nLink to={titlePath}>
        {title}&nbsp;<ArrowRight />
      </I18nLink>
    </SectionHeader>
  )}
  { title && !titlePath && (
    <SectionHeader hasHighlight={true}>{title}</SectionHeader>
  )}

  { description && (
    <p className="coa-TileGroup__description">{description}</p>
  )}
    <div className="row">
      {
        tiles.map(({ url, text }, index) =>
          <div key={index} className="coa-TileGroup__tile col-xs-12 col-md-6 col-lg-3">
            <Tile
              url={url}
              text={text}
              tag={tag}
            />
          </div>
        )
      }
    </div>
  </div>
)

TileGroup.propTypes = {
  tiles: PropTypes.array.isRequired,
  tag: PropTypes.string,
  title: PropTypes.string,
  titlePath: PropTypes.string,
  description: PropTypes.string,
  hasBorder: PropTypes.bool,
};

export default TileGroup;
