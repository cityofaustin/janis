import React from 'react';
import { storiesOf } from '@storybook/react';

import ExternalLink from 'js/modules/ExternalLink';

storiesOf('ExternalLink', module)
  .add('ExternalLink', () => (
    <ExternalLink to="http://google.com" iconSize={24}>
      Go to Google.com
    </ExternalLink>
  ));
