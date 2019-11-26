import React from 'react';

import PageNotificationBanner from 'components/PageNotificationBanner';
import WorkInProgress from 'components/WorkInProgress';

export default {
  title: 'PageNotificationBanner',
};

export const pageNotificationBanner = () => (
  <PageNotificationBanner>
    <WorkInProgress />
  </PageNotificationBanner>
);

pageNotificationBanner.story = {
  name: 'PageNotificationBanner',
};
