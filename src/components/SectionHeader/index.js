import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SectionHeader = ({ isSerif, hasHighlight, hasSymbol, children }) => (
  <h2
    className={classNames('coa-SectionHeader', {
      'coa-SectionHeader--hasHighlight': hasHighlight,
      'coa-SectionHeader--isSerif': isSerif,
      'coa-SectionHeader--hasSymbol': !!hasSymbol,
    })}
  >
    { !!hasSymbol &&
      <span className="coa-SectionHeader__symbol"><span className="coa-sr-only">Step </span>{hasSymbol}</span>
    }
    {children}
  </h2>
);

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  hasSymbol: PropTypes.node,
  isSerif: PropTypes.bool,
  hasHighlight: PropTypes.bool,
};

export default SectionHeader;
