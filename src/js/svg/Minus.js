import React from 'react';

const MinusSVG = ({ size, title }) => (
  <svg width={size} height={size} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg" aria-labelledby="title">
    <title id="title">{ title || 'Minus' }</title>
    <path d="M1600 736v192q0 40-28 68t-68 28h-1216q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h1216q40 0 68 28t28 68z"/>
  </svg>
)

export default MinusSVG;
