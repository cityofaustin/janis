import React from 'react';
import SVG from 'components/SVGs/Svg';

const ChevronDown = ({ title = 'Arrow Down', ...rest }) => (
  <SVG title={title} {...rest}>
    <path d="M1683 808l-742 741q-19 19-45 19t-45-19l-742-741q-19-19-19-45.5t19-45.5l166-165q19-19 45-19t45 19l531 531 531-531q19-19 45-19t45 19l166 165q19 19 19 45.5t-19 45.5z" />
  </SVG>
);

export default ChevronDown;
