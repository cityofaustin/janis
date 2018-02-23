import React from 'react';
import PropTypes from 'prop-types';

const SectionHeader = (props) => (
  <h2 className="coa_SectionHeader">
    {props.children}
  </h2>
);

SectionHeader.propTypes = {
  // : PropTypes.
};

export default SectionHeader;
