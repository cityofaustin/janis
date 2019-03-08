import React from 'react';
import TwitterSVG from 'components/SVGs/Twitter';
import ExternalLink from 'components/ExternalLink';

const Twitter = () => (
  <div className="coa-ContactItem coa-ContactTwitter">
    <div className="coa-ContactItem__svg">
      <TwitterSVG viewbox={'0 0 1024 1024'} />
    </div>
    <ExternalLink to="http://austintexas.gov">@ATX_OPO</ExternalLink>
  </div>
);

export default Twitter;
