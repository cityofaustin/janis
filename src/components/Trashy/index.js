import React from 'react';
import TrashySchedule from 'components/Trashy/TrashySchedule';

const Trashy = () => {
  const address = '1000 Congress Ave, Austin, TX';
  const nextBulkPickupDate = new Date();
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

  return (
    <div>
      <div>TODO: Implement the Recycling Schedule component.</div>
      <TrashySchedule
        address={address}
        pickupDates={pickupDates}
        nextBulkPickupDate={nextBulkPickupDate}
      />
    </div>
  );
};

export default Trashy;
