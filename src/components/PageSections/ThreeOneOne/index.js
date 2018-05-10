import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { threeoneone as i18n } from 'js/i18n/definitions';

import ThreeOneOneRequest from 'components/PageSections/ThreeOneOne/ThreeOneOneRequest';
import ListLink from 'components/ListLink';
import SectionHeader from 'components/SectionHeader';

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
  threeoneone: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default injectIntl(ThreeOneOne);
