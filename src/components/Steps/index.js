import React from 'react';
import PropTypes from 'prop-types';

import StepBasic from './StepBasic';
import StepWithOptions from './StepWithOptions';
import { stepsPropTypes } from './proptypes';

const Steps = ({ steps }) => (
  <div className="coa-Steps">
    <div className="coa-Steps__list">
      <ul>
        {steps.map(step => {
          if (step.type === 'step_with_options_accordian')
            return (
              <StepWithOptions
                description={step.value.options_description}
                options={step.value.options}
              />
            );

          if (step.type === 'basic_step')
            return <StepBasic stepAsHtmlFromAdmin={step.value} />;
        })}
      </ul>
    </div>
  </div>
);

Steps.propTypes = stepsPropTypes;

export default Steps;
