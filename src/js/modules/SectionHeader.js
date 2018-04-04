import React from 'react';
import PropTypes from 'prop-types';
import ArrowRight from 'js/svg/ArrowRight';


const SectionHeader = ({ title, hasArrow }) => (
  <div>
    <h2 className="coa_SectionHeader">
      {title}
      {hasArrow && (
        <span className="coa_SectionHeader__arrow">
          <ArrowRight size={32}/>
        </span>
      )}
    </h2>
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  hasArrow: PropTypes.bool
};

export default SectionHeader;
