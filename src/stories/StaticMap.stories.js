import React from 'react';

import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { IntlProvider } from 'react-intl';


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
  .addDecorator(checkA11y)
  .add('StaticMap', () => (
    <IntlProvider locale="en">
      <div className="wrapper container-fluid">
        <StaticMap
          title={value.description}
          location={value.location}
        />
      </div>
    </IntlProvider>
  ))
