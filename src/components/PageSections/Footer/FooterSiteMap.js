import React from 'react';
import { withSiteData } from 'react-static';
import { injectIntl } from 'react-intl';
import ThemesTopicsMenu from 'components/PageSections/Menu/ThemesTopicsMenu';
import ThemesTopicsMobileMenu from 'components/PageSections/Menu/ThemesTopicsMobileMenu';

const FooterSiteMap = ({ intl, navigation }) => {
  const menu = navigation[intl.locale];
  return (
    <React.Fragment>
      <div className="coa-FooterSiteMap">
        <div className="container-fluid wrapper">
          <ThemesTopicsMenu
            menu={menu}
            extraClasses={'coa-ThemesTopicsMenu--FooterSiteMap'}
          />
        </div>
      </div>
      <div className="coa-FooterMobileSiteMap">
        <ThemesTopicsMobileMenu menu={menu} />
      </div>
    </React.Fragment>
  );

  // debugger;
  // return (
  //   <div className="row">
  //     {sections.map(section => (
  //       <div className="col-xs-12 col-md-3">
  //         <h4 className="coa-FooterSiteMap__title">{section.text}</h4>
  //         <ul className="coa-FooterSiteMap__list">
  //           {section.topicCollectionPages.edges.map(edge => (
  //             <li className="coa-FooterSiteMap__item">
  //               <a href={edge.node.url} className="coa-FooterSiteMap__link">
  //                 {edge.node.title}
  //               </a>
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default withSiteData(injectIntl(FooterSiteMap));
