import React from 'react';
import PropTypes from 'prop-types';
import HtmlFromAdmin from 'components/HtmlFromAdmin';
import { stepBasicPropTypes } from './proptypes';

const StepBasic = ({ stepAsHtmlFromAdmin, singleStep }) =>
  singleStep ? (
    <p>
      <HtmlFromAdmin content={stepAsHtmlFromAdmin} />
    </p>
  ) : (
    <li>
      <p>
        <HtmlFromAdmin content={stepAsHtmlFromAdmin} />
      </p>
    </li>
  );

StepBasic.propTypes = stepBasicPropTypes;

export default StepBasic;
