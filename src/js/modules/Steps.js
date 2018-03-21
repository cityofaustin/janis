import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';

const i18nMessages = defineMessages({
  stepsSectionTitle: {
    id: 'Steps.SectionTitle',
    defaultMessage: 'Steps',
  }
});

const Steps = ({ steps, intl }) => (
  <div className="coa-Steps">
    <h2 className="coa-Steps__title">{intl.formatMessage(i18nMessages.stepsSectionTitle)}</h2>
    <div className="coa-Steps__list" dangerouslySetInnerHTML={{__html: steps}} />
  </div>
);

export default injectIntl(Steps);
