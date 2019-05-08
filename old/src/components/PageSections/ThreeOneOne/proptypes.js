import PropTypes from 'prop-types';

export const threeoneonePropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
);
