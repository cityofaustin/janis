import React from 'react';
import SVG from 'components/SVGs/Svg';

const ChevronRight = ({ title = 'Arrow Right', ...rest }) => (
  <SVG title={title} {...rest}>
    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
  </SVG>
);

export default ChevronRight;
