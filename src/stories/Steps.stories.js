import React from 'react';
import { storiesOf } from '@storybook/react';

import Steps from 'components/Steps';
import StepWithOptions from 'components/Steps/StepWithOptions';
import StepBasic from 'components/Steps/StepBasic';
import StepDetail from 'components/Steps/StepDetail';
import StepDetailGroup from 'components/Steps/StepDetailGroup';

import { stepData, stepDetailGroupData } from 'stories/static_data/stepData';

storiesOf('Steps', module)
  .add('Steps', () => (
    <div className="wrapper container-fluid">
      <Steps steps={stepData} />
    </div>
  ))
  .add('Step Basic', () => (
    <div className="wrapper container-fluid">
      <StepBasic stepAsHtmlFromAdmin={stepData[1].value} />
    </div>
  ))
  .add('Step With Options', () => (
    <div className="wrapper container-fluid">
      <StepWithOptions
        description={stepData[0].value.options_description}
        options={stepData[0].value.options}
      />
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
