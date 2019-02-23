import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { contact as i18n } from 'js/i18n/definitions';

import PhoneSVG from 'components/SVGs/Phone';

import { phonePropTypes } from './proptypes';

const Phone = ({ phone, intl }) => (
  <div className="coa-ContactItem coa-ContactPhone">
    <PhoneSVG />
    <div>
      <span>
        <a href={`tel:${phone.default}`}>{phone.default}</a>
      </span>
    </div>
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