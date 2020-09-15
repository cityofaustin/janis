import React from 'react';
import { injectIntl } from 'react-intl';
import { misc as i18n2 } from 'js/i18n/definitions';
import ThemesNav from './ThemesNav';
import WorkInProgressBanner from 'components/WorkInProgress/WorkInProgressBanner.js';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';

import MenuInfo from './MenuInfo';
import ThemesTopicsMenu from './ThemesTopicsMenu';

const FullSiteMenu = props => {

  const isMobile = useMobileQuery();

  return (
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

      {!isMobile &&
        <div style={ props.isTopMenuActive ? {
            backgroundColor: 'rgba(27,27,27,0.25)',
            // paddingBottom: '70px',
            // flex: '0 1 40px',
            display: 'flex',
            flexFlow: 'column',
            height: '100%',
            paddingTop: '1px' //  should be conditional in WIP message
          } : {} }>
          <section className="coa-FullSiteMenu__container">
            <div className="wrapper container-fluid">
              <div className="coa-MessageWIP">
                <WorkInProgressBanner />
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


      }


      {/*
        {!isMobile &&
          <section className="coa-FullSiteMenu__container">
            <div className="wrapper container-fluid">
              <div className="coa-MessageWIP">
                <WorkInProgressBanner />
              </div>
            </div>
          </section>
        }

        <section className="coa-FullSiteMenu__subNav">
          <div className="wrapper container-fluid">
            <ThemesTopicsMenu
              menu={props.navigation}
              handleFullSiteMenuItem={props.handleFullSiteMenuItem}
              slug={props.slug}
            />
          </div>
        </section>
      */}

    </div>
  )
}

export default injectIntl(FullSiteMenu);
