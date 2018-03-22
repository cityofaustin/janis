import React from 'react';
//TODO: import correct svg
import PhoneSVG from 'js/svg/Phone';

const ContactPhone = ({ className, phone, ttyphone }) => (
  <div className={`${className} coa-ContactPhone`}>
    <PhoneSVG size="20"/>
    <div>
      <span><a href={`tel:${phone}`}>{phone}</a></span>
      <span>TDD/TTY: <a href={`tel:${ttyphone}`}>{ttyphone}</a></span>
    </div>
  </div>
);

export default ContactPhone;
