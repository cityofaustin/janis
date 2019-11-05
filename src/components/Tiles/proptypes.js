import PropTypes from 'prop-types';

export const tilePropTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  tag: PropTypes.string,
};

export const tileGroupPropTypes = {
  tiles: PropTypes.arrayOf(PropTypes.shape(tilePropTypes)).isRequired,
  tag: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
  hasBorder: PropTypes.bool,
};
