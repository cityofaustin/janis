import React from 'react';
import { storiesOf } from '@storybook/react';

import TileGroupSet from 'components/Tiles/TileGroupSet';
import TileGroup from 'components/Tiles/TileGroup';
import Tile from 'components/Tiles/Tile';
import { tileData, tileGroupData } from 'stories/static_data/tileData';

storiesOf('Tiles', module)
  .add('TileGroupSet', () => (
    <div className="wrapper container-fluid">
      <TileGroupSet tileGroups={tileGroupData} tag="Tile" />
    </div>
  ))
  .add('TileGroup', () => (
    <div className="wrapper container-fluid">
      <TileGroup tiles={tileData} tag="Tile" />
    </div>
  ))
  .add('TileGroup with header and description', () => (
    <div className="wrapper container-fluid">
      <TileGroup
        tiles={tileData}
        tag="Tile"
        text="Recycling, trash, and compost"
        description="The City of Austin provides hundreds of services to residents to help them manage things like recycling, trash, energy, and water. This is a short list of services that will grow over time."
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
  ));
