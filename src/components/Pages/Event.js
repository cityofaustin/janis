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

import { events as i18n } from 'js/i18n/definitions';

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

const EventLocationDetail = ({ name, street, city, state, zip, unit }) => {
  const intl = useIntl();

  return (
    <div className="coa-EventDetailItem">
      <i className="material-icons">place</i>
      <div className="coa-EventDetailItem__content coa-EventDetailItem__location">
        <div className="coa-EventDetailItem__location-name">{name}</div>
        <div className="coa-EventDetailItem__location-address">{`${street}, ${city}, ${state} ${zip}`}</div>
        {!!unit && (
          <div className="coa-EventDetailItem__location-unit">{unit}</div>
        )}
        <a
          href="www.google.com"
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

  // Calculate fee range (we should probably move this logic out to somewhere else)
  let smallestFee;
  let biggestFee;
  if (fees && fees.edges && fees.edges.length && fees.edges.length > 1) {
    fees.edges.sort(edge => -edge.node.fee);
    smallestFee = fees.edges[0].node.fee;
    biggestFee = fees.edges[fees.edges.length - 1].node.fee;
  }

  return (
    <div className="coa-EventDetailItem">
      <i className="material-icons">local_play</i>
      <div className="coa-EventDetailItem__content">
        {eventIsFree ? (
          <div className="coa-EventDetailItem__fees-free">
            {`${intl.formatMessage(i18n.free)} • `}
            {registrationLinkFragment}
          </div>
        ) : fees && fees.edges && fees.edges.length ? (
          <React.Fragment>
            <div className="coa-EventDetailItem__fees-list">
              {`$${smallestFee}—$${biggestFee} • `}
              {registrationLinkFragment}
            </div>
            {fees.edges.map(edge => (
              <div>
                ${edge.node.fee} {edge.node.feeLabel}
              </div>
            ))}
          </React.Fragment>
        ) : (
          <div className="coa-EventDetailItem__fees-single">JUST ONE</div>
        )}
      </div>
    </div>
  );
};

const EventDetailCard = ({
  date,
  startTime,
  endTime,
  locations,
  eventIsFree,
  fees,
  registrationUrl,
}) => {
  const intl = useIntl();
  moment.locale(intl.locale);

  return (
    <div className="coa-EventPage__EventDetailCard">
      <div className="coa-EventDetailItem">
        <i className="material-icons">event</i>
        <div className="coa-EventDetailItem__content">
          <div className="coa-EventDetailItem__date">
            {moment(date, 'YYYY-MM-DD').format('dddd • LL')}
          </div>
          <div className="coa-EventDetailItem__time">
            {`${moment(startTime, 'HH:mm:ss').format('LT')}—${moment(
              endTime,
              'HH:mm:ss',
            ).format('LT')}`}
          </div>
        </div>
      </div>
      {!!locations &&
        !!locations.length &&
        locations.map(location => {
          if (location.locationType === 'city_location') {
            return (
              <EventLocationDetail
                name={location.cityLocation.title}
                street={location.cityLocation.physicalStreet}
                city={location.cityLocation.physicalCity}
                state={location.cityLocation.physicalState}
                zip={location.cityLocation.physicalZip}
                unit={location.cityLocation.physicalUnit}
              />
            );
          }
          if (location.locationType === 'remote_location') {
            return (
              <EventLocationDetail
                name={location.remoteLocation.name}
                street={location.remoteLocation.street}
                city={location.remoteLocation.city}
                state={location.remoteLocation.state}
                zip={location.remoteLocation.zip}
                unit={location.remoteLocation.unit}
              />
            );
          }
        })}
      <EventDetailFees
        eventIsFree={eventIsFree}
        fees={fees}
        registrationUrl={registrationUrl}
      />
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
            locations={locations}
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
