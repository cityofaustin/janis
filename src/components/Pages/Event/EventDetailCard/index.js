import React from 'react';
import { useIntl } from 'react-intl';
import moment from 'moment-timezone';
import { events as i18n, locations as i18n2 } from 'js/i18n/definitions';

import EventLocationDetail from 'components/Pages/Event/EventDetailCard/EventLocationDetail';
import EventDetailFees from 'components/Pages/Event/EventDetailCard/EventDetailFees';

import { formatTimeLang } from 'js/helpers/cleanData';

const EventTime = ({ startTime, endTime, noon }) => {
  if (startTime) {
    return (
      <div className="coa-EventDetailItem__time">
        {endTime
          ? `${formatTimeLang(startTime, noon)}–${formatTimeLang(endTime, noon)}`
          : formatTimeLang(startTime, noon)}
      </div>
    );
  }

  return null;
};

const EventDetailCard = ({
  date,
  startTime,
  endTime,
  location,
  eventIsFree,
  fees,
  registrationUrl,
}) => {
  const intl = useIntl();
  moment.locale(intl.locale);

  let momentDate = moment(date, 'YYYY-MM-DD').format('dddd • LL');
  // make sure to capatalize the first letter in the date
  momentDate = momentDate.charAt(0).toUpperCase() + momentDate.slice(1);
  const noon = intl.formatMessage(i18n.noon);

  return (
    <div className="coa-EventPage__EventDetailCard">
      <div className="coa-EventDetailItem">
        <i className="material-icons">event</i>
        <div className="coa-EventDetailItem__content">
          <div className="coa-EventDetailItem__date">{momentDate}</div>
          <EventTime startTime={startTime} endTime={endTime} noon={noon} />
        </div>
      </div>
      {location && location.locationType === 'city_location' ? (
        <EventLocationDetail
          name={location.cityLocation.title}
          street={location.cityLocation.physicalStreet}
          city={location.cityLocation.physicalCity}
          state={location.cityLocation.physicalState}
          zip={location.cityLocation.physicalZip}
          unit={location.cityLocation.physicalUnit}
          additionalDetails={location.additionalDetails}
        />
      ) : location && location.locationType === 'remote_location' ? (
        <EventLocationDetail
          name={location.remoteLocation.name}
          street={location.remoteLocation.street}
          city={location.remoteLocation.city}
          state={location.remoteLocation.state}
          zip={location.remoteLocation.zip}
          unit={location.remoteLocation.unit}
          additionalDetails={location.additionalDetails}
        />
      ) : null}
      <EventDetailFees
        eventIsFree={eventIsFree}
        fees={fees}
        registrationUrl={registrationUrl}
      />
      {location && location.locationType === 'city_location' ? (
        <a
          href={`/${intl.locale}/location/${location.cityLocation.slug}/`}
          className="coa-EventDetailItem__location-link"
        >
          <div className="coa-EventDetailItem__location-link-text">
            {intl.formatMessage(i18n2.locationInformation)}
          </div>
          <div className="coa-EventDetailItem__location-link-arrow">
            <i class="material-icons">arrow_forward</i>
          </div>
        </a>
      ) : (
        <div className="coa-EventDetailCard__location-linkless" />
      ) /* Noticed the URL is getting generated in the contact details logic I copied in, it'll be nice to clean up URLs */}
    </div>
  );
};

export default EventDetailCard;
