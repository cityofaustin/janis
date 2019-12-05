import React from 'react';

import PageBanner from 'components/PageBanner';
import dummyImage from 'stories/static_data/images/pagebanner_test.jpg';

export default {
  title: 'PageBanner',
};

export const pageBanner = () => (
  <div className="wrapper container-fluid">
    <PageBanner image={dummyImage} headerText={'test'} />
  </div>
);

pageBanner.story = {
  name: 'PageBanner',
};
