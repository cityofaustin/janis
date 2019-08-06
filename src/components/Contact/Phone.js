import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { contact as i18n } from 'js/i18n/definitions';

import { phonePropTypes } from './proptypes';

const Phone = ({ phone, intl }) => {
  // If we don't have a phone object then don't render
  if (!phone) return null;

  // If we have a default phone number just put it there without
  // any descriptive text
  if (phone.default) {
    return (
      <div className="coa-ContactItem coa-ContactPhone">
        <i className="material-icons">contact_phone</i>
        <a href={`tel:${phone.default}`}>{phone.default}</a>
      </div>
    );
  }

  // Render the phone numbers with the descriptive text
  return (
    <div className="coa-ContactItem coa-ContactPhone">
      <i className="material-icons">contact_phone</i>
      <div>
        {Object.entries(phone).map(([key, value]) => (
          <div>
            {key}: <a href={`tel:${value}`}>{value}</a>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
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
