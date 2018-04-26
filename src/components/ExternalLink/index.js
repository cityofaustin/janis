import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import ExternalLinkSVG from 'components/SVGs/ExternalLink';

const i18nMessages = defineMessages({
  externalLinkAriaLabel: {
    id: 'ExternalLink.arialabel',
    defaultMessage: 'Opens in new window',
  },
});

const ExternalLink = ({ to, noIcon, children, intl }) => (
  <a
    href={to}
    className="coa-ExternalLink"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={intl.formatMessage(i18nMessages.externalLinkAriaLabel)}
  >
    {children}
    {!noIcon && <ExternalLinkSVG />}
  </a>
);

export default injectIntl(ExternalLink);
