import React from 'react';
import { storiesOf } from '@storybook/react';

import Footer from 'components/PageSections/Footer';
import threeoneoneData from 'stories/static_data/threeoneoneData';

storiesOf('Footer', module).add('Footer', () => (
  <Footer threeoneone={threeoneoneData} />
));
