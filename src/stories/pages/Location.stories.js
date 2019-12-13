import React from 'react';
import { storiesOf } from '@storybook/react';
import { cloneDeep } from 'lodash';

import LocationPage from 'components/Pages/Location';

export default {
  title: 'Pages|LocationPage',
};

const basicData = () => ({
  title: 'Neighborhood Housing and Community Development location',
  contact: {
    phone: {
      name: 'Office',
      value: '(512) 972-4942',
    },
    email: {
      name: 'Email Address',
      value: 'Address@austintexas.gov',
    },
  },
  location: {
    'Physical address': {
      street: '405 W Stassney Ln',
      city: 'Austin',
      state: 'TX',
      zip: 78745,
    },
    'Mailing address': {
      street: 'P.O. Box 1088',
      city: 'Austin',
      state: 'TX',
      zip: 78767,
    },
  },
  image: {
    filename: 'Screen_Shot_2019-10-21_at_12.02.01_PM.png',
    id: 'VHJhbnNsYXRlZEltYWdlTm9kZToxOQ==',
    title: 'Aerial photo of the Austin skyline looking over from Town Lake',
  },
  hours: {
    MONDAY: '7:30 am–noon, 1 pm–7 pm',
    TUESDAY: '7:30 am–noon, 1 pm–7 pm',
    WEDNESDAY: '7:30 am–noon, 1 pm–7 pm',
    THURSDAY: '7:30 am–noon, 1 pm–7 pm',
    FRIDAY: '7:30 am–noon, 1 pm–7 pm',
    SATURDAY: 'Closed',
    SUNDAY: 'Closed',
  },
  services: [
    {
      title: 'Get a birth certificate',
      phones: [{ number: '(512) 000-0000' }],
      hours: {
        MONDAY: '7:30 am–noon, 1 pm–7 pm',
        TUESDAY: '7:30 am–noon, 1 pm–7 pm',
        WEDNESDAY: '7:30 am–noon, 1 pm–7 pm',
        THURSDAY: '7:30 am–noon, 1 pm–7 pm',
        FRIDAY: '7:30 am–noon, 1 pm–7 pm',
        SATURDAY: 'Closed',
        SUNDAY: 'Closed',
      },
    },
    {
      title: 'Adopt a baby tarantula',
      phones: [{ number: '(512) 000-0000' }],
      hours: {
        MONDAY: '7:30 am–noon, 1 pm–7 pm',
        TUESDAY: '7:30 am–noon, 1 pm–7 pm',
        WEDNESDAY: '7:30 am–noon, 1 pm–7 pm',
        THURSDAY: '7:30 am–noon, 1 pm–7 pm',
        FRIDAY: '7:30 am–noon, 1 pm–7 pm',
        SATURDAY: 'Closed',
        SUNDAY: 'Closed',
      },
    },
  ],
  gettingHere: {
    buses: ['90', '180', '360'],
  },
});

export const basic = () => {
  const data = basicData();

  return <LocationPage locationPage={data} />;
};
basic.story = {
  name: 'Basic',
};

export const missingMailingAddress = () => {
  const data = basicData();
  delete data.location['Mailing address'];

  return <LocationPage locationPage={data} />;
};
missingMailingAddress.story = {
  name: 'Missing Mailing Address',
};
