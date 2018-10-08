import React from 'react';
import PropTypes from 'prop-types';

import { optionPropTypes, stepWithOptionsPropTypes } from './proptypes';

const Option = ({ option_name, option_description }) => (
  <div>
    <span>{option_name}</span>
    <span dangerouslySetInnerHTML={{ __html: option_description }} />
  </div>
);

Option.propTypes = optionPropTypes;

const StepWithOptions = ({ description, options }) => (
  <div className="coa-StepWithOptions">
    <h1>{description}</h1>
    {options.map(({ ...rest }, index) => <Option key={index} {...rest} />)}
  </div>
);

StepWithOptions.propTypes = stepWithOptionsPropTypes;

export default StepWithOptions;
