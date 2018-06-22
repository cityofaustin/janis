import React from 'react';
import PropTypes from 'prop-types';

import Badge from './Badge';

import { badgeGroupPropTypes } from './proptypes';

const BadgeGroup = ({ badges }) => (
  <div className="coa-BadgeGroup">
    {badges.map(({ ...rest }, index) => <Badge key={index} {...rest} />)}
  </div>
);

BadgeGroup.propTypes = badgeGroupPropTypes;

export default BadgeGroup;
