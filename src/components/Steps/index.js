import React from 'react';
import PropTypes from 'prop-types';

const Steps = ({ stepsAsHtmlFromAdmin }) => (
  <div className="coa-Steps">
    <div
      className="coa-Steps__list"
      dangerouslySetInnerHTML={{ __html: stepsAsHtmlFromAdmin }}
    />
  </div>
);

Steps.propTypes = {
  stepsAsHtmlFromAdmin: PropTypes.string.isRequired,
};

export default Steps;
