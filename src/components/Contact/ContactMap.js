import React from 'react';
import PropTypes from 'prop-types';
import StaticMap from 'components/StaticMap';
import Address from 'components/Contact/Address';
import Phone from 'components/Contact/Phone';
import Hours from 'components/Contact/Hours';

import { addressPropTypes, hoursPropTypes, phonePropTypes } from './proptypes';

const ContactMap = ({ contact: { phone, hours, location } }) => (
  <div className="coa-ContactMap">
    <StaticMap location={location} />

    <Address location={location} />

    {phone && <Phone phone={phone} />}

    {hours && <Hours hours={hours} />}
  </div>
);

ContactMap.propTypes = {
  contact: PropTypes.shape({
    location: addressPropTypes,
    hours: hoursPropTypes,
    phone: phonePropTypes,
  }).isRequired,
};

export default ContactMap;
