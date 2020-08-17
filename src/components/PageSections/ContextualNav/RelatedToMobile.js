import React from 'react';
import { injectIntl } from 'react-intl';
import { misc as i18n } from 'js/i18n/definitions';

const RelatedToMobile = ({ relatedTo, offeredBy, intl }) => (
  <div className="coa-RelatedToMobile">
    <div className="wrapper container-fluid">
      {!!relatedTo && !!relatedTo.length && (
        <div className="col-xs-12">
          <h2 className="coa-RelatedToMobile__title">
            {intl.formatMessage(i18n.relatedTo)}
          </h2>
          <ul>
            {relatedTo.map((relatedLinkData, index) => (
              <li key={index} className="coa-RelatedToMobile__item">
                <a
                  href={`/${intl.locale}${relatedLinkData.url}`}
                  className="coa-RelatedToMobile__link"
                >
                  {relatedLinkData.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!!offeredBy && !!offeredBy.length && (
        <div className="col-xs-12">
          <h2
            className={
              relatedTo.length && offeredBy.length
                ? 'coa-RelatedToMobile__second-title'
                : 'coa-RelatedToMobile__title'
            }
          >
            {intl.formatMessage(i18n.offeredBy)}
          </h2>
          <ul>
            {offeredBy.map((department, index) => (
              <li key={index} className="coa-RelatedToMobile__item">
                <a
                  href={`/${intl.locale}${department.url}`}
                  className="coa-RelatedToMobile__link"
                >
                  {department.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

export default injectIntl(RelatedToMobile);
