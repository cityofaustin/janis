import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { threeoneone as i18n } from 'js/i18n/definitions';

import ListLink from 'components/ListLink';
import SectionHeader from 'components/SectionHeader';

import ThreeOneOneRequest from './ThreeOneOneRequest';
import { threeoneonePropTypes } from './proptypes';

const ThreeOneOne = ({ threeoneone, intl }) => (
  <div className="coa-ThreeOneOne">
    <div className="container-fluid wrapper">
      <div className="wrapper wrapper--sm">
        <SectionHeader>
          <ThreeOneOneRequest />
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
            text={intl.formatMessage(i18n.all311)}
          />
        </div>
      </div>
    </div>
  </div>
);

ThreeOneOne.propTypes = {
  threeoneone: threeoneonePropTypes.isRequired,
};

export default injectIntl(ThreeOneOne);
