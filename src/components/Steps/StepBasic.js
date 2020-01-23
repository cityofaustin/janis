import React from 'react';
import PropTypes from 'prop-types';
import HtmlFromRichText from 'components/HtmlFromRichText';
import { stepBasicPropTypes } from './proptypes';

const StepBasic = ({ stepAsHtmlFromRichText, singleStep }) =>
  singleStep ? (
    <p>
      <HtmlFromRichText content={stepAsHtmlFromRichText} />
    </p>
  ) : (
    <li>
      <p>
        <HtmlFromRichText content={stepAsHtmlFromRichText} />
      </p>
    </li>
  );

StepBasic.propTypes = stepBasicPropTypes;

export default StepBasic;
