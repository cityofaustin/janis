import React from 'react';

import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';

import SectionHeader from 'js/modules/SectionHeader';


storiesOf('SectionHeader', module)
  .addDecorator(checkA11y)
  .add('SectionHeader', () => (
    <div className="wrapper container-fluid">
      <SectionHeader
        title="Lorem ipsum dolor sit amet cume"
      />
    </div>
  ))
