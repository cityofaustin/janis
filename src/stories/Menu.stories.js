import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Menu from 'components/PageSections/Menu';
import MenuItem from 'components/PageSections/Menu/MenuItem';
import navigationData from 'stories/static_data/navigationData';

storiesOf('Menu', module)
  .add('Menu open', () => (
    <Menu
      isMenuOpen={true}
      toggleMenu={linkTo('Menu', 'Menu closed in mobile')}
      navigation={navigationData}
    />
  ))
  .add('Menu closed in mobile', () => (
    <Menu
      isMenuOpen={false}
      toggleMenu={linkTo('Menu', 'Menu open')}
      navigation={navigationData}
    />
  ))
  .add('MenuItem closed', () => (
    <ul className="coa-Menu__list">
      <MenuItem
        id={1}
        theme={navigationData.allThemes.edges[1].node}
        isSubmenuOpen={false}
        handleToggleAllMenus={action('handleToggleAllMenus')}
        handleSubmenuToggle={linkTo('Menu', 'MenuItem open')}
      />
    </ul>
  ))
  .add('MenuItem open', () => (
    <ul className="coa-Menu__list">
      <MenuItem
        id={1}
        theme={navigationData.allThemes.edges[1].node}
        isSubmenuOpen={true}
        handleToggleAllMenus={action('handleToggleAllMenus')}
        handleSubmenuToggle={linkTo('Menu', 'MenuItem closed')}
      />
    </ul>
  ));
