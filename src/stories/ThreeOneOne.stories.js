import React from 'react';
import { storiesOf } from '@storybook/react';

import ThreeOneOne from 'components/PageSections/ThreeOneOne/ThreeOneOne';
import jsonFileData from 'stories/static_data/pages';

storiesOf('ThreeOneOne', module)
  .add('ThreeOneOne', () => (
    <div className="wrapper container-fluid">
      <ThreeOneOne threeoneone={threeoneoneData} />
    </div>
  ))
