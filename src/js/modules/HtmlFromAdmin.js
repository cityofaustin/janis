import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';

const i18nMessages = defineMessages({
  htmlFromAdminSectionTitle: {
    id: 'HtmlFromAdmin.SectionTitle',
    defaultMessage: 'What else do I need to know?',
  }
});

const HtmlFromAdmin = ({content, intl}) => (
  <div className="coa-HtmlFromAdmin">
    <h2 className="coa-HtmlFromAdmin__title">{intl.formatMessage(i18nMessages.htmlFromAdminSectionTitle)}</h2>
    <div className="coa-HtmlFromAdmin__content" dangerouslySetInnerHTML={{__html: content}} />
  </div>
);

export default injectIntl(HtmlFromAdmin);
