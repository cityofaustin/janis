import React from 'react';
//TODO: import correct svg
import PhoneSVG from 'js/svg/Phone';

const ContactPhone = ({ className, phone, tddphone }) => (
  <div className={`${className} coa-ContactPhone`}>
    <PhoneSVG size="20"/>
    <div>
      <span><a href={`tel:${phone}`}>{phone}</a></span>
      <span>TDD/TTY: <a href={`tel:${tddphone}`}>{tddphone}</a></span>
    </div>
  </div>
);

export default ContactPhone;
