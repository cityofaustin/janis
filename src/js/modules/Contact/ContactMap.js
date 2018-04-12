import React from 'react';
import PropTypes from 'prop-types';
import StaticMap from 'js/modules/StaticMap';
import Address from 'js/modules/Contact/Address';
import Phone from 'js/modules/Contact/Phone';
import Hours from 'js/modules/Contact/Hours';

const ContactMap = ({ contact:{name, phone, hours, location} }) => (

  <div className="coa-ContactMap">
    <StaticMap location={location} title={name} />

    <Address
      name={name}
      location={location}
    />

    {phone && (
      <Phone
        phone={phone.default}
        ttyphone={phone.tty}
      />
    )}

    {hours && (
      <Hours hours={hours} />
    )}
  </div>
);

ContactMap.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    hours: PropTypes.array,
    phone: PropTypes.object,
  }).isRequired,
};

export default ContactMap;
