import React from 'react'
import SVG from 'components/SVGs/Svg'

const ChevronLeftBlue = ({ title = 'Arrow Left Blue', ...rest }) => (
  <SVG title={title} {...rest} width="24" height="24" viewBox="0 0 24 24">
    <path className="coa-CheveronLeftBlue" fill="#0049C7" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </SVG>
)

export default ChevronLeftBlue
