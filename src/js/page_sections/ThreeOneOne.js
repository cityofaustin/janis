import React from "react";
import { defineMessages, injectIntl } from 'react-intl';
import ListLink from 'js/modules/ListLink';
import SectionHeader from 'js/modules/SectionHeader';

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
      <div className="wrapper wrapper--sm">
        <SectionHeader>
          <a href="tel:512-974-2000">{intl.formatMessage(i18nMessages.threeoneoneSectionTitleCall)}</a> {intl.formatMessage(i18nMessages.threeoneoneSectionTitleOr)} <a href="http://311.austintexas.gov/reports/list_services">{intl.formatMessage(i18nMessages.threeoneoneSectionTitleSiteRequest)}</a>
        </SectionHeader>
      </div>
      <div className="row">
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
