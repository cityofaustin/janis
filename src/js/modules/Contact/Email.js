import React from 'react';
import EnvelopSVG from 'js/svg/EnvelopO';
import PropTypes from 'prop-types';

const Email = ({ email }) => (
  <div className="coa-ContactItem coa-ContactEmail">
    <EnvelopSVG size="20"/>
    <a href={`mailto:${email}`}>{email}</a>
  </div>
);

Email.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Email;
