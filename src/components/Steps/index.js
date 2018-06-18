import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import SectionHeader from 'components/SectionHeader';

const Steps = ({ stepsAsHtmlFromAdmin, intl }) => (
  <div className="coa-Steps">
    <div
      className="coa-Steps__list"
      dangerouslySetInnerHTML={{ __html: stepsAsHtmlFromAdmin }}
    />
  </div>
);

Steps.propTypes = {
  stepsAsHtmlFromAdmin: PropTypes.string.isRequired,
};

export default injectIntl(Steps);
