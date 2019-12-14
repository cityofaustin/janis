import React from 'react';
import PropTypes from 'prop-types';
import HtmlFromAdmin from 'components/HtmlFromAdmin';

const StepWithLocations = ({ description, locations, singleStep }) =>
  singleStep ? (
    <p>
      <HtmlFromAdmin content={description} />
    </p>
  ) : (
    <li>
      <p>
        <HtmlFromAdmin content={description} />
      </p>
    </li>
  );

export default StepWithLocations;
