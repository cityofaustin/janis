import React from 'react';
import PropTypes from 'prop-types';

import Badge from './Badge';

import { badgeGroupPropTypes } from './proptypes';

const BadgeGroup = ({ badges, activeIndex }) => (
  <div className="coa-BadgeGroup">
    {badges.map(({ ...rest }, index) => (
      <Badge
        key={index}
        {...rest}
        isActive={activeIndex === index ? true : false}
      />
    ))}
  </div>
);

BadgeGroup.propTypes = badgeGroupPropTypes;

export default BadgeGroup;
