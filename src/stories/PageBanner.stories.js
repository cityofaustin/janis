import React from 'react';
import { storiesOf } from '@storybook/react';

import PageBanner from 'js/modules/PageBanner';
import dummyImage from 'stories/images/pagebanner_test.jpg';

storiesOf('PageBanner', module)
  .add('PageBanner', () => (
    <div className="wrapper container-fluid">
      <PageBanner imageUrl={dummyImage} imageTitle={'test'} />
    </div>
  ))
