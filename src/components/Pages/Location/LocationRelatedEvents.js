import React from 'react';
import { useIntl } from 'react-intl';
import { events as i18n } from 'js/i18n/definitions';
import { filterEvents } from 'js/helpers/cleanData.js';
import EventListEntry from 'components/Pages/EventList/EventListEntry';

const LocationRelatedEvents = ({ events }) => {
  const intl = useIntl();
  const threeEvents = filterEvents(events);
  return (
    <div className="coa-LocationPage__section">
      <div className="coa-LocationPage__sub-section">
        <h2 className="coa-LocationPage__sub-section-title">
          {intl.formatMessage(i18n.upcoming)}
        </h2>
        <div className="coa-LocationPage__sub-section-block-container">
          <div className="coa-LocationPage__sub-section-block">
            <div className="coa-LocationPage__sub-section-block-contents">
              <div className="coa-LocationPage__related-events-container">
                {threeEvents.map(e => (
                  <EventListEntry
                    event={e}
                    relatedPage={true}
                    relatedLocation={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationRelatedEvents;
