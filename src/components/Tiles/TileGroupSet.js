import React from 'react';
import PropTypes from 'prop-types';

import TileGroup from 'components/Tiles/TileGroup';

const TileGroupSet = ({ tileGroups, tag }) => {
  return (
    <div className="coa-TileGroupSet">
      <div className="row">
        {tileGroups.map(({ tiles, text, url, description }, index) => {
          if (!tiles.length) return null;
          return (
            <TileGroup
              key={index}
              tiles={tiles}
              tag={tag}
              text={text}
              url={url}
              description={description}
              hasBorder={true}
            />
          );
        })}
      </div>
    </div>
  );
};

TileGroupSet.propTypes = {
  tileGroups: PropTypes.arrayOf(PropTypes.shape(TileGroup.propTypes))
    .isRequired,
  tag: PropTypes.string,
};

export default TileGroupSet;
