import React from 'react'
import SVG from 'components/SVGs/Svg'

const ChevronRightBlue = ({ title = 'Arrow Right Blue', ...rest }) => (
  <SVG title={title} {...rest} width="24" height="24" viewBox="0 0 24 24">
    <path className="coa-CheveronRightBlue" fill="#0049C7" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </SVG>
)

export default ChevronRightBlue
