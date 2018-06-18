import PropTypes from 'prop-types';

export const badgePropTypes = {
  title: PropTypes.string.isRequired,
  symbol: PropTypes.node,
  isActive: PropTypes.bool,
};

export const badgeGroupPropTypes = {
  badges: PropTypes.arrayOf(PropTypes.shape(badgePropTypes)).isRequired,
};
