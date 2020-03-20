import React from 'react';
import { useIntl } from 'react-intl';
import { getEncodedLocation } from 'js/helpers/location';
import { events as i18n } from 'js/i18n/definitions';

const EventLocationDetail = ({
  name,
  street,
  city,
  state,
  zip,
  unit,
  additionalDetails,
}) => {
  const intl = useIntl();

  // Just use these 4 to get the google maps links:
  // From conversation with desi:
  /*
        Brian Smith  12:30 PM
        right now for maps it only takes street/city/state/zip in for our links, are we cool staying
        there or should I make unit/floor/suite part of the search?

        Desi Gonzalez  12:31 PM
        I think that's cool, I wouldn't worry about it til we have evidence that that's a problem
  */
  const encodedLocation = getEncodedLocation({ street, city, state, zip });

  return (
    <div className="coa-EventDetailItem">
      <i className="material-icons">place</i>
      <div className="coa-EventDetailItem__content coa-EventDetailItem__location">
        <div className="coa-EventDetailItem__location-name">{name}</div>
        <div className="coa-EventDetailItem__location-address">
          {`${street}`}
          {!!unit && `, ${unit}`}
        </div>
        {!!additionalDetails && (
          <div className="coa-EventDetailItem__location-unit">
            {additionalDetails}
          </div>
        )}
        <a
          href={`//www.google.com/maps/search/?api=1&query=${encodedLocation}`}
          className="coa-EventDetailItem__location-directions-link"
          target="_blank"
        >
          {intl.formatMessage(i18n.getDirections)}
        </a>
      </div>
    </div>
  );
};

export default EventLocationDetail;
