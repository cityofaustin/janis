import React from 'react';
import { storiesOf } from '@storybook/react';

import ImageGallery from 'components/ImageGallery';

const gameboyAdvances = [
  {
    filename: '/images/gba',
    extension: '.jpg',
  },
];
const gameboys = [{}];

storiesOf('ImageGallery', module)
  .add('3 Images', () => (
    <div className="wrapper container-fluid">
      <ImageGallery images={gameboyAdvances} />
    </div>
  ))
  .add('5 Images', () => (
    <div className="wrapper container-fluid">
      <TileGroup tiles={tileData} />
    </div>
  ));
