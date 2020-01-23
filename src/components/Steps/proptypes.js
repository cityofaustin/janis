import PropTypes from 'prop-types';

export const stepsPropTypes = {
  steps: PropTypes.array.isRequired,
};

export const stepBasicPropTypes = {
  stepAsHtmlFromRichText: PropTypes.string.isRequired,
  singleStep: PropTypes.bool,
};

export const stepWithOptionsPropTypes = {
  options: PropTypes.arrayOf(PropTypes.shape(optionPropTypes)).isRequired,
  description: PropTypes.string.isRequired,
  singleStep: PropTypes.bool,
};

export const optionPropTypes = {
  option_name: PropTypes.string.isRequired,
  option_description: PropTypes.string.isRequired,
};

export const stepDetailGroupPropTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape(stepDetailPropTypes)).isRequired,
  stepClassName: PropTypes.string,
};

export const stepDetailPropTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  content: PropTypes.string.isRequired,
};
