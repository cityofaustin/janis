import React from 'react';

import StaticMap from 'components/StaticMap';

const value = {
  description: 'This is where we work',
  location: {
    name: 'Old Faulk Central Library',
    street: '800 Guadalupe Street',
    zip: '78701',
    city: 'Austin',
    state: 'TX',
    country: 'United States',
  },
};

export default {
  title: 'StaticMap',
};

export const staticMap = () => (
  <div className="wrapper container-fluid">
    <StaticMap location={value.location} />
  </div>
);

staticMap.story = {
  name: 'StaticMap',
};
