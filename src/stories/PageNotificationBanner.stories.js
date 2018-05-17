import React from 'react';
import { storiesOf } from '@storybook/react';

import PageNotificationBanner from 'components/PageNotificationBanner';
import WorkInProgress from 'components/WorkInProgress';

storiesOf('PageNotificationBanner', module).add(
  'PageNotificationBanner',
  () => (
    <PageNotificationBanner>
      <WorkInProgress />
    </PageNotificationBanner>
  ),
);
