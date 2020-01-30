import React from 'react';
import { useRouteData, Head } from 'react-static';

import PageHeader from 'components/PageHeader';
// import LocationInfo from 'components/Pages/Location/LocationInfo';
// import LocationServiceList from 'components/Pages/Location/LocationServiceList';
// import LocationGettingHere from 'components/Pages/Location/LocationGettingHere';
import UserFeedback from 'components/UserFeedback';

import HtmlFromRichText from 'components/HtmlFromRichText';
import ContextualNav from 'components/PageSections/ContextualNav';
import ContactDetails from 'components/Contact/ContactDetails';

import { useIntl } from 'react-intl';

import moment from 'moment-timezone';

import { events as i18n, locations as i18n2 } from 'js/i18n/definitions';

import { getEncodedLocation } from 'js/helpers/location';

const EventDate = ({ date, canceled }) => {
  const intl = useIntl();
  moment.locale(intl.locale);

  let momentDate = moment(date, 'YYYY-MM-DD').format('dddd • LL');
  // make sure to capatalize the first letter in the date
  momentDate = momentDate.charAt(0).toUpperCase() + momentDate.slice(1);

  return (
    <div className="coa-EventPage__date-header">
      {canceled && (
        <div className="coa-EventPage__cancelled-badge">
          {intl.formatMessage(i18n.canceled)}
        </div>
      )}
      <div className="coa-EventPage__date">{momentDate}</div>
    </div>
  );
};

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
        >
          {intl.formatMessage(i18n.getDirections)}
        </a>
      </div>
    </div>
  );
};

const EventDetailFees = ({ eventIsFree, fees, registrationUrl }) => {
  const intl = useIntl();

  const registrationLinkFragment = (
    <React.Fragment>
      {registrationUrl ? (
        <a href={registrationUrl}>{intl.formatMessage(i18n.register)}</a>
      ) : (
        intl.formatMessage(i18n.public)
      )}
    </React.Fragment>
  );

  return (
    <div className="coa-EventDetailItem">
      <i className="material-icons">local_play</i>
      <div className="coa-EventDetailItem__content">
        {eventIsFree ? (
          <div className="coa-EventDetailItem__fees-free">
            <div>{`${intl.formatMessage(i18n.free)}`}</div>
            <div>{registrationLinkFragment}</div>
          </div>
        ) : (
          !!fees &&
          !!fees.edges &&
          !!fees.edges.length && (
            <React.Fragment>
              {fees.edges.map(edge => (
                <div>
                  {!!edge.node.feeLabel && `${edge.node.feeLabel}: `}
                  {edge.node.fee === 0
                    ? intl.formatMessage(i18n.free)
                    : `$${edge.node.fee}`}
                </div>
              ))}
              <div>{registrationLinkFragment}</div>
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
};

const EventTime = ({ startTime, endTime }) => {
  if (startTime) {
    return (
      <div className="coa-EventDetailItem__time">
        {startTime && endTime
          ? `${moment(startTime, 'HH:mm:ss').format('LT')}—${moment(
              endTime,
              'HH:mm:ss',
            ).format('LT')}`
          : moment(startTime, 'HH:mm:ss').format('LT')}
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

  debugger;

  return (
    <div className="coa-EventPage__EventDetailCard">
      <div className="coa-EventDetailItem">
        <i className="material-icons">event</i>
        <div className="coa-EventDetailItem__content">
          <div className="coa-EventDetailItem__date">
            {moment(date, 'YYYY-MM-DD').format('dddd • LL')}
          </div>
          <EventTime startTime={startTime} endTime={endTime} />
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

const EventPage = ({ eventPage }) => {
  const intl = useIntl();

  const blarg = eventPage ? { eventPage } : useRouteData();

  const {
    eventPage: {
      title,
      description,
      date,
      offeredBy,
      canceled,
      contact,
      startTime,
      endTime,
      locations,
      eventIsFree,
      registrationUrl,
      fees,
    },
  } = blarg;

  // until we have support for multiple locations, we're taking the first one
  const location = locations[0];

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <ContextualNav
        parent={{ title: intl.formatMessage(i18n.allEvents), url: '/events/' }}
        relatedTo={[]}
        offeredBy={offeredBy}
      />
      <div className="wrapper container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-10">
            <EventDate date={date} canceled={canceled} />
            <div className="coa-EventPage__header">
              <h1 className="coa-EventPage__header-title">{title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="coa-Page__all-of-the-content">
        <div className="coa-Page__main-content">
          <div className="wrapper container-fluid">
            <div className="row">
              <div className="col-xs-12 col-md-10" />
            </div>
          </div>
          <EventDetailCard
            date={date}
            startTime={startTime}
            endTime={endTime}
            location={location}
            eventIsFree={eventIsFree}
            fees={fees}
            registrationUrl={registrationUrl}
          />
          <div className="wrapper container-fluid">
            <div className="row">
              <div className="col-xs-12 col-md-10">
                <h3>{intl.formatMessage(i18n.details)}</h3>
                {description && (
                  <HtmlFromRichText title={' '} content={description} />
                )}
              </div>
            </div>
          </div>
          <div className="coa-Page__contacts-mobile">
            <div className="col-xs-12 col-md-10">
              {!!contact && <ContactDetails contacts={[contact]} />}
            </div>
          </div>
        </div>
        <div className="coa-Page__side-content">
          <div className="coa-EventsPage__contacts-desktop">
            {!!contact && <ContactDetails contacts={[contact]} />}
          </div>
        </div>
      </div>
      {/* not sure if we want this in <UserFeedback /> */}
    </div>
  );
};

export default EventPage;
