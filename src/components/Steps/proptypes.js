import PropTypes from 'prop-types';

export const stepDetailGroupPropTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape(stepDetailPropTypes)).isRequired,
};

export const stepDetailPropTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  content: PropTypes.string.isRequired,
};
