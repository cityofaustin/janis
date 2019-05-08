import React from 'react';
import { storiesOf } from '@storybook/react';

import ExternalLink from 'components/ExternalLink';

storiesOf('ExternalLink', module).add('ExternalLink', () => (
  <ExternalLink to="http://google.com" iconSize={24}>
    Go to Google.com
  </ExternalLink>
));
