import React from 'react';
import PhoneSVG from 'js/svg/Phone';
import PropTypes from 'prop-types';

const Phone = ({ className, phone, ttyphone }) => (
  <div className={`${className} coa-ContactPhone`}>
    <PhoneSVG size="20"/>
    <div>
      <span><a href={`tel:${phone}`}>{phone}</a></span>
      <span>TDD/TTY: <a href={`tel:${ttyphone}`}>{ttyphone}</a></span>
    </div>
  </div>
);

Phone.propTypes = {
  phone: PropTypes.string.isRequired,
  className: PropTypes.string,
  ttyphone: PropTypes.string,
};

export default Phone;
