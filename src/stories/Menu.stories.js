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
      closeMenu={linkTo('Menu', 'Menu closed')}
      navigation={navigationData}
    />
  ))
  .add('Menu closed', () => (
    <Menu
      isMenuOpen={false}
      closeMenu={linkTo('Menu', 'Menu closed')}
      navigation={navigationData}
    />
  ))
  .add('MenuItem open', () => (
    <ul className="coa-Menu__list">
      <MenuItem
        id={1}
        theme={navigationData[0]}
        isSubmenuOpen={true}
        handleSubmenuToggle={linkTo('Menu', 'MenuItem closed')}
      />
    </ul>
  ))
  .add('MenuItem closed', () => (
    <ul className="coa-Menu__list">
      <MenuItem
        id={1}
        theme={navigationData[0]}
        isSubmenuOpen={false}
        handleSubmenuToggle={linkTo('Menu', 'MenuItem open')}
      />
    </ul>
  ));
