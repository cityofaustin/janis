import React from 'react';
import ExternalLinkSVG from 'js/svg/ExternalLink';

const defaultIconSize = "17";

const ExternalLink = (props) => (
  <a href={props.to} className="coa-ExternalLink"
    target="_blank" rel="noopener noreferrer" aria-label="Opens in new window"
  >
    {props.children}
    <ExternalLinkSVG size={props.iconSize || defaultIconSize} />
  </a>
);

export default ExternalLink;
