import React from 'react';
import { injectIntl } from 'react-intl';
import ThemesNav from './ThemesNav';
import staticNavData from 'stories/static_data/navigationData.js';

import MenuInfo from './MenuInfo';
import ThemesTopicsMenu from './ThemesTopicsMenu';

import { usePopoverState, Popover, PopoverDisclosure } from 'reakit/Popover';

const NavMenu = props => {
  const navMenuPopover = usePopoverState();

  return (
    <div
      className={
        'coa-FullSiteMenu ' +
        (props.isTopMenuActive ? 'coa-FullSiteMenu--active' : '')
      }
    >
      <PopoverDisclosure {...navMenuPopover}>
        <div className="wrapper">
          <ThemesNav themes={staticNavData} />
        </div>
      </PopoverDisclosure>
      <section className="coa-FullSiteMenu__subNav">
        <div className="wrapper container-fluid">
          <ThemesTopicsMenu
            menu={props.navigation}
            handleFullSiteMenuItem={props.handleFullSiteMenuItem}
          />
        </div>
        <MenuInfo />
      </section>
    </div>
  );
};

export default injectIntl(NavMenu);
