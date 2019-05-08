import PropTypes from 'prop-types';

export const topicPropTypes = PropTypes.shape({
  services: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

export const themePropTypes = PropTypes.shape({
  topics: PropTypes.arrayOf(topicPropTypes).isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});
