import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { navigation } from 'js/i18n/definitions';

import ExternalLinkSVG from 'components/SVGs/ExternalLink';

const ExternalLink = ({ underline, to, noIcon, children, intl, ariaLabel }) => (
  // passing ariaLabel as a way to have an accessible name + behavior (opens in new window)
  <a
    href={to}
    className={"coa-ExternalLink "+underline}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={
      ariaLabel
        ? ariaLabel + `, ` + intl.formatMessage(navigation.openInNewWindow)
        : intl.formatMessage(navigation.openInNewWindow)
    }
  >
    {children}
    {!noIcon && (
      <i className="material-icons coa-ExternalLinkMaterial">open_in_new</i>
    )}
  </a>
);

ExternalLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default injectIntl(ExternalLink);
