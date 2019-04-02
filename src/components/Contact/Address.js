import React from 'react';
import PropTypes from 'prop-types';

import { addressPropTypes } from './proptypes';

const Address = ({ location }) => (
  <div className="coa-ContactItem coa-ContactAddress">
    <i className="material-icons">place</i>
    <div>
      <span>{location.name}</span>
      <span>{location.street}</span>
      <span>
        {location.city}, {location.state} {location.zip}
      </span>
    </div>
  </div>
);

Address.propTypes = {
  location: addressPropTypes,
};

export default Address;
