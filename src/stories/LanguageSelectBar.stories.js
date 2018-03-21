import React from 'react';
import { IntlProvider } from 'react-intl';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { checkA11y } from '@storybook/addon-a11y';
import { Route, Link, MemoryRouter } from 'react-router-dom';

import LanguageSelectBar from 'js/page_sections/LanguageSelectBar';
import { SUPPORTED_LANGUAGES } from 'js/i18n/constants';


storiesOf('LanguageSelectBar', module)
  .addDecorator(checkA11y)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('english', () => (
    <IntlProvider locale="en">
      <LanguageSelectBar lang="en" />
    </IntlProvider>
  ))
  .add('spanish', () => (
    <IntlProvider locale="en">
      <LanguageSelectBar lang="es" />
    </IntlProvider>
  ))
  .add('arabic', () => (
    <IntlProvider locale="en">
      <LanguageSelectBar lang="ar" />
    </IntlProvider>
  ))
  .add('vietnamese', () => (
    <IntlProvider locale="en">
      <LanguageSelectBar lang="vi" />
    </IntlProvider>
  ))
