import React from 'react';
import PropTypes from 'prop-types';

const SectionTitle = ({ title }) => (
  <h3 className="coa_SectionTitle">{title}</h3>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  noBorder: PropTypes.bool,
};

export default SectionTitle;
