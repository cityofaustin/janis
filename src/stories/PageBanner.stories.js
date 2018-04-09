import React from 'react';

import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { IntlProvider } from 'react-intl';


import PageBanner from 'js/modules/PageBanner';

import dummyImage from 'stories/images/pagebanner_test.jpg';

storiesOf('PageBanner', module)
  .addDecorator(checkA11y)
  .add('PageBanner', () => (
    <IntlProvider locale="en">
      <div className="wrapper container-fluid">
        <PageBanner imageUrl={dummyImage} imageTitle={'test'} />
      </div>
    </IntlProvider>
  ))
