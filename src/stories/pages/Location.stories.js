import React from 'react';
import { storiesOf } from '@storybook/react';

import LocationPage from 'components/Pages/Location';

export default {
  title: 'Pages|LocationPage',
};

export const locationPage = () => {
  const locationPage = {
    title: "Test Location Page"
  };

  return (
    <LocationPage
      locationPage={locationPage}
    />
  );
}

locationPage.story = {
  name: "Default"
}
