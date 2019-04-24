import React from 'react';
import { injectIntl } from 'react-intl';
import ThemesNav from './ThemesNav';
import staticNavData from 'stories/static_data/navigationData.js';

import MenuInfo from './MenuInfo';
import ThemesTopicsMenu from './ThemesTopicsMenu';

const FullSiteMenu = props => (
  <div
    className={
      'coa-FullSiteMenu ' +
      (props.isTopMenuActive ? 'coa-FullSiteMenu--active' : '')
    }
    onMouseLeave={props.handleFullSiteMenuClose}
  >
    <div class="wrapper container-fluid">
      <ThemesNav
        handleOnClick={props.handleFullSiteMenuOpen}
        handleOnMouseEnter={props.handleFullSiteMenuOpen}
        themes={staticNavData}
        isTopMenuActive={props.isTopMenuActive}
        handleFullSiteMenuClose={props.handleFullSiteMenuClose}
      />
    </div>
    <section className="coa-FullSiteMenu__subNav">
      <div class="wrapper container-fluid">
        <ThemesTopicsMenu menu={staticNavData} />
      </div>
      <MenuInfo />
    </section>
  </div>
);

export default injectIntl(FullSiteMenu);
