import React from 'react';
import { storiesOf } from '@storybook/react';

import PageSubBanner from 'components/PageSubBanner';
import WorkInProgress from 'components/WorkInProgress';

storiesOf('PageSubBanner', module).add(
  'PageSubBanner',
  () => (
    <PageSubBanner>
        <WorkInProgress />
    </PageSubBanner>
  ),
);
