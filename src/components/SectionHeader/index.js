import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SectionHeader = ({ isSerif, hasHighlight, symbol, children }) => (
  <h2
    className={classNames('coa-SectionHeader', {
      'coa-SectionHeader--hasHighlight': hasHighlight,
      'coa-SectionHeader--isSerif': isSerif,
      'coa-SectionHeader--hasSymbol': !!symbol,
    })}
  >
    {!!symbol && <span className="coa-SectionHeader__symbol">{symbol}</span>}
    {children}
  </h2>
);

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  symbol: PropTypes.node,
  isSerif: PropTypes.bool,
  hasHighlight: PropTypes.bool,
};

export default SectionHeader;
