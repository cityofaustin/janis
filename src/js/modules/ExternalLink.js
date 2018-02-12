import React from 'react';
import ExternalLinkSVG from 'js/svg/ExternalLink'

const ExternalLink = (props) => (
  <a href={props.to} className="coa-ExternalLink">
    {props.children}
    <ExternalLinkSVG size="17" />
  </a>
);

export default ExternalLink;
