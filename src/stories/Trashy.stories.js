import React from 'react';

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

export default {
  title: 'Trashy',
};

export const fullComponent = () => <Trashy />;

fullComponent.story = {
  name: 'Full component',
};

export const addressComponent = () => <Address />;

addressComponent.story = {
  name: 'Address component',
};

export const scheduleComponent = () => (
  <Schedule address={address} nextBulkPickupDate={nextBulkPickupDate} pickupDates={pickupDates} />
);

scheduleComponent.story = {
  name: 'Schedule component',
};
