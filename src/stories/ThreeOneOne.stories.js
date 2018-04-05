import React from 'react';

import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { IntlProvider } from 'react-intl';


import ThreeOneOne from 'js/page_sections/ThreeOneOne';
import jsonFileData from '__tmpdata/pages';

const { services311 } = jsonFileData;

storiesOf('ThreeOneOne', module)
  .addDecorator(checkA11y)
  .add('ThreeOneOne', () => (
    <IntlProvider locale="en">
      <div className="wrapper container-fluid">
        <ThreeOneOne services311={services311} />
      </div>
    </IntlProvider>
  ))
