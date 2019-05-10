import React from 'react';
import { withSiteData } from 'react-static';
// import footerSiteMapData from 'stories/static_data/footerSiteMapData';
import { injectIntl } from 'react-intl';
import ThemesTopicsMenu from 'components/PageSections/Menu/ThemesTopicsMenu';

const FooterSiteMap = ({ intl, navigation }) => {
  const menu = navigation[intl.locale];
  debugger;
  return (
    <div className="coa-FooterSiteMap">
      <ThemesTopicsMenu menu={menu} />
    </div>
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
