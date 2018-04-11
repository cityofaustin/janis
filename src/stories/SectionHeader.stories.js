import React from 'react';
import { storiesOf } from '@storybook/react';

import SectionHeader from 'js/modules/SectionHeader';

storiesOf('SectionHeader', module)
  .add('SectionHeader', () => (
    <div className="wrapper container-fluid">
      <SectionHeader
        title="Lorem ipsum dolor sit amet cume"
      />
    </div>
  ))
