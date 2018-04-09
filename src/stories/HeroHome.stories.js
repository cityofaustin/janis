import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { MemoryRouter } from 'react-router-dom'; 

import dummyImage from 'stories/images/herohome_test.jpg';

import HeroHome from 'js/modules/HeroHome';

storiesOf('HeroHome', module)
  .addDecorator(checkA11y)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('homepage', () => (
    <HeroHome
      imageUrl={dummyImage}
      imageTitle="Lady Bird Lake walking trail"
      preheader="Welcome to"
    />
  ))
