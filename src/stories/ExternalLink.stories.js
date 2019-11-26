import React from 'react';

import ExternalLink from 'components/ExternalLink';

export default {
  title: 'ExternalLink',
};

export const externalLink = () => (
  <ExternalLink to="http://google.com" iconSize={24}>
    Go to Google.com
  </ExternalLink>
);

externalLink.story = {
  name: 'ExternalLink',
};
