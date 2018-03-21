import React from 'react';
import PropTypes from 'prop-types';

const SectionHeader = ({ title }) => (
  <h2 className="coa_SectionHeader">{title}</h2>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default SectionHeader;
