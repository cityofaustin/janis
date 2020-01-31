import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { contact as i18n1, navigation as i18n2 } from 'js/i18n/definitions';

import { getEncodedLocation } from 'js/helpers/location';

const StaticMap = ({ location, intl }) => {
  if (!location) return null;

  const encodedLocation = getEncodedLocation(location);

  return (
    <div className="coa-StaticMap">
      <a
        // https://developers.google.com/maps/documentation/urls/guide#forming-the-url
        href={`//www.google.com/maps/search/?api=1&query=${encodedLocation}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={intl.formatMessage(i18n2.openInNewWindow)}
      >
        <img
          src={`//maps.googleapis.com/maps/api/staticmap?markers=${encodedLocation}&zoom=15&size=680x400&scale=1&maptype=roadmap&key=AIzaSyBqtg0ntvqWGSHOznB4kq3DiYSyyVNKzIs&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0xf0eef0&style=feature:landscape.man_made%7Celement:geometry.fill%7Ccolor:0xf0eef0&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi.business%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:geometry.fill%7Ccolor:0x7f7189&style=feature:road.arterial%7Celement:geometry.stroke%7Ccolor:0x7f7189&style=feature:road.arterial%7Celement:labels.icon%7Ccolor:0x3e3b6c&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x5e494a&style=feature:road.arterial%7Celement:labels.text.stroke%7Ccolor:0xffffff&style=feature:road.highway%7Celement:geometry.fill%7Ccolor:0xe89f9a&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0xd6613c&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x190f2c&style=feature:road.highway%7Celement:labels.text.stroke%7Ccolor:0xf6f2fd&style=feature:road.local%7Celement:geometry.fill%7Ccolor:0xb8b1bd&style=feature:road.local%7Celement:geometry.stroke%7Ccolor:0xb8b1bd&style=feature:road.local%7Celement:labels.text%7Ccolor:0xffffff&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x5e494a&style=feature:road.local%7Celement:labels.text.stroke%7Ccolor:0xffffff&style=feature:transit%7Cvisibility:off`}
          alt={location.name || intl.formatMessage(i18n1.map)}
        />
      </a>
    </div>
  );
};

StaticMap.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
};

export default injectIntl(StaticMap);
