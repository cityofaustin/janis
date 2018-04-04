import React from 'react';
import { IntlProvider } from 'react-intl';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { checkA11y } from '@storybook/addon-a11y';
import { Route, Link, MemoryRouter } from 'react-router-dom';

import Menu from 'js/page_sections/Menu/Menu';
import MenuItem from 'js/page_sections/Menu/MenuItem';
import staticNavData from 'stories/staticNavData';


storiesOf('Menu', module)
  .addDecorator(checkA11y)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Menu open', () => (
    <IntlProvider locale="en">
      <Menu
        isMenuOpen={true}
        toggleMenu={linkTo('Menu' , 'Menu closed in mobile')}
        navigation={staticNavData}
      />
    </IntlProvider>
  ))
  .add('Menu closed in mobile', () => (
    <IntlProvider locale="en">
      <Menu
        isMenuOpen={false}
        toggleMenu={linkTo('Menu' , 'Menu open')}
        navigation={staticNavData}
      />
    </IntlProvider>
  ))
  .add('MenuItem closed', () => (
    <IntlProvider locale="en">
      <ul className="coa-Menu__list">
        <MenuItem
          id={1}
          theme={staticNavData.allThemes.edges[1].node}
          isSubmenuOpen={false}
          handleToggleAllMenus={action('handleToggleAllMenus')}
          handleSubmenuToggle={linkTo('Menu', 'MenuItem open')}
        />
      </ul>
    </IntlProvider>
  ))
  .add('MenuItem open', () => (
    <IntlProvider locale="en">
      <ul className="coa-Menu__list">
        <MenuItem
          id={1}
          theme={staticNavData.allThemes.edges[1].node}
          isSubmenuOpen={true}
          handleToggleAllMenus={action('handleToggleAllMenus')}
          handleSubmenuToggle={linkTo('Menu', 'MenuItem closed')}
        />
      </ul>
    </IntlProvider>
  ))
