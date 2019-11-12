import React from 'react';
import { injectIntl } from 'react-intl';
import ThemesNav from './ThemesNav';
import staticNavData from 'js/helpers/menuNavData.js';

import MenuInfo from './MenuInfo';
import ThemesTopicsMenu from './ThemesTopicsMenu';

const FullSiteMenu = props => (
  <div
    ref={props.refnode}
    className={
      'coa-FullSiteMenu ' +
      (props.isTopMenuActive ? 'coa-FullSiteMenu--active' : '')
    }
  >
    <div className="wrapper">
      <ThemesNav
        handleOnClick={props.handleFullSiteMenuOpen}
        isTopMenuActive={props.isTopMenuActive}
        themes={staticNavData}
        handleFullSiteMenuClose={props.handleFullSiteMenuClose}
      />
    </div>
    <section className="coa-FullSiteMenu__subNav">
      <div className="wrapper container-fluid">
        <ThemesTopicsMenu
          menu={props.navigation}
          handleFullSiteMenuItem={props.handleFullSiteMenuItem}
        />
      </div>
      <MenuInfo handleToggleFullSiteMenu={props.toggleFullSiteMenu} />
    </section>
  </div>
);

export default injectIntl(FullSiteMenu);
