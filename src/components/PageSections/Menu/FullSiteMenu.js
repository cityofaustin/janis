import React from 'react';
import { injectIntl } from 'react-intl';
import ThemesNav from './ThemesNav';

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
        handleFullSiteMenuClose={props.handleFullSiteMenuClose}
        navigation={props.navigation}
        slug={props.slug}
      />
    </div>

    <section className="coa-FullSiteMenu__container">
      <div className="wrapper container-fluid">
        <div className="coa-MessageWIP">
          [en/es] This site is a
          🔗work in progress🔗.
          Visit 🔗austintexas.gov for full city website.🔗
        </div>
      </div>
    </section>

    <section className="coa-FullSiteMenu__subNav">
      <div className="wrapper container-fluid">
        <ThemesTopicsMenu
          menu={props.navigation}
          handleFullSiteMenuItem={props.handleFullSiteMenuItem}
          slug={props.slug}
        />
      </div>
    </section>

  </div>
);

export default injectIntl(FullSiteMenu);

// <section className="coa-FullSiteMenu__subNav">
//   <div className="wrapper container-fluid">
//     <ThemesTopicsMenu
//       menu={props.navigation}
//       handleFullSiteMenuItem={props.handleFullSiteMenuItem}
//       slug={props.slug}
//     />
//   </div>
//   <MenuInfo handleToggleFullSiteMenu={props.toggleFullSiteMenu} />
// </section>
//
