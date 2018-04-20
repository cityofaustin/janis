import React from 'react';
import PropTypes from 'prop-types';

const SectionHeader = ({ isSerif, hasHighlight, children }) => (
  <h2 className={`coa-SectionHeader
    ${hasHighlight ? 'coa-SectionHeader--hasHighlight' : ''}
    ${isSerif ? 'coa-SectionHeader--isSerif' : ''} `
  }>
    {children}
  </h2>
);

SectionHeader.propTypes = {
  isSerif: PropTypes.bool,
  hasHighlight: PropTypes.bool,
};

export default SectionHeader;
