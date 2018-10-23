import React from 'react';
import PropTypes from 'prop-types';
import { stepBasicPropTypes } from './proptypes';

const StepBasic = ({ stepAsHtmlFromAdmin }) => (
  <li>
    <p dangerouslySetInnerHTML={{ __html: stepAsHtmlFromAdmin }} />
  </li>
);

StepBasic.propTypes = stepBasicPropTypes;

export default StepBasic;
