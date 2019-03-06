import React from 'react';
import FacebookSVG from 'components/SVGs/Facebook';
import ExternalLink from 'components/ExternalLink';

const Facebook = () => (
  <div className="coa-ContactItem coa-ContactFacebook">
    <div className="coa-ContactItem__svg">
      <FacebookSVG />
    </div>
    <ExternalLink to="http://austintexas.gov">
      fb.com/atxpoliceoversight/
    </ExternalLink>
  </div>
);

export default Facebook;
