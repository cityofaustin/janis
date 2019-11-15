import PropTypes from 'prop-types';

export const tilePropTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  compact: PropTypes.bool,
};

export const tileGroupPropTypes = {
  tiles: PropTypes.arrayOf(PropTypes.shape(tilePropTypes)).isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
  compact: PropTypes.bool,
};
