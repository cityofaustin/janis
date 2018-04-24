import React from 'react';
import PropTypes from 'prop-types';
import StaticMap from 'js/modules/StaticMap';
import Address from 'components/Contact/Address';
import Phone from 'components/Contact/Phone';
import Hours from 'components/Contact/Hours';

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
  contact: PropTypes.shape(Object.assign({},
    Address.propTypes,
    Phone.propTypes,
    Hours.propTypes,
  )).isRequired,
};

export default ContactMap;
