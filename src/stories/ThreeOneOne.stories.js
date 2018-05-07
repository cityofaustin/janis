import React from 'react';
import { storiesOf } from '@storybook/react';

import threeoneoneData from 'stories/static_data/threeoneoneData';
import ThreeOneOne from 'components/PageSections/ThreeOneOne';

storiesOf('ThreeOneOne', module).add('ThreeOneOne', () => (
  <div className="wrapper container-fluid">
    <ThreeOneOne threeoneone={threeoneoneData} />
  </div>
));
