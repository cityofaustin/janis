import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const EventsHomePage = () => {
  const intl = useIntl();

  return (
    <div className="coa-EventsHomePage__container">
      <Link
        to={`/${intl.locale}/events`}
        className="coa-EventsHomePage__allEventsButton"
      >
        <span>View all events</span>
      </Link>
    </div>
  )
}

export default EventsHomePage;