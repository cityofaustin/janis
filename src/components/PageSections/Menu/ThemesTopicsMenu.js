import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { misc as i18n2 } from 'js/i18n/definitions';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import ExternalLink from 'components/ExternalLink';

import ChevronRightBlue from 'components/SVGs/ChevronRightBlue';
import WorkInProgressBanner from 'components/WorkInProgress/WorkInProgressBanner.js';

const TopicsLinks = props => {

  let columnWidth = ""
  if (props.topicCollections.length > 4) {
    columnWidth = "2col"
    if (props.topicCollections.length > 8) {
      columnWidth = "3col"
    }
  }

  return (
    <div className="coa-ThemesTopicsMenu__topics-container">

      {props.topicCollections.length > 0 ? (

        <ul className={ "coa-ThemesTopicsMenu__topics coa-ThemesTopicsMenu__topics"+columnWidth }>
          {props.topicCollections.map((tc, index) => (
            <li
              key={index}
              className="coa-ThemesTopicsMenu__topic"
              onKeyDown={props.handleFullSiteMenuItem}
            >
              <a
                href={`/${props.intl.locale}${
                  tc.node.slug ? `/${props.themeSlug}/${tc.node.slug}` : tc.node.url
                }`}
                className="coa-ThemesTopicsMenu__link"
              >
                {tc.node.title}
              </a>
            </li>
          ))}
        </ul>

      ) : (

        <p className="coa-FullSiteMenu__coming-soon">
          {props.intl.formatMessage(i18n2.comingSoon)}
        </p>

      )}

    </div>

  )
}


const ThemesTopicsMenu = props => {

  const topicMenu = props.menu.find( menu => menu.slug === props.slug)
  const isMobile = useMobileQuery();

  return (
      <nav
        className={`coa-ThemesTopicsMenu ${
          props.extraClasses ? props.extraClasses : ''
        }`}
      >
      {isMobile ? (

        <ul className="coa-ThemesTopicsMenuMobile">

          <div className="coa-MessageWIP mobile">
            <WorkInProgressBanner />
          </div>

          <div className="coa-ThemesTopicsMenuMobile__line"></div>

          {props.menu.map((theme, index) => (
            <MobileThemesTopicsMenu
              index={index}
              theme={theme}
              intl={props.intl}
              handleFullSiteMenuItem={props.handleFullSiteMenuItem}
            />
          ))}

          <li className="coa-ThemesTopicsMenuMobile__external">
            <ExternalLink
              to="http://www.austintexas.gov/airport"
              ariaLabel={props.intl.formatMessage(i18n2.airport)}
            >{props.intl.formatMessage(i18n2.airport)}</ExternalLink>
          </li>

          <li className="coa-ThemesTopicsMenuMobile__external">
            <ExternalLink
              to="http://311.austintexas.gov/"
              ariaLabel={'three one one'}
            >AUS:311</ExternalLink>
          </li>

        </ul>

      ) : (

        <ul className="coa-ThemesTopicsMenu__list">
          { topicMenu &&
            <li className="coa-ThemesTopicsMenu__section" >
              <h4
                className="coa-ThemesTopicsMenu__theme"
                tabIndex="0"
                onKeyDown={props.handleFullSiteMenuItem}
              >
                {topicMenu.text}
              </h4>
              <TopicsLinks
                handleFullSiteMenuItem={props.handleFullSiteMenuItem}
                topicCollections={topicMenu.topicCollectionPages.edges}
                themeSlug={topicMenu.slug}
                intl={props.intl}
              />
            </li>
          }
        </ul>

      )}

    </nav>

  )

}


const MobileThemesTopicsMenu = ({index, theme, intl, handleFullSiteMenuItem}) => {

  let [ open, setOpen ] = useState(false)

  return (
    <li className="coa-ThemesTopicsMenu__section mobile" key={index}>
      <h4
        className={"coa-ThemesTopicsMenu__theme mobile "+(open && "open")}
        tabIndex="0"
        onClick={()=>setOpen(!open)}
      >
        {theme.text}

      <ChevronRightBlue
        className={"coa-ThemesTopicsMenuMobile__Chevron "+(open && "open")}
      />

      </h4>
      {open &&
        <div className="coa-ThemesTopicsMenuMobile__topics">
          <TopicsLinks
            handleFullSiteMenuItem={handleFullSiteMenuItem}
            topicCollections={theme.topicCollectionPages.edges}
            themeSlug={theme.slug}
            intl={intl}
          />
        </div>

      }

    </li>
  )

}


TopicsLinks.propTypes = {
  themeSlug: PropTypes.string.isRequired,
  topicCollections: PropTypes.array,
  handleFullSiteMenuItem: PropTypes.func,
};

ThemesTopicsMenu.propTypes = {
  menu: PropTypes.array.isRequired,
};

export default injectIntl(ThemesTopicsMenu);
