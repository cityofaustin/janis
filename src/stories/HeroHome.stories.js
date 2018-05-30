import React from 'react';
import { storiesOf } from '@storybook/react';

import HeroHome from 'components/HeroHome';

storiesOf('HeroHome', module).add('HeroHome', () => (
  <HeroHome
    imageFilename="/images/herohome_test"
    imageTitle="Lady Bird Lake walking trail"
    preheader="Welcome to"
  />
));
