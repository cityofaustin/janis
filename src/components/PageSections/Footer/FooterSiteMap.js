import React from 'react';
// import footerSiteMapData from 'stories/static_data/footerSiteMapData';
import { injectIntl } from 'react-intl';
import { footerSiteMapMenu as i18n1 } from 'js/i18n/definitions';

const FooterSiteMap = intl => (
  <div className="row">
    {i18n1.map(section => (
      <div className="col-xs-12 col-md-3">
        <h4 className="coa-FooterSiteMap__title">{section.text}</h4>
        <ul className="coa-FooterSiteMap__list">
          {section.topics.map(topic => (
            <li className="coa-FooterSiteMap__item">
              <a href={topic.url} className="coa-FooterSiteMap__link">
                {topic.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default injectIntl(FooterSiteMap);
