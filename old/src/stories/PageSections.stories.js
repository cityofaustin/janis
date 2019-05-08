import React from 'react';
import { storiesOf } from '@storybook/react';
import { injectIntl } from 'react-intl';

import navigationData from 'stories/static_data/navigationData';
import threeoneoneData from 'stories/static_data/threeoneoneData';

import Header from 'components/PageSections/Header';
import Footer from 'components/PageSections/Footer';

const HeaderWrapper = injectIntl(({ intl }) => (
  <Header navigation={navigationData[intl.locale]} path="" />
));

const FooterWrapper = injectIntl(({ intl }) => (
  <Footer threeoneone={threeoneoneData[intl.locale]} />
));

storiesOf('Page Sections', module)
  .add('Header', () => <HeaderWrapper />)
  .add('Footer', () => <FooterWrapper />);
