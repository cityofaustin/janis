import React from 'react';
import { storiesOf } from '@storybook/react';

import Trashy from 'components/Trashy';
import Address from 'components/Trashy/TrashyAddress';
import Schedule from 'components/Trashy/TrashySchedule';

const address = '100 Main St.';
const nextBulkPickupDate = new Date().toString();
const pickupDates = [
  {
    date: 'june 1',
    services: ['Trash', 'Recycling'],
  },
  {
    date: 'june 2',
    services: ['textiles', 'Compost'],
  },
];

storiesOf('Trashy', module)
  .add('Full component', () => <Trashy />)
  .add('Address component', () => <Address />)
  .add('Schedule component', () => (
    <Schedule
      address={address}
      nextBulkPickupDate={nextBulkPickupDate}
      pickupDates={pickupDates}
    />
  ));
