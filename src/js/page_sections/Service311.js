import React, { Component } from "react";
import { defineMessages, injectIntl } from 'react-intl';
import ListLink from 'js/modules/ListLink';

const i18nMessages = defineMessages({
  service311Sectiontitle: {
    id: 'Service311.sectiontitle',
    defaultMessage: 'Request 311 Service or Call',
  },
  service311Sectionbody: {
    id: 'Service311.sectionbody',
    defaultMessage: '311 is the city of Austin’s 24 hour information desk.',
  },
  service311Sectionlink: {
    id: 'Service311.sectionlink',
    defaultMessage: 'See a Full List of 311 Services',
  },
});

const Service311 = ({ services311, intl }) => {
  if (!services311 || !services311.length) return null;
  return (
    <div className="coa-section">
      <div className="container-fluid wrapper">
        <div className="coa-section__title">
          <h3>{intl.formatMessage(i18nMessages.service311Sectiontitle)} <a className="nowrap" href="tel:512-974-2000">512-974-2000</a></h3>
        </div>
        <p>{intl.formatMessage(i18nMessages.service311Sectionbody)}</p>
        <div className="row">
        {
          services311.map((service, index) =>
            <div key={index} className="col-xs-12 col-lg-4">
              <ListLink
                url={service.url}
                text={service.title}
              />
            </div>
          )
        }
        </div>
        <a className="coa-section__link" href="http://311.austintexas.gov/reports/list_services">{intl.formatMessage(i18nMessages.service311Sectionlink)}</a>
      </div>
    </div>
  );
}

export default injectIntl(Service311);
