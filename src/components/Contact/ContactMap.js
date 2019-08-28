import React from 'react';
import PropTypes from 'prop-types';
import StaticMap from 'components/StaticMap';
import Address from 'components/Contact/Address';
import Hours from 'components/Contact/Hours';

import { addressPropTypes } from './proptypes';

const ContactMap = ({ location }) => (
  <div className="coa-ContactMap">
    <StaticMap location={location} />
    <Address location={location} />
  </div>
);

ContactMap.propTypes = {
  location: addressPropTypes,
};

export default ContactMap;
