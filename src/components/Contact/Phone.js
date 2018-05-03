import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { contact } from 'js/i18n/definitions';

import PhoneSVG from 'components/SVGs/Phone';

const Phone = ({ phone, intl }) => (
  <div className="coa-ContactItem coa-ContactPhone">
    <PhoneSVG />
    <div>
      <span>
        <a href={`tel:${phone.default}`}>{phone.default}</a>
      </span>
      <span>
        {intl.formatMessage(contact.phone_ttdtty)}: <a href={`tel:${phone.tty}`}>{phone.tty}</a>
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

export default injectIntl(Phone);
