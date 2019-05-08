import React from 'react';
import PropTypes from 'prop-types';

import TileGroup from './TileGroup';
import { tileGroupSetPropTypes } from './proptypes';

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

TileGroupSet.propTypes = tileGroupSetPropTypes;

export default TileGroupSet;
