import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SectionHeader = ({
  isSerif,
  hasHighlight,
  description,
  symbol,
  children,
}) => (
  <h2
    className={classNames('coa-SectionHeader', {
      'coa-SectionHeader--hasHighlight': hasHighlight,
      'coa-SectionHeader--isSerif': isSerif,
      'coa-SectionHeader--hasSymbol': !!symbol,
    })}
  >
    {!!symbol && <span className="coa-SectionHeader__symbol">{symbol}</span>}
    {children}
    {!!description && (
      <p className="coa-SectionHeader__description">{description}</p>
    )}
  </h2>
);

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  symbol: PropTypes.node,
  description: PropTypes.string,
  isSerif: PropTypes.bool,
  hasHighlight: PropTypes.bool,
};

export default SectionHeader;
