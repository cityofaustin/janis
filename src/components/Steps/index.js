import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import StepBasic from './StepBasic';
import StepWithOptions from './StepWithOptions';
import StepWithLocations from './StepWithLocations';
import { stepsPropTypes } from './proptypes';

const mapSteps = (steps, singleStep) =>
  // singleStep boolean param to determine whether to render steps in a list (ul) or a single item for StepWithOptions and StepBasic
  steps.map((step, index) => {
    if (step.type === 'step_with_options_accordian')
      return (
        <StepWithOptions
          key={index}
          description={step.value.options_description}
          options={step.value.options}
          singleStep={singleStep}
        />
      );

    if (step.type === 'basic_step')
      return (
        <StepBasic
          key={index}
          stepAsHtmlFromRichText={step.value}
          singleStep={singleStep}
        />
      );

    if (step.type === 'step_with_locations')
      return (
        <StepWithLocations
          key={index}
          description={step.value.locations_description}
          singleStep={singleStep}
          locations={step.value.locations}
        />
      );
  });

const Steps = ({ steps }) => (
  <div className="coa-Steps">
    {steps.length === 1 ? (
      <Fragment>{mapSteps(steps, true)}</Fragment>
    ) : (
      <div className="coa-Steps__list">
        <ol>{mapSteps(steps)}</ol>
      </div>
    )}
  </div>
);

Steps.propTypes = stepsPropTypes;

export default Steps;
