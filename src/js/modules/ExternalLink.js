import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import ExternalLinkSVG from 'js/svg/ExternalLink';

const i18nMessages = defineMessages({
  externalLinkAriaLabel: {
    id: 'ExternalLink.arialabel',
    defaultMessage: 'Opens in new window',
  },
});

const getIconSize = (textSize) => {
  switch(textSize) {
    case 'small':
      return "13";
      break;
    case 'medium':
    default:
      return "17";
        break;
  }
}

const ExternalLink = ({to, noIcon, iconSize, children, intl}) => (
  <a
    href={to}
    className="coa-ExternalLink"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={intl.formatMessage(i18nMessages.externalLinkAriaLabel)}
  >
    {children}
    {!noIcon && <ExternalLinkSVG size={getIconSize(iconSize)} />}
  </a>
);

export default injectIntl(ExternalLink);
