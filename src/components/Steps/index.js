import React from 'react';
import PropTypes from 'prop-types';

const Step = ({ stepAsHtmlFromAdmin }) => (
  <li>
    <p dangerouslySetInnerHTML={{ __html: stepAsHtmlFromAdmin }} />
  </li>
);

const Steps = ({ steps }) => (
  <div className="coa-Steps">
    <div className="coa-Steps__list">
      <ul>
        {steps.map(step => <Step stepAsHtmlFromAdmin={step.stepDescription} />)}
      </ul>
    </div>
  </div>
);

Steps.propTypes = {
  steps: PropTypes.object.isRequired,
};

export default Steps;
