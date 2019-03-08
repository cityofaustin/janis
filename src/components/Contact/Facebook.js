import React from 'react';
import FacebookAltSVG from 'components/SVGs/FacebookAlt';
import ExternalLink from 'components/ExternalLink';

const Facebook = () => (
  <div className="coa-ContactItem coa-ContactFacebook">
    <div className="coa-ContactItem__svg">
      <FacebookAltSVG viewBox={'0 0 1024 1024'} />
    </div>
    <ExternalLink to="http://austintexas.gov">
      fb.com/atxpoliceoversight/
    </ExternalLink>
  </div>
);

export default Facebook;
