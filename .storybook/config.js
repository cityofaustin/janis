import React from 'react';
import PropTypes from 'prop-types';
import { configure, addDecorator } from '@storybook/react';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import { checkA11y } from '@storybook/addon-a11y';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import I18nDecorator from 'components/I18n/I18nDecorator';
import { SUPPORTED_LANG_CODES, DEFAULT_LANG } from 'js/i18n/constants';
import localeMessages from 'js/i18n/loadLocaleData';

import 'css/coa.css';

//Fragment support hack (https://github.com/storybooks/addon-jsx/issues/34)
React.Fragment = ({ children }) => children;
React.Fragment.propTypes = {
  children: PropTypes.node.isRequired,
};
React.Fragment.displayName = 'React.Fragment';

const getMessages = locale => localeMessages[locale];

const I18nClassDecorator = storyFn => (
  <I18nDecorator>{storyFn()}</I18nDecorator>
);

const RouterDecorator = storyFn => (
  <MemoryRouter initialEntries={['/']}>{storyFn()}</MemoryRouter>
);

setIntlConfig({
  locales: SUPPORTED_LANG_CODES,
  defaultLocale: DEFAULT_LANG,
  getMessages,
});

addDecorator(I18nClassDecorator);
addDecorator(withIntl);
addDecorator(checkA11y);
addDecorator(RouterDecorator);

// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
