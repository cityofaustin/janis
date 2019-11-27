import React from 'react';

import TileGroup from 'components/Tiles/TileGroup';
import Tile from 'components/Tiles/Tile';
import { tileData, tileGroupData } from 'stories/static_data/tileData';

export default {
  title: 'Tiles',
};

export const tileGroup = () => (
  <div className="wrapper container-fluid">
    <TileGroup tiles={tileData} tag="Tile" />
  </div>
);

tileGroup.story = {
  name: 'TileGroup',
};

export const tileGroupWithHeaderAndDescription = () => (
  <div className="wrapper container-fluid">
    <TileGroup
      tiles={tileData}
      tag="Tile"
      text="Recycling, trash, and compost"
      description="The City of Austin provides hundreds of services to residents to help them manage things like recycling, trash, energy, and water. This is a short list of services that will grow over time."
    />
  </div>
);

tileGroupWithHeaderAndDescription.story = {
  name: 'TileGroup with header and description',
};

export const tile = () => (
  <div className="wrapper container-fluid">
    <Tile url="http://austintexas.gov" text="City of Austin current website" tag="Tile" />
  </div>
);
