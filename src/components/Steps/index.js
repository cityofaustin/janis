import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { misc as i18n } from 'js/i18n/definitions';
import SectionHeader from 'components/SectionHeader';

const Steps = ({ stepsAsHtmlFromAdmin, intl }) => (
  <div className="coa-Steps">
    <SectionHeader>
      {intl.formatMessage(i18n.steps)}
    </SectionHeader>
    <div
      className="coa-Steps__list"
      dangerouslySetInnerHTML={{ __html: stepsAsHtmlFromAdmin }}
    />
  </div>
);

Steps.propTypes = {
  stepsAsHtmlFromAdmin: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Steps);
