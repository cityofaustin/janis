import React from 'react';
import { storiesOf } from '@storybook/react';

import ThreeOneOne from 'js/page_sections/ThreeOneOne';
import threeoneoneData from 'stories/static_data/threeoneoneData';

storiesOf('ThreeOneOne', module)
  .add('ThreeOneOne', () => (
    <div className="wrapper container-fluid">
      <ThreeOneOne threeoneone={threeoneoneData} />
    </div>
  ))
