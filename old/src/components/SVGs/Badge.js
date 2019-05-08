import React from 'react';
import SVG from 'components/SVGs/Svg';

const BadgeSVG = ({ title = 'Badge', ...rest }) => (
  <SVG
    preserveAspectRatio="none"
    viewBox="0 0 180 165"
    title={title}
    {...rest}
  >
    <path d="M3,112.27579 L90,161.552213 L177,112.27579 L177,3 L3,3 L3,112.27579 Z"></path>
    <polygon points="90 147 70 135 110 135"></polygon>
  </SVG>
);

export default BadgeSVG;
