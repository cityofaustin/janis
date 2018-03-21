import React from 'react';
//TODO: import correct svg
import AirplaneSVG from 'js/svg/Airplane';

const ContactAddress = ({ className, name, location }) => (
  <div className={`${className} coa-ContactAddress`}>
    <AirplaneSVG size="20"/>
    <div>
      <span>{name}</span>
      <span>{location.street}</span>
      <span>{location.city}, {location.state} {location.zip}</span>
      <span>{location.country}</span>
    </div>
  </div>
);

export default ContactAddress;
