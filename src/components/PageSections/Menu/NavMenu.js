import React from 'react';
import { injectIntl } from 'react-intl';
import ThemesNav from './ThemesNav';
import staticNavData from 'stories/static_data/navigationData.js';

import MenuInfo from './MenuInfo';
import ThemesTopicsMenu from './ThemesTopicsMenu';

import { Popover, PopoverDisclosure } from 'reakit/Popover';

const NavMenu = props => (
  <div
    className={
      'coa-FullSiteMenu ' +
      (props.navMenuPopover.visible ? 'coa-FullSiteMenu--active' : '')
    }
  >
    <div className="coa-NavMenu__themes_wrapper">
      <PopoverDisclosure {...props.navMenuPopover}>
        <div className="wrapper">
          <ThemesNav
            themes={staticNavData}
            isTopMenuActive={props.navMenuPopover.visible}
          />
        </div>
      </PopoverDisclosure>
    </div>
    <Popover {...props.navMenuPopover} aria-label="Navigation menu">
      <section className="coa-FullSiteMenu__subNav">
        <div className="wrapper container-fluid">
          <ThemesTopicsMenu menu={props.navigation} />
        </div>
        <MenuInfo />
      </section>
    </Popover>
  </div>
);

export default injectIntl(NavMenu);
