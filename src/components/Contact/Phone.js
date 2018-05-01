import React from 'react';
import PhoneSVG from 'components/SVGs/Phone';
import PropTypes from 'prop-types';

const Phone = ({ phone }) => (
  <div className="coa-ContactItem coa-ContactPhone">
    <PhoneSVG />
    <div>
      <span>
        <a href={`tel:${phone.default}`}>{phone.default}</a>
      </span>
      <span>
        TDD/TTY: <a href={`tel:${phone.tty}`}>{phone.tty}</a>
      </span>
    </div>
  </div>
);

Phone.propTypes = {
  phone: PropTypes.shape({
    default: PropTypes.string.isRequired,
    tty: PropTypes.string.isRequired,
  }),
};

export default Phone;
