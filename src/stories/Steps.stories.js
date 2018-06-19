import React from 'react';
import { storiesOf } from '@storybook/react';

import Steps from 'components/Steps';
import StepDetail from 'components/Steps/StepDetail';

const stepsHtml = `
  <ul>
    <li><p>Check the “What do I do with” tool below to find out what items are accepted. Some items are free to drop off and some items, like tires, require a fee.</p></li>
    <li><p>Review the Household Hazardous Waste Do’s and Don’ts below.</p></li>
    <li><p>Drop off your items at the Recycle and ReUse Center at 2514 Business Center Dr, Austin, TX 78744.</p></li>
  </ul>
`;

storiesOf('Steps', module)
  .add('Steps', () => (
    <div className="wrapper container-fluid">
      <Steps stepsAsHtmlFromAdmin={stepsHtml} />
    </div>
  ))
  .add('Step Detail', () => (
    <div className="wrapper container-fluid">
      <StepDetail
        title="1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
        content="<ul><li>While you can get a foster animal before completing this step, you will need to attend a foster program orientation within three months of becoming approved to foster. You will learn about shelter operations and the important role that the foster program and foster care providers play</li><li>some detail step here</li><li>some detail step here</li></ul>"
        link={{ text: 'Link To Somewhere', url: '#' }}
      />
    </div>
  ));
