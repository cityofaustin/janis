import React from 'react';
import { storiesOf } from '@storybook/react';

import ImageGallery from 'components/ImageGallery';

const gameboyAdvances = [
  {
    filename: '/images/gba',
    extension: '.jpg',
    description: 'Game Boy Advance',
  },
  {
    filename: '/images/gbasp',
    extension: '.png',
    description: 'Game Boy Advance SP',
  },
  {
    filename: '/images/gbam',
    extension: '.png',
    description: 'Game Boy Micro',
  },
];

const gameboys = [
  {
    filename: '/images/gb',
    extension: '.jpg',
    description: 'Game Boy',
  },
  {
    filename: '/images/gbp',
    extension: '.jpg',
    description: 'Game Boy Pocket',
  },
  {
    filename: '/images/gbc',
    extension: '.jpg',
    description: 'Game Boy Color',
  },
  {
    filename: '/images/gba',
    extension: '.jpg',
    description: 'Game Boy Advance',
  },
  {
    filename: '/images/gbasp',
    extension: '.png',
    description: 'Game Boy Advance SP',
  },
  {
    filename: '/images/gbam',
    extension: '.png',
    description: 'Game Boy Micro',
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
