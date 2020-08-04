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
          This site is a&nbsp;
          <a href="https://alpha.austin.gov/a-new-website-for-the-city-of-austin/" className="coa-MenuInfo__link">
            work in progress
          </a>.
          Visit&nbsp;
          <a href="https://alpha.austin.gov/a-new-website-for-the-city-of-austin/" className="coa-MenuInfo__link">
            austintexas.gov
          </a>
          &nbsp;for full city website.
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
