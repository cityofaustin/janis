import PropTypes from 'prop-types';

export const badgePropTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string,
  symbol: PropTypes.node,
  isActive: PropTypes.bool,
};

export const badgeGroupPropTypes = {
  badges: PropTypes.arrayOf(PropTypes.shape(badgePropTypes)).isRequired,
  activeIndex: PropTypes.number,
};
