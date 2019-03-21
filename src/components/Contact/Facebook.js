import React from 'react';
import FacebookAltSVG from 'components/SVGs/FacebookAlt';
import ExternalLink from 'components/ExternalLink';

const Facebook = ({ url }) => {
  const twitterRegex = /m[twitter\.com/+(?:#!/+)?(\w+)]/g;
  const twitterMatch = url.match(twitterRegex);
  // debugger;
  const fbProfileName = "blarg";


  return (
    <div className="coa-ContactItem coa-ContactFacebook">
      <div className="coa-ContactItem__svg">
        <FacebookAltSVG viewBox={'0 0 1024 1024'} />
      </div>
      <div className="coa-ContactItem_content">
        <ExternalLink to={url}>
          @{fbProfileName}
        </ExternalLink>
      </div>
    </div>
  );
}

export default Facebook;
