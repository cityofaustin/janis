import React from 'react';
import { storiesOf } from '@storybook/react';

import TopServices from 'components/Tiles/TopServices';
import { topServicesData as topServices } from 'stories/static_data/topServicesData';

storiesOf('TopServices', module).add('TopServices', () => (
  <TopServices text={'Top Services'} tiles={topServices} locale={'en'} />
));
