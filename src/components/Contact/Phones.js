import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { contact as i18n } from 'js/i18n/definitions';

import { phonePropTypes } from './proptypes';

import { parsePhoneNumberFromString } from 'libphonenumber-js';

const Phones = ({ phones, intl }) => {
  // If we don't have a phone object then don't render
  if (!phones) return null;
  return phones.edges.map(thisPhone => {
    let phone = thisPhone.node;
    if (phone.phoneDescription || phone.phoneNumber) {
      let phoneNumber = parsePhoneNumberFromString(phone.phoneNumber);
      return (
        <div className="coa-ContactPhone">
          <div>
            <div>
              {phone.phoneDescription && `${phone.phoneDescription}: `}
              <a href={`tel:${phoneNumber.formatNational()}`}>
                {phoneNumber.formatNational()}
              </a>
            </div>
          </div>
        </div>
      );
    }
  });
};

Phones.propTypes = {
  phone: phonePropTypes,
};

export default injectIntl(Phones);

/*

      <span>
        {intl.formatMessage(i18n.phoneTTD)}:{' '}
        <a href={`tel:${phone.tty}`}>{phone.tty}</a>
      </span>

*/
