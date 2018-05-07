import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import { checkA11y } from '@storybook/addon-a11y';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import { SUPPORTED_LANG_CODES, DEFAULT_LANG } from 'js/i18n/constants';
import localeMessages from 'js/i18n/loadLocaleData';

import 'css/coa.css';

const getMessages = (locale) => localeMessages[locale];

const RouterDecorator = storyFn => (
  <MemoryRouter initialEntries={['/']}>{storyFn()}</MemoryRouter>
);

setIntlConfig({
    locales: SUPPORTED_LANG_CODES,
    defaultLocale: DEFAULT_LANG,
    getMessages
});

addDecorator(withIntl);
addDecorator(checkA11y);
addDecorator(RouterDecorator);

// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
