import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { contact as i18n } from 'js/i18n/definitions';

import { phonePropTypes } from './proptypes';

import { parsePhoneNumberFromString } from 'libphonenumber-js'

const Phone = ({ phone, intl }) => {
  // If we don't have a phone object then don't render
  if (!phone) return null;

  // Render the phone numbers with the descriptive text
  else if (phone.phoneDescription && phone.phoneNumber) {
    let phoneNumber = parsePhoneNumberFromString(phone.phoneNumber)
    return (
      <div className="coa-ContactItem coa-ContactPhone">
        <i className="material-icons">contact_phone</i>
        <div>
          <div>
            {`${phone.phoneDescription}: `}
            <a href={`tel:${phoneNumber.formatNational()}`}>{phoneNumber.formatNational()}</a>
          </div>
        </div>
      </div>
    );
  }
};

Phone.propTypes = {
  phone: phonePropTypes,
};

export default injectIntl(Phone);

/*

      <span>
        {intl.formatMessage(i18n.phoneTTD)}:{' '}
        <a href={`tel:${phone.tty}`}>{phone.tty}</a>
      </span>

*/
