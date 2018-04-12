import React from 'react';
import PropTypes from 'prop-types';
import StaticMap from 'js/modules/StaticMap';
import Address from 'js/modules/Contact/Address';
import Phone from 'js/modules/Contact/Phone';
import Hours from 'js/modules/Contact/Hours';

const ContactMap = ({ contact:{phone, hours, location} }) => (

  <div className="coa-ContactMap">
    <StaticMap location={location} />

    <Address
      location={location}
    />

    {phone && (
      <Phone
        phone={phone}
      />
    )}

    {hours && (
      <Hours hours={hours} />
    )}
  </div>
);

ContactMap.propTypes = {
  contact: PropTypes.shape({
    location: PropTypes.Address,
    hours: PropTypes.Hours,
    phone: PropTypes.Phone,
  }).isRequired,
};

export default ContactMap;
