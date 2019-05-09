import PropTypes from 'prop-types';

export const addressPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
}).isRequired;

export const emailPropTypes = PropTypes.string.isRequired;

export const hoursPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    dayOfWeek: PropTypes.string.isRequired,
    dayOfWeekNumeric: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    startTime: PropTypes.number.isRequired,
  }),
).isRequired;

export const phonePropTypes = PropTypes.shape({
  default: PropTypes.string.isRequired,
  tty: PropTypes.string.isRequired,
}).isRequired;
