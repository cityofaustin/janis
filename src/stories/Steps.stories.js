import React from 'react';
import { storiesOf } from '@storybook/react';

import Steps from 'components/Steps';
import StepDetail from 'components/Steps/StepDetail';
import StepDetailGroup from 'components/Steps/StepDetailGroup';

import { stepData, stepDetailGroupData } from 'stories/static_data/stepData';

storiesOf('Steps', module)
  .add('Steps', () => (
    <div className="wrapper container-fluid">
      <Steps stepsAsHtmlFromAdmin={stepData} />
    </div>
  ))
  .add('Step Detail', () => (
    <div className="wrapper container-fluid">
      <StepDetail {...stepDetailGroupData[0]} />
    </div>
  ))
  .add('Step Detail Group', () => (
    <StepDetailGroup steps={stepDetailGroupData} stepClassName="wrapper--sm" />
  ));
