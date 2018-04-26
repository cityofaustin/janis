import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import SectionHeader from 'components/SectionHeader';

const i18nMessages = defineMessages({
  stepsSectionTitle: {
    id: 'Steps.SectionTitle',
    defaultMessage: 'Steps',
  }
});

const Steps = ({ stepsAsHtmlFromAdmin, intl }) => (
  <div className="coa-Steps">
    <SectionHeader>{intl.formatMessage(i18nMessages.stepsSectionTitle)}</SectionHeader>
    <div className="coa-Steps__list" dangerouslySetInnerHTML={{__html: stepsAsHtmlFromAdmin}} />
  </div>
);

Steps.propTypes = {
  stepsAsHtmlFromAdmin: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
};


export default injectIntl(Steps);
