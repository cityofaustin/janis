import PropTypes from 'prop-types';

export const badgePropTypes = {
  title: PropTypes.string.isRequired,
  step: PropTypes.number,
  isActive: PropTypes.bool,
};

export const badgeGroupPropTypes = {
  badges: PropTypes.arrayOf(PropTypes.shape(badgePropTypes)).isRequired,
};
