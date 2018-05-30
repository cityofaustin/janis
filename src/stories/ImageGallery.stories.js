import React from 'react';
import { storiesOf } from '@storybook/react';

import ImageGallery from 'components/ImageGallery';

const gameboyAdvances = [
  {
    filename: '/images/gba',
    extension: '.jpg',
  },
  {
    filename: '/images/gbasp',
    extension: '.png',
  },
  {
    filename: '/images/gbam',
    extension: '.png',
  },
];

const gameboys = [
  {
    filename: '/images/gb',
    extension: '.jpg',
  },
  {
    filename: '/images/gbp',
    extension: '.jpg',
  },
  {
    filename: '/images/gbc',
    extension: '.jpg',
  },
  {
    filename: '/images/gba',
    extension: '.jpg',
  },
  {
    filename: '/images/gbasp',
    extension: '.png',
  },
  {
    filename: '/images/gbam',
    extension: '.png',
  },
];

storiesOf('ImageGallery', module)
  .add('3 Images', () => (
    <div className="wrapper container-fluid">
      <ImageGallery
        heading="Game Boy Advance Models"
        subheading="Handheld video game consoles released by Nintendo under their Game Boy Advance line."
        images={gameboyAdvances}
      />
    </div>
  ))
  .add('6 Images', () => (
    <div className="wrapper container-fluid">
      <ImageGallery
        heading="Game Boy Models"
        subheading="Handheld video game consoles released by Nintendo under their Game Boy line."
        images={gameboys}
      />
    </div>
  ));
