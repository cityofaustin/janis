import React from 'react';
import PropTypes from 'prop-types';
import ArrowRight from 'js/svg/ArrowRight';


const SectionHeader = ({ title, arrow }) => (
  <div>
    <h2 className="coa_SectionHeader">
      {title}
      {arrow && (
        <span className="coa_SectionHeader--arrow">
          <ArrowRight size={32}/>
        </span>
      )}
    </h2>
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default SectionHeader;
