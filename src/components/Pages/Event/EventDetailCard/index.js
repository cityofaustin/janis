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

const EventLocationVirtual = ({eventLink, additionalInformation}) => {
  const intl = useIntl();
  return (
    <div className="coa-EventDetailVirtual">
      <i className="material-icons">devices</i> 
      <div className="coa-EventDetailVirtual__content">
        {intl.formatMessage(i18n.virtualEvent)}
        <div>
          <a href={eventLink}>
            {eventLink}
          </a>
        </div>
        {!!additionalInformation &&
          <div className="coa-EventDetailVirtual__content-code">
            {`${intl.formatMessage(i18n.meetingCode)}: ${additionalInformation}`}
          </div>}
      </div>
    </div>
  )
}

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
      {location && location.locationType === 'city_of_Austin_location' ? (
        <EventLocationDetail
          name={location.cityOfAustinLocation.title}
          street={location.cityOfAustinLocation.physicalStreet}
          city={location.cityOfAustinLocation.physicalCity}
          state={location.cityOfAustinLocation.physicalState}
          zip={location.cityOfAustinLocation.physicalZip}
          unit={location.cityOfAustinLocation.physicalUnit}
          additionalDetails={location.additionalDetails}
        />
      ) : location && location.locationType === 'remote_non_Coa_location' ? (
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
      {location && (location.locationType === 'virtual_event' || location.virtualEvent) ? 
        <EventLocationVirtual 
          eventLink = {location.virtualEvent.eventLink}
          additionalInformation = {location.virtualEvent.additionalInformation}
        />
        : null}
      <EventDetailFees
        eventIsFree={eventIsFree}
        fees={fees}
        registrationUrl={registrationUrl}
        virtualLink={location.virtualEvent && location.virtualEvent.eventLink}
      />
      {location && location.locationType === 'city_of_Austin_location' ? (
        <a
          href={`/${intl.locale}/location/${location.cityOfAustinLocation.slug}/`}
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
