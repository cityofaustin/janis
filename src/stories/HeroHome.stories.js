import React from 'react';
import { formatMessage, IntlProvider, injectIntl } from 'react-intl';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { checkA11y } from '@storybook/addon-a11y';
import { Route, Link, MemoryRouter } from 'react-router-dom';

import HeroHome from 'js/modules/HeroHome';

const mockImg = {
  // TODO: setup env vars in storybook
  file: 'original_images/lady-bird-lake.jpg',
  title: 'Lady Bird Lake walking trail'
}

storiesOf('HeroHome', module)
  .addDecorator(checkA11y)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('homepage', () => (
    <IntlProvider locale="en">
      <HeroHome image={mockImg} />
    </IntlProvider>
  ))
