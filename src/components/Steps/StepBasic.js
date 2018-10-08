import React from 'react';
import PropTypes from 'prop-types';
import { optionPropTypes, stepWithOptionsPropTypes } from './proptypes';

const StepBasic = ({ stepAsHtmlFromAdmin }) => (
  <li>
    <p dangerouslySetInnerHTML={{ __html: stepAsHtmlFromAdmin }} />
  </li>
);

export default StepBasic;
