import React from 'react';
import PropTypes from 'prop-types';

const SVG = ({ viewBox="0 0 1792 1792", title, children, ...rest }) => (
  <svg
    {...rest}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="title"
  >
    <title id="title">{title}</title>
    {children}
  </svg>
);

SVG.propTypes = {
  viewBox: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default SVG;
