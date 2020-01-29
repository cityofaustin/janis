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

const EventLocationDetail = ({ street }) => {
  debugger;

  return <div>LOCATION: {street}</div>;
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
      <div>DATE: {moment(date, 'YYYY-MM-DD').format('dddd • LL')}</div>
      <div>START TIME: {moment(startTime, 'HH:mm:ss').format('LT')}</div>
      <div>END TIME: {moment(endTime, 'HH:mm:ss').format('LT')}</div>
      {!!locations &&
        !!locations.length &&
        locations.map(location => {
          if (location.locationType === 'city_location') {
            return (
              <EventLocationDetail
                street={location.cityLocation.physicalStreet}
              />
            );
          }
          if (location.locationType === 'remote_location') {
            return (
              <EventLocationDetail street={location.remoteLocation.street} />
            );
          }
        })}
      <div>
        {intl.formatMessage(i18n.free)}? {eventIsFree ? 'YES' : 'NO'}
      </div>
      {fees.edges.map(edge => (
        <div>
          {edge.node.feeLabel}: {edge.node.fee}
        </div>
      ))}
      <div>
        {intl.formatMessage(i18n.register)}: {registrationUrl}
      </div>
      {!registrationUrl && <div>{intl.formatMessage(i18n.public)}</div>}
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
      <div className="coa-Page__all-of-the-content">
        <div className="coa-Page__main-content">
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
                <h2>{intl.formatMessage(i18n.details)}</h2>
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
          <div className="coa-ServicePage__contacts-desktop">
            {!!contact && <ContactDetails contacts={[contact]} />}
          </div>
        </div>
      </div>
      {/* not sure if we want this in <UserFeedback /> */}
    </div>
  );
};

export default EventPage;
