import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { stepBasicPropTypes } from './proptypes';

const StepBasic = ({ stepAsHtmlFromAdmin }) => (
  <li>
    <p>{Parser(stepAsHtmlFromAdmin)}</p>
  </li>
);

StepBasic.propTypes = stepBasicPropTypes;

export default StepBasic;
