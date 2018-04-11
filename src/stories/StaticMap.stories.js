import React from 'react';
import { storiesOf } from '@storybook/react';

import StaticMap from 'js/modules/StaticMap';

const value = {
  description: "This is where we work",
  location: {
    name: "Old Faulk Central Library",
    street: "800 Guadalupe Street",
    zip: "78701",
    city: "Austin",
    state: "TX",
    country: "United States",
  }
}

storiesOf('StaticMap', module)
  .add('StaticMap', () => (
    <div className="wrapper container-fluid">
      <StaticMap
        title={value.description}
        location={value.location}
      />
    </div>
  ))
