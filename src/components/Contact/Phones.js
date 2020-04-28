import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { contact as i18n } from 'js/i18n/definitions';
import { phonePropTypes } from './proptypes';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const Phone = ({ phone }) => {
  if (phone.phoneNumber) {
    const phoneNumber = parsePhoneNumberFromString(phone.phoneNumber);

    return (
      <div className="coa-ContactPhone">
        {!!phone.phoneDescription && `${phone.phoneDescription}: `}
        <a href={`tel:${phoneNumber.formatNational()}`}>
          {phoneNumber.formatNational()}
        </a>
      </div>
    );
  }
};

const PhonesList = ({ phoneNumbers, intl }) => {
  if (!phoneNumbers) return null;

  return (
    <div className="coa-ContactItem coa-ContactPhoneList">
      <i className="material-icons">contact_phone</i>
      <div className="coa-ContactItem_content">
        {phoneNumbers.edges.map((phone, index) => (
          <Phone key={index} phone={phone.node} />
        ))}
      </div>
    </div>
  );
};

export default injectIntl(PhonesList);
