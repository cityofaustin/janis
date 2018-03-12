import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import ExternalLinkSVG from 'js/svg/ExternalLink';

const i18nMessages = defineMessages({
  externalLinkAriaLabel: {
    id: 'ExternalLink.arialabel',
    defaultMessage: 'Opens in new window',
  },
});
const defaultIconSize = "17";

const ExternalLink = ({to, iconSize, children, intl}) => (
  <a
    href={to}
    className="coa-ExternalLink"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={intl.formatMessage(i18nMessages.externalLinkAriaLabel)}
  >
    {children}
    <ExternalLinkSVG size={iconSize || defaultIconSize} />
  </a>
);

export default injectIntl(ExternalLink);
