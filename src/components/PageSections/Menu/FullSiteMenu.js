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
        style={ (!isMobile && props.isTopMenuActive) ? {
          position: "absolute",
          width: "100%",
          height: '100%',
          backgroundColor: 'rgba(27,27,27,0)',
        } : {} }
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


          <div className="coa-FullSiteMenu_dropdown" 
            style={ props.isTopMenuActive ? {
              position: "absolute",
              height: '100%',
              width: "100%",
              backgroundColor: 'rgba(27,27,27,0.25)',
            } : {} }>

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

        <div
          style={{
            backgroundColor: "white",
            height: "57px",
          }}
        ></div>

      }

      {/*
        <div style={{
            backgroundColor: "pink",
            position: "absolute",
            top: "0px",
            right: "0px",
            left: "0px",
            bottom: "0px"
        }}>
          footer
        </div>
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
