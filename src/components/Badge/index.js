import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BadgeSVG from 'components/SVGs/Badge';

const Badge = ({ title, step, isActive }) => (
  <div className={classNames('coa-Badge', {
      'coa-Badge--isActive': isActive
    })}
  >
    <BadgeSVG className="coa-Badge__background"/>
    { !!step && <span className="coa-Badge__step"><span className="coa-sr-only">Step </span>{step}</span> }
    <span className="coa-Badge__title">{title}</span>
  </div>
)

Badge.propTypes = {
  title: PropTypes.string.isRequired,
  step: PropTypes.number,
  isActive: PropTypes.bool,
};

export default Badge;
