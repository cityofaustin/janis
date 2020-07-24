import React from 'react';

import Facebook from './Facebook';
import Twitter from './Twitter';
import ExternalLink from 'components/ExternalLink';

const SocialMediaLink = ({ url }) => {
  const facebookRegex = /http(s)?:\/\/(www\.)?(facebook|fb)\.com\/[A-z0-9_\-\.]+\/?/g;
  if (facebookRegex.test(url)) {
    return <Facebook url={url} />;
  }

  const twitterRegex = /http(s)?:\/\/(.*\.)?twitter\.com\/[A-z0-9_]+\/?/g;
  if (twitterRegex.test(url)) {
    return <Twitter url={url} />;
  }

  return (
    <div className="coa-ContactItem">
      <i className="material-icons">public</i>
      <div className="coa-ContactItem_content">
        <ExternalLink to={url}>{url}</ExternalLink>
      </div>
    </div>
  );
};

export default SocialMediaLink;
