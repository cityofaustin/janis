import React from 'react';
//TODO: import correct svg
import EnvelopSVG from 'js/svg/EnvelopO';

const ContactEmail = ({ className, email }) => (
  <div className={`${className} coa-ContactEmail`}>
    <EnvelopSVG size="20"/>
    <a href={`mailto:${email}`}>{email}</a>
  </div>
);

export default ContactEmail;
