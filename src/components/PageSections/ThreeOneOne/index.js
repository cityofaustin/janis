import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';

import ListLink from 'components/ListLink';
import SectionHeader from 'components/SectionHeader';

const i18nMessages = defineMessages({
  sectionTitleCall: {
    id: 'ThreeOneOne.sectiontitle.call',
    defaultMessage: 'Call 311',
  },
  sectionTitleOr: {
    id: 'ThreeOneOne.sectiontitle.or',
    defaultMessage: 'or',
  },
  sectionTitleSiteRequest: {
    id: 'ThreeOneOne.sectiontitle.siterequest',
    defaultMessage: 'Submit an Online Request',
  },
  listLinkAllServices: {
    id: 'ThreeOneOne.listlink.allservices',
    defaultMessage: 'All 311 Services',
  },
});

const ThreeOneOne = ({ threeoneone, intl }) => (
  <div className="coa-ThreeOneOne">
    <div className="container-fluid wrapper">
      <div className="wrapper wrapper--sm">
        <SectionHeader>
          <a href="tel:512-974-2000">
            {intl.formatMessage(i18nMessages.sectionTitleCall)}
          </a>{' '}
          {intl.formatMessage(i18nMessages.sectionTitleOr)}{' '}
          <a href="http://311.austintexas.gov/reports/list_services">
            {intl.formatMessage(i18nMessages.sectionTitleSiteRequest)}
          </a>
        </SectionHeader>
      </div>
      <div className="row">
        {threeoneone.map((link, index) => (
          <div
            key={index}
            className="coa-ThreeOneOne__link col-xs-12 col-md-6 col-lg-4"
          >
            <ListLink url={link.url} text={link.text} />
          </div>
        ))}
        <div className="col-xs-12 col-md-6 col-lg-4">
          <ListLink
            url="http://311.austintexas.gov/reports/list_services"
            text={intl.formatMessage(i18nMessages.listLinkAllServices)}
          />
        </div>
      </div>
    </div>
  </div>
);

ThreeOneOne.propTypes = {
  threeoneone: PropTypes.array.isRequired,
};

export default injectIntl(ThreeOneOne);
