import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import { threeoneone as i18n1, callToAction as i18n2 } from 'js/i18n/definitions';

import ExternalLink from 'components/ExternalLink';
import ListLink from 'components/ListLink';
import SectionHeader from 'components/SectionHeader';

const ThreeOneOne = ({ threeoneone, intl }) => (
  <div className="coa-ThreeOneOne">
    <div className="container-fluid wrapper">
      <div className="wrapper wrapper--sm">
        <SectionHeader>
          <FormattedMessage
            id="threeoneone.contact311"
            values={{
              call311Link: (
                <a href="tel:512-974-2000" aria-label="3 1 1.">{intl.formatMessage(i18n1.call311)}</a>
              ),
              submit311Link: (
                <ExternalLink to="http://311.austintexas.gov/reports/list_services">
                  {intl.formatMessage(i18n2.submitOnlineRequest)}
                </ExternalLink>
              ),
            }}
          />
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
            text={intl.formatMessage(i18n1.all311)}
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
