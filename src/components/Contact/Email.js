import React from 'react';
import EnvelopSVG from 'components/SVGs/EnvelopO';
import PropTypes from 'prop-types';

import { emailPropTypes } from './proptypes';

const Email = ({ email }) => (
  <div className="coa-ContactItem coa-ContactEmail">
    <EnvelopSVG />
    <a href={`mailto:${email}`}>{email}</a>
  </div>
);

Email.propTypes = {
  email: emailPropTypes,
};

export default Email;
