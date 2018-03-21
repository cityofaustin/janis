import React from 'react';
//TODO: import correct svg
import AirplaneSVG from 'js/svg/Airplane';

const ContactEmail = ({ className, email }) => (
  <div className={`${className} coa-ContactEmail`}>
    <AirplaneSVG size="20"/>
    <a href={`mailto:${email}`}>{email}</a>
  </div>
);

export default ContactEmail;
