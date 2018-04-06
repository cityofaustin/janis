import React from 'react';
import PropTypes from 'prop-types';
import ArrowRight from 'js/svg/ArrowRight';


const SectionHeader = ({ isSerif, hasHighlight, hasArrow, children }) => (
  <h2 className={`coa_SectionHeader
    ${hasHighlight ? 'coa_SectionHeader--hasHighlight' : ''}
    ${isSerif ? 'coa_SectionHeader--isSerif' : ''} `
  }>
    {children}
    {hasArrow && (
      <span className="coa_SectionHeader__arrow">
        <ArrowRight size={32}/>
      </span>
    )}
  </h2>
);

SectionHeader.propTypes = {
  isSerif: PropTypes.bool,
  hasHighlight: PropTypes.bool,
  hasArrow: PropTypes.bool,
};

export default SectionHeader;
