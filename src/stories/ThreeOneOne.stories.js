import React from 'react';
import { storiesOf } from '@storybook/react';

import ThreeOneOne from 'components/PageSections/ThreeOneOne/ThreeOneOne';
import jsonFileData from 'stories/static_data/pages';

const { services311 } = jsonFileData;

storiesOf('ThreeOneOne', module)
  .add('ThreeOneOne', () => (
    <div className="wrapper container-fluid">
      <ThreeOneOne services311={services311} />
    </div>
  ))
