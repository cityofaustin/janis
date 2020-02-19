import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';

import EventListEntry from 'components/Pages/EventList/EventListEntry';

const filterEvents = (events) => {
  const dateNow = moment().format('YYYY-MM-DD')
  return events.filter((e) => moment(e.date).isSameOrAfter(dateNow)).slice(0,3);
}


const EventsHomePage = ({events}) => {
  const intl = useIntl();
  const threeEvents = filterEvents(events);

  return (
    threeEvents && threeEvents.length &&
    <div className="coa-EventsHomePage__container">
      <div className="coa-EventsHomePage__heading">
        Upcoming events
      </div>

      <div className="coa-EventsHomePage__events">
        {threeEvents.map(e => (
          <EventListEntry event={e} homepage={true} />
        ))}
      </div>

      <Link
        to={`/${intl.locale}/events`}
        className="coa-EventsHomePage__allEventsButton"
      >
        <div className="coa-EventsHomePage__allEventsButton--inner">
          View all events 
        </div>
      </Link>

    </div>
  )
}

export default EventsHomePage;