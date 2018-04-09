import React from 'react';
import EnvelopSVG from 'js/svg/EnvelopO';
import PropTypes from 'prop-types';

const Email = ({ className, email }) => (
  <div className={`${className} coa-ContactEmail`}>
    <EnvelopSVG size="20"/>
    <a href={`mailto:${email}`}>{email}</a>
  </div>
);

Email.propTypes = {
  email: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Email;
