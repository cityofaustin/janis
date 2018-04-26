import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from 'components/PageSections/Header';
import navigationData from 'stories/static_data/navigationData';

storiesOf('Header', module)
  .add('Header', () => <Header navigation={navigationData}/>)
