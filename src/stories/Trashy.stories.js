import React from 'react';
import { storiesOf } from '@storybook/react';

import Trashy from 'components/Trashy';

storiesOf('Trashy', module)
  .add('No address entered', () => <Trashy />)
  .add('Address selected', () => <Trashy />);
