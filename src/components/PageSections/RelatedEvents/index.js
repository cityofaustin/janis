import React from 'react';
import { useIntl } from 'react-intl';
import { filterEvents } from 'js/helpers/cleanData.js';
import EventListEntry from 'components/Pages/EventList/EventListEntry';
import { events as i18n } from 'js/i18n/definitions';

const RelatedEvents = ({ events }) => {
  const intl = useIntl();
  const threeEvents = filterEvents(events);

  return (
    threeEvents &&
    !!threeEvents.length && (
      <div className="coa-RelatedEvents__container">
        <div className="coa-RelatedEvents__heading">
          <i className="material-icons coa-RelatedEvents__icon">event</i>
          {intl.formatMessage(i18n.upcoming)}
        </div>

        <div className="coa-RelatedEvents__events">
          {threeEvents.map(e => (
            <EventListEntry event={e} relatedPage={true} />
          ))}
        </div>
      </div>
    )
  );
};

export default RelatedEvents;
