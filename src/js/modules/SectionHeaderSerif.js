import React from 'react';
import PropTypes from 'prop-types';

const SectionHeaderSerif = ({ title }) => (
  <h2 className="coa-SectionHeaderSerif">
    {title}
  </h2>
);

SectionHeaderSerif.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionHeaderSerif;
