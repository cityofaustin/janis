import React from 'react';
import ExternalLinkSVG from 'js/svg/ExternalLink';

const defaultIconSize = 17;

const ExternalLink = ({ to, children, iconSize }) => (
  <a href={to} className="coa-ExternalLink"
    target="_blank" rel="noopener noreferrer" aria-label="Opens in new window"
  >
    {children}
    <ExternalLinkSVG size={iconSize || defaultIconSize} />
  </a>
);

export default ExternalLink;
