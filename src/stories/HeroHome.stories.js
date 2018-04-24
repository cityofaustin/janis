import React from 'react';
import { storiesOf } from '@storybook/react';

import HeroHome from 'components/HeroHome/HeroHome';
import dummyImage from 'stories/static_data/images/herohome_test.jpg';

storiesOf('HeroHome', module)
  .add('HeroHome', () => (
    <HeroHome
      imageUrl={dummyImage}
      imageTitle="Lady Bird Lake walking trail"
      preheader="Welcome to"
    />
  ))
