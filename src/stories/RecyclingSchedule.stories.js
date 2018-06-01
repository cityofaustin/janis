import React from 'react';
import { storiesOf } from '@storybook/react';

import RecyclingSchedule from 'components/RecyclingSchedule';

storiesOf('Recycling Schedule', module)
  .add('No address entered', () => <RecyclingSchedule />)
  .add('Address selected', () => <RecyclingSchedule />);
