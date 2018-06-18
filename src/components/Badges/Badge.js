import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BadgeSVG from 'components/SVGs/Badge';

import { badgePropTypes } from './proptypes';

const Badge = ({ title, symbol, isActive }) => (
  <div
    className={classNames('coa-Badge', {
      'coa-Badge--isActive': isActive,
    })}
  >
    <BadgeSVG className="coa-Badge__background" />
    {!!symbol && (
      <span className="coa-Badge__symbol">
        <span className="coa-sr-only">Step </span>
        {symbol}
      </span>
    )}
    <span className="coa-Badge__title">{title}</span>
  </div>
);

Badge.propTypes = badgePropTypes;

export default Badge;
