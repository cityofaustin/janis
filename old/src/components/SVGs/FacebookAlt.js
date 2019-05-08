import React from 'react';
import SVG from 'components/SVGs/Svg';

const FacebookAltSVG = ({ title = 'Facebook', ...rest }) => (
  <SVG title={title} {...rest}>
    <path d="M967.48 0h-911A56.51 56.51 0 0 0 0 56.52v911A56.51 56.51 0 0 0 56.52 1024H547V628H414V473h133V358.93c0-132.26 80.77-204.28 198.76-204.28 56.51 0 105.08 4.21 119.24 6.09V299h-81.37c-64.2 0-76.63 30.51-76.63 75.28V473h153.49l-20 155H707v396h260.48a56.51 56.51 0 0 0 56.52-56.52v-911A56.51 56.51 0 0 0 967.48 0z" />
    <path
      d="M707 1024V628h133.5l20-155H707v-98.72c0-44.77 12.43-75.28 76.63-75.28H865V160.74c-14.16-1.88-62.73-6.09-119.24-6.09-118 0-198.76 72-198.76 204.28V473H414v155h133v396z"
      style={{ fill: 'none' }}
    />
  </SVG>
);

export default FacebookAltSVG;
