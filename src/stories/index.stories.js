import React from 'react';
import { IntlProvider } from 'react-intl';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import ExternalLink from 'js/modules/ExternalLink';

storiesOf('modules', module)
  .add('ExternalLink', () => (
    <IntlProvider locale="en">
      <ExternalLink to="http://google.com" iconSize={24}>
        Go to Google.com
      </ExternalLink>
    </IntlProvider>
  ))

storiesOf('Docs', module)
  .add('Welcome to Storybook', () => <Welcome showApp={linkTo('Button')} />)
  .add('Button with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('Button with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
