import React from 'react';
import { useIntl } from 'react-intl';
import { filterEvents } from 'js/helpers/cleanData.js';
import EventListEntry from 'components/Pages/EventList/EventListEntry';
import { events as i18n } from 'js/i18n/definitions';

const EventsHomePage = ({ events }) => {
  const intl = useIntl();
  const threeEvents = filterEvents(events);

  return (
    threeEvents &&
    !!threeEvents.length && (
      <div className="coa-EventsHomePage__container">
        <div className="coa-EventsHomePage__heading">
          {intl.formatMessage(i18n.upcoming)}
        </div>

        <div className="coa-EventsHomePage__events">
          {threeEvents.map(e => (
            <EventListEntry event={e} homepage={true} />
          ))}
        </div>

        <a
          href={`/${intl.locale}/events`}
          className="coa-EventsHomePage__allEventsButton"
        >
          <div className="coa-EventsHomePage__allEventsButton--inner">
            {intl.formatMessage(i18n.viewAll)}
          </div>
        </a>
      </div>
    )
  );
};

export default EventsHomePage;
