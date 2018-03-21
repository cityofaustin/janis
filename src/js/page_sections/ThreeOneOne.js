import React from "react";
import { defineMessages, injectIntl } from 'react-intl';
import ListLink from 'js/modules/ListLink';

const i18nMessages = defineMessages({
  threeoneoneSectionTitleCall: {
    id: 'ThreeOneOne.sectiontitle.call',
    defaultMessage: 'Call 311',
  },
  threeoneoneSectionTitleOr: {
    id: 'ThreeOneOne.sectiontitle.or',
    defaultMessage: 'or',
  },
  threeoneoneSectionTitleSiteRequest: {
    id: 'ThreeOneOne.sectiontitle.siterequest',
    defaultMessage: 'Submit an Online Request',
  }
});

const ThreeOneOne = ({ services311, intl }) => (
  <div className="coa-ThreeOneOne">
    <div className="container-fluid wrapper">
      <h2 className="coa-ThreeOneOne__title">
        <a href="tel:512-974-2000">{intl.formatMessage(i18nMessages.threeoneoneSectionTitleCall)}</a> {intl.formatMessage(i18nMessages.threeoneoneSectionTitleOr)} <a href="http://311.austintexas.gov/reports/list_services">{intl.formatMessage(i18nMessages.threeoneoneSectionTitleSiteRequest)}</a>
      </h2>
      <div className="coa-ThreeOneOne__listlinks row">
      {
        services311.map((service, index) =>
          <div key={index} className="col-xs-12 col-md-6 col-lg-4">
            <ListLink
              url={service.url}
              text={service.title}
            />
          </div>
        )
      }
      </div>
    </div>
  </div>
)

export default injectIntl(ThreeOneOne);
