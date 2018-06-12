import React from 'react';
import { storiesOf } from '@storybook/react';

import PageBanner from 'components/PageBanner';

storiesOf('PageBanner', module).add('PageBanner', () => (
  <PageBanner
    imagesPath="images"
    imageFilename="pagebanner_test"
    imageExtension=".jpg"
    imageTitle={'test'}
  />
));
