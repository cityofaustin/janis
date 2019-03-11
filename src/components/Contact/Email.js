import React from 'react';
import PropTypes from 'prop-types';

import { emailPropTypes } from './proptypes';

const Email = ({ email }) => (
  <div className="coa-ContactItem coa-ContactEmail">
    <i className="material-icons">mail_outline</i>
    <a href={`mailto:${email}`}>{email}</a>
  </div>
);

Email.propTypes = {
  email: emailPropTypes,
};

export default Email;
