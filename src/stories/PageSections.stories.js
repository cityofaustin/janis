import React from 'react';
import { storiesOf } from '@storybook/react';

import Footer from 'components/PageSections/Footer';
import threeoneoneData from 'stories/static_data/threeoneoneData';
import Header from 'components/PageSections/Header';
import navigationData from 'stories/static_data/navigationData';

storiesOf('Page Sections', module)
  .add('Header', () => <Header navigation={navigationData} path="" />)
  .add('Footer', () => <Footer threeoneone={threeoneoneData} />);
