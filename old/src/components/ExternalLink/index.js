import React from 'react';
import PropTypes from 'prop-types';
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

ExternalLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default injectIntl(ExternalLink);
