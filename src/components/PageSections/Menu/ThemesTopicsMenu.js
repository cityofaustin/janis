import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { misc as i18n2 } from 'js/i18n/definitions';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import ExternalLink from 'components/ExternalLink';


const TopicsLinks = props => {

  //
  //
    // if (props.topicCollections.length > 0) {
    //
    //   props.topicCollections.push({ node:{slug: "something-new",title: "New Added Theme "}})
    //
    // }
    console.log("props :", props)
  //
  //

  // columnWidth = ""

  return (
    <div className="coa-ThemesTopicsMenu__topics-container">

      {props.topicCollections.length > 0 ? (

        <ul className="coa-ThemesTopicsMenu__topics">
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


// <ul className="coa-ThemesTopicsMenu__topicsX"
//   style={{backgroundColor: "purple"}}>
//   <li>ok 2 x 1</li>
//   <li>ok 2 x 2</li>
//   <li>ok 2 x 1</li>
//   <li>ok 2 x 2</li>
// </ul>
//
// <ul className="coa-ThemesTopicsMenu__topicsX"
//   style={{backgroundColor: "yellow"}}>
//   <li>ok 3 x 1</li>
//   <li>ok 2 x 2</li>
// </ul>

// <ul className="coa-ThemesTopicsMenu__topicsX">
//   {props.topicCollections.map((tc, index) => (
//     <li
//       key={index}
//       className="coa-ThemesTopicsMenu__topicX"
//       onKeyDown={props.handleFullSiteMenuItem}
//     >
//       <a
//         href={`/${props.intl.locale}${
//           tc.node.slug ? `/${props.themeSlug}/${tc.node.slug}` : tc.node.url
//         }`}
//         className="coa-ThemesTopicsMenu__linkX"
//       >
//         {tc.node.title}
//       </a>
//     </li>
//   ))}
// </ul>



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

          {props.menu.map((theme, index) => (
            <MobileThemesTopicsMenu
              index={index}
              theme={theme}
              intl={props.intl}
              handleFullSiteMenuItem={props.handleFullSiteMenuItem}
            />
          ))}

          <li>
            <ExternalLink
              to="http://311.austintexas.gov/"
              ariaLabel={'three one one'}
            >311</ExternalLink>
          </li>

          <li>
            <ExternalLink
              to="http://www.austintexas.gov/airport"
              ariaLabel={props.intl.formatMessage(i18n2.airport)}
            >{props.intl.formatMessage(i18n2.airport)}</ExternalLink>
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
    <li className="coa-ThemesTopicsMenu__section" key={index}>
      <h4
        className="coa-ThemesTopicsMenu__theme mobile"
        tabIndex="0"
        onClick={()=>setOpen(!open)}
      >
        {theme.text}
      </h4>
      {open &&
        <TopicsLinks
          handleFullSiteMenuItem={handleFullSiteMenuItem}
          topicCollections={theme.topicCollectionPages.edges}
          themeSlug={theme.slug}
          intl={intl}
        />
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
