import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import '../src/css/coa.css';

const IntlDecorator = storyFn => (
  <IntlProvider locale="en">{storyFn()}</IntlProvider>
);

const RouterDecorator = storyFn => (
  <MemoryRouter initialEntries={['/']}>{storyFn()}</MemoryRouter>
);

addDecorator(IntlDecorator);
addDecorator(checkA11y);
addDecorator(RouterDecorator);

// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
