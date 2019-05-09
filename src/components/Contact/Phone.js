import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { contact as i18n } from 'js/i18n/definitions';

import { phonePropTypes } from './proptypes';

const Phone = ({ phone, intl }) => (
  <div className="coa-ContactItem coa-ContactPhone">
    <i className="material-icons">contact_phone</i>
    <a href={`tel:${phone.default}`}>{phone.default}</a>
  </div>
);

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
