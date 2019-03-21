import React from 'react';
import TwitterSVG from 'components/SVGs/Twitter';
import ExternalLink from 'components/ExternalLink';

const Twitter = ({ url }) => {
  const regex = /^https?:\/\/(www\.)?twitter\.com\/(#!\/)?([^\/]+)(\/\w+)*\/?$/;
  const matches = url.match(regex);

  return (
    <div className="coa-ContactItem coa-ContactTwitter">
      <div className="coa-ContactItem__svg">
        <TwitterSVG />
      </div>
      <div className="coa-ContactItem_content">
        <ExternalLink to="https://twitter.com/atx_opo">@{matches[3]}</ExternalLink>
      </div>
    </div>
  );
}

export default Twitter;
