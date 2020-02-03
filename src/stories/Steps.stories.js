import React from 'react';

import Steps from 'components/Steps';
import StepWithOptions from 'components/Steps/StepWithOptions';
import StepBasic from 'components/Steps/StepBasic';
import StepDetail from 'components/Steps/StepDetail';
import StepDetailGroup from 'components/Steps/StepDetailGroup';

import { stepData, stepDetailGroupData } from 'stories/static_data/stepData';

export default {
  title: 'Steps',
};

export const stepsStory = () => (
  <div className="wrapper container-fluid">
    <Steps steps={stepData} />
  </div>
);

stepsStory.story = {
  name: 'Steps',
};

export const stepBasic = () => (
  <div className="wrapper container-fluid">
    <StepBasic stepAsHtmlFromRichText={stepData[1].value} />
  </div>
);

export const stepWithOptions = () => (
  <div className="wrapper container-fluid">
    <StepWithOptions
      description={stepData[0].value.options_description}
      options={stepData[0].value.options}
    />
  </div>
);

export const stepDetail = () => (
  <div className="wrapper container-fluid">
    <StepDetail {...stepDetailGroupData[0]} />
  </div>
);

export const stepDetailGroup = () => (
  <StepDetailGroup steps={stepDetailGroupData} stepClassName="wrapper--sm" />
);
