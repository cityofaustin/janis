import React from 'react';
import SVG from 'components/SVGs/Svg';

const CaretDown = ({ title = 'Arrow Down', ...rest }) => (
  <SVG title={title} {...rest}>
    <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z" />
  </SVG>
);

export default CaretDown;
