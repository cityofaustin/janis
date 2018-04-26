import React from 'react';
import EnvelopSVG from 'components/SVGs/EnvelopO';
import PropTypes from 'prop-types';

const Email = ({ email }) => (
  <div className="coa-ContactItem coa-ContactEmail">
    <EnvelopSVG />
    <a href={`mailto:${email}`}>{email}</a>
  </div>
);

Email.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Email;
