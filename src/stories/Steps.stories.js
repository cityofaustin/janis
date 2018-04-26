import React from 'react';
import { storiesOf } from '@storybook/react';

import Steps from 'components/Steps';

const stepsHtml = `
  <ul>
    <li><p>Check the “What do I do with” tool below to find out what items are accepted. Some items are free to drop off and some items, like tires, require a fee.</p></li>
    <li><p>Review the Household Hazardous Waste Do’s and Don’ts below.</p></li>
    <li><p>Drop off your items at the Recycle and ReUse Center at 2514 Business Center Dr, Austin, TX 78744.</p></li>
  </ul>
`

storiesOf('Steps', module)
  .add('Steps', () => (
    <div className="wrapper container-fluid">
      <Steps stepsAsHtmlFromAdmin={stepsHtml} />
    </div>
  ))
