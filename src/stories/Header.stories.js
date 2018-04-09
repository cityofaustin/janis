import React from 'react';
import { IntlProvider } from 'react-intl';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { checkA11y } from '@storybook/addon-a11y';
import { MemoryRouter } from 'react-router-dom';

import Header from 'js/page_sections/Header';


storiesOf('Header', module)
  .addDecorator(checkA11y)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Header', () => (
    <IntlProvider locale="en">
      <Header/>
    </IntlProvider>
  ))
