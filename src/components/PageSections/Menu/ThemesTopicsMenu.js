import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { misc as i18n2 } from 'js/i18n/definitions';

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

  return (
    <nav
      className={`coa-ThemesTopicsMenu ${
        props.extraClasses ? props.extraClasses : ''
      }`}
    >
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
    </nav>
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
//
// {props.menu.map((theme, index) => (
//   <li className="coa-ThemesTopicsMenu__section" key={index}>
//     <h4
//       className="coa-ThemesTopicsMenu__theme"
//       tabIndex="0"
//       onKeyDown={props.handleFullSiteMenuItem}
//     >
//       {theme.text}
//     </h4>
//     <TopicsLinks
//       handleFullSiteMenuItem={props.handleFullSiteMenuItem}
//       topicCollections={theme.topicCollectionPages.edges}
//       themeSlug={theme.slug}
//       intl={props.intl}
//     />
//   </li>
// ))}
