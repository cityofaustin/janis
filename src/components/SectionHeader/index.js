import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SectionHeader = ({ isSerif, hasHighlight, children }) => (
  <h2
    className={classNames('coa-SectionHeader', {
      'coa-SectionHeader--hasHighlight': hasHighlight,
      'coa-SectionHeader--isSerif': isSerif,
    })}
  >
    {children}
  </h2>
);

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  isSerif: PropTypes.bool,
  hasHighlight: PropTypes.bool,
};

export default SectionHeader;
