import React from 'react';
import { storiesOf } from '@storybook/react';

import FullSiteMenu from 'components/PageSections/Menu/FullSiteMenu';

import contactData from 'stories/static_data/contactData';

storiesOf('FullSiteMenu', module).add('FullSiteMenu', () => (
  <div className="wrapper container-fluid">
    <FullSiteMenu />
  </div>
));
