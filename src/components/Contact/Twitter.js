import React from 'react';
import TwitterSVG from 'components/SVGs/Twitter';
import ExternalLink from 'components/ExternalLink';

const Twitter = () => (
  <div className="coa-ContactItem coa-ContactTwitter">
    <div className="coa-ContactItem__svg">
      <TwitterSVG />
    </div>
    <div className="coa-ContactItem_content">
      <ExternalLink to="https://twitter.com/atx_opo">@ATX_OPO</ExternalLink>
    </div>
  </div>
);

export default Twitter;
