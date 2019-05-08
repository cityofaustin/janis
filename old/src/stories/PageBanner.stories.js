import React from 'react';
import { storiesOf } from '@storybook/react';

import PageBanner from 'components/PageBanner';
import dummyImage from 'stories/static_data/images/pagebanner_test.jpg';

storiesOf('PageBanner', module).add('PageBanner', () => (
  <div className="wrapper container-fluid">
    <PageBanner imageUrl={dummyImage} imageTitle={'test'} />
  </div>
));
