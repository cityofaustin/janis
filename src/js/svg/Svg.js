import React from 'react';

const SVG = ({ title, children, ...rest }) => (
  <svg {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg" aria-labelledby="title">
    <title id="title">{title}</title>
    {children}
  </svg>
);

export default SVG;
