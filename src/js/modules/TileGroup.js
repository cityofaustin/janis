import React from 'react';
import Tile from 'js/modules/Tile';

const TileGroup = ({ tiles }) => (
  <div className="coa-TileGroup">
  {
    tiles.map(({ url, text }, index) =>
        <Tile
          url={url}
          text={text}
          tag="Service"
          key={index}
        />
    )
  }
  </div>
)

export default TileGroup;
