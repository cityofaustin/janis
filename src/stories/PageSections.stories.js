import React from 'react';
import { injectIntl } from 'react-intl';

import navigationData from 'stories/static_data/navigationData';
import threeoneoneData from 'stories/static_data/threeoneoneData';

import Header from 'components/PageSections/Header';
import Footer from 'components/PageSections/Footer';

const HeaderWrapper = injectIntl(({ intl }) => (
  <Header navigation={navigationData[intl.locale]} path="health-safety/disaster-safety-relief" />
));

const FooterWrapper = injectIntl(({ intl }) => (
  <Footer threeoneone={threeoneoneData[intl.locale]} />
));

export default {
  title: 'Page Sections',
};

export const header = () => <HeaderWrapper />;
export const footer = () => <FooterWrapper />;
