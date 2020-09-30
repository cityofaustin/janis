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
    <div>

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

          <div className={
              (props.isTopMenuActive ? 'coa-FullSiteMenu_dropdown' : '')
            }
          >

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

          </div>

      </div>

      { !isMobile && props.isTopMenuActive &&

        /*
          This div acts as a gap preserver for when the dropdown menu is active,
          which changes the mneu position to absolute, thus the static gap is lost.
          Here we recreate that.
        */

        <div className="coa-FullSiteMenu__activeGapFill"></div>

      }

    </div>
  )
}

export default injectIntl(FullSiteMenu);
