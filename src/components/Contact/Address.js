import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { getEncodedLocation } from 'js/helpers/location';
import { misc as i18n } from 'js/i18n/definitions';

import { addressPropTypes } from './proptypes';

const Address = ({ location }) => {
  const intl = useIntl();
  const encodedLocation = getEncodedLocation(location);

  return (
    <div className="coa-ContactItem coa-ContactAddress">
      <i className="material-icons">place</i>
      <div>
        <span className="coa-ContactAddressTitle">{location.title}</span>
        <span>{location.street}</span>
        <span>
          {location.city}, {location.state} {location.zip}
        </span>
        <a
          href={`//www.google.com/maps/search/?api=1&query=${encodedLocation}`}
          target="_blank"
        >
          {intl.formatMessage(i18n.getDirections)}
        </a>
      </div>
    </div>
  )
};

Address.propTypes = {
  location: addressPropTypes,
};

export default Address;
