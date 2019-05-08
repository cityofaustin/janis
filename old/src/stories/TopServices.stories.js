import React from 'react';
import { storiesOf } from '@storybook/react';

import TopServices from 'components/Tiles/TopServices';
import { topServicesData as topServices } from 'stories/static_data/topServicesData';

storiesOf('TopServices', module).add('TopServices', () => (
  <div className="wrapper container-fluid" style={{ margin: '4rem 0 0 0' }}>
    <TopServices title={'Top Services'} tiles={topServices} locale={'en'} />
  </div>
));
