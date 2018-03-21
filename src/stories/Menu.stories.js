import React from 'react';
import { IntlProvider } from 'react-intl';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { checkA11y } from '@storybook/addon-a11y';
import { Route, Link, MemoryRouter } from 'react-router-dom';

import Menu from 'js/page_sections/Menu/Menu';
import MenuItem from 'js/page_sections/Menu/MenuItem';
import navigation from '__tmpdata/navigation';


storiesOf('Menu', module)
  .addDecorator(checkA11y)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Menu open', () => (
    <IntlProvider locale="en">
      <Menu
        isOpen={true}
        toggleMenu={linkTo('Menu' , 'Menu closed')}
      />
    </IntlProvider>
  ))
  .add('Menu closed', () => (
    <IntlProvider locale="en">
      <Menu
        isOpen={false}
        toggleMenu={linkTo('Menu', 'Menu open')}
      />
    </IntlProvider>
  ))
  .add('MenuItem closed', () => (
    <IntlProvider locale="en">
      <ul className="coa-Menu__list">
        <MenuItem
          id={1}
          theme={navigation.data.allThemes.edges[1].node}
          openSection={1}
          handleSublistToggle={linkTo('Menu', 'MenuItem open')}
          handleMenuToggle={action('handleMenuToggle')}
        />
      </ul>
    </IntlProvider>
  ))
  .add('MenuItem open', () => (
    <IntlProvider locale="en">
      <ul className="coa-Menu__list">
        <MenuItem
          id={1}
          theme={navigation.data.allThemes.edges[1].node}
          openSection={10}
          handleSublistToggle={linkTo('Menu', 'MenuItem closed')}
          handleMenuToggle={action('handleMenuToggle')}
        />
      </ul>
    </IntlProvider>
  ))
