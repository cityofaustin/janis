import React from 'react';
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';
import moment from 'moment-timezone';

import HtmlFromRichText from 'components/HtmlFromRichText';
import ContextualNav from 'components/PageSections/ContextualNav';
import ContactDetails from 'components/Contact/ContactDetails';
import UserFeedback from 'components/UserFeedback';
import EventDetailCard from 'components/Pages/Event/EventDetailCard';

import { events as i18n } from 'js/i18n/definitions';
import { cleanLocation } from 'js/helpers/cleanData.js'

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

const EventPage = ({ eventPage }) => {
  const intl = useIntl();

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
  } = eventPage ? { eventPage } : useRouteData();

  const location = cleanLocation(locations);

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
              {!!contact && <ContactDetails contact={contact} />}
            </div>
          </div>
        </div>
        <div className="coa-Page__side-content">
          <div className="coa-EventsPage__contacts-desktop">
            {!!contact && <ContactDetails contact={contact} />}
          </div>
        </div>
      </div>
      <UserFeedback />
    </div>
  );
};

export default EventPage;
