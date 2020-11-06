import React from 'react';
import FacebookAltSVG from 'components/SVGs/FacebookAlt';
import ExternalLink from 'components/ExternalLink';

const Facebook = ({ url }) => {
  const regex = /^(?:http\:\/\/|https\:\/\/)?(?:www\.)?facebook\.com\/((?:\w\.)*#!\/)?([\w\-\.]*\/*)*([\w\-\.]*)/;
  const matches = url.match(regex);

  return (
    <div className="coa-ContactItem coa-ContactFacebook">
      <div className="coa-ContactItem__svg">
        <FacebookAltSVG viewBox={'0 0 1024 1024'} />
      </div>
      <div className="coa-ContactItem_content">
        <ExternalLink to={url}>
          fb.com/{matches[2].replace('/', '')}
        </ExternalLink>
      </div>
    </div>
  );
};

export default Facebook;
