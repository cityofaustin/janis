import React from 'react';
import PropTypes from 'prop-types';

const percentComplete = (x, y) => x / y * 100;

const Progress = ({ x, y }) => (
  <div>
    <span className="coa-sr-only coa-sr-only-focusable" tabIndex="0">
      You are on step {x} of {y}.
    </span>
    <div className="Progress">
      <div
        className="Progress_bar"
        role="progressbar"
        style={{ width: `${percentComplete(x, y)}%` }}
        aria-valuenow={percentComplete(x, y)}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  </div>
);

Progress.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};

export default Progress;
