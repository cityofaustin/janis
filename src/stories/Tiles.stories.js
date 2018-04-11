import React from 'react';
import { storiesOf } from '@storybook/react';

import TileGroupSet from 'js/modules/TileGroupSet';
import TileGroup from 'js/modules/TileGroup';
import Tile from 'js/modules/Tile';
import { tileData, tileGroupData } from 'stories/static_data/tileData';

storiesOf('Tiles', module)
  .add('TileGroupSet', () => (
    <div className="wrapper container-fluid">
      <TileGroupSet
        groups={tileGroupData}
        tileKey={'services'}
        groupTitleSubPath={'topics'}
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
