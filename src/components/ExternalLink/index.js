import React from 'react';
import { injectIntl } from 'react-intl';

import { navigation as i18n } from 'js/i18n/definitions';

import ExternalLinkSVG from 'components/SVGs/ExternalLink';


const ExternalLink = ({ to, noIcon, children, intl }) => (
  <a
    href={to}
    className="coa-ExternalLink"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={intl.formatMessage(i18n.openInNewWindow)}
  >
    {children}
    {!noIcon && <ExternalLinkSVG />}
  </a>
);

export default injectIntl(ExternalLink);
