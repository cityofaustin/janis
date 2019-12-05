import React from 'react';

import HeroHome from 'components/HeroHome';
import dummyImage from 'stories/static_data/images/herohome_test.jpg';

export default {
  title: 'HeroHome',
};

export const heroHome = () => (
  <HeroHome
    imageUrl={dummyImage}
    imageTitle="Lady Bird Lake walking trail"
    preheader="Welcome to"
  />
);

heroHome.story = {
  name: 'HeroHome',
};
