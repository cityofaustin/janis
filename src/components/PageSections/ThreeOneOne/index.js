import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { misc as i18n1, callToAction as i18n2 } from 'js/i18n/definitions';

import ListLink from 'components/ListLink';
import SectionHeader from 'components/SectionHeader';

const ThreeOneOne = ({ threeoneone, intl }) => (
  <div className="coa-ThreeOneOne">
    <div className="container-fluid wrapper">
      <div className="wrapper wrapper--sm">
        <SectionHeader>
          <div dangerouslySetInnerHTML={{__html:intl.formatMessage(i18n2.contact311)}} />
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
