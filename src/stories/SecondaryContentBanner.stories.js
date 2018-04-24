import React from 'react';
import { storiesOf } from '@storybook/react';

import SecondaryContentBanner from 'components/PageSections/SecondaryContentBanner/SecondaryContentBanner';

storiesOf('SecondaryContentBanner', module)
  .add('SecondaryContentBanner', () => (
    <SecondaryContentBanner>
      <p>
        Alpha.austin.gov is a new website and a work in progress. For the full City of Austin website, visit  <a href="https://austintexas.gov">austintexas.gov</a>. Learn more about the new website at <a href="https://bit.ly/atx-digital-services">projects.austintexas.io</a>.
      </p>
    </SecondaryContentBanner>
  ))
