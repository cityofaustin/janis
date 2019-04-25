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
  >
    <div class="wrapper container-fluid">
      <ThemesNav
        handleOnClick={props.handleFullSiteMenuOpen}
        isTopMenuActive={props.isTopMenuActive}
        themes={staticNavData}
        handleFullSiteMenuClose={props.handleFullSiteMenuClose}
      />
    </div>
    <section className="coa-FullSiteMenu__subNav">
      <div className="wrapper container-fluid">
        <ThemesTopicsMenu menu={props.navigation} />
      </div>
      <MenuInfo />
    </section>
  </div>
);

export default injectIntl(FullSiteMenu);
