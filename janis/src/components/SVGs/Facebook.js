import React from 'react';
import SVG from 'components/SVGs/Svg';

const FacebookSVG = ({ title = 'Facebook', ...rest }) => (
  <SVG title={title} {...rest}>
    <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z" />
  </SVG>
);

export default FacebookSVG;
