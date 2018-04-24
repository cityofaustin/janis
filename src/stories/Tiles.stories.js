import React from 'react';
import { storiesOf } from '@storybook/react';

import TileGroupSet from 'components/Tiles/TileGroupSet';
import TileGroup from 'components/Tiles/TileGroup';
import Tile from 'components/Tiles/Tile';
import { tileData, tileGroupData } from 'stories/static_data/tileData';

storiesOf('Tiles', module)
  .add('TileGroupSet', () => (
    <div className="wrapper container-fluid">
      <TileGroupSet
        tileGroups={tileGroupData}
        tag="Tile"
      />
    </div>
  ))
  .add('TileGroup', () => (
    <div className="wrapper container-fluid">
      <TileGroup
        tiles={tileData}
        tag="Tile"
      />
    </div>
  ))
  .add('Tile', () => (
    <div className="wrapper container-fluid">
      <Tile
        url="http://austintexas.gov"
        text="City of Austin current website"
        tag="Tile"
      />
    </div>
  ))
