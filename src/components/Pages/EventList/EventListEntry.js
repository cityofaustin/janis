import React from 'react';
import moment from 'moment-timezone';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { formatTime, formatHours } from 'js/helpers/cleanData';
import { events as i18n } from 'js/i18n/definitions';

const EventDateCalendar = ({date}) => {
  const intl = useIntl();
  const isMobile = useMobileQuery()
  
  moment.locale(intl.locale);
  let monthType = isMobile ? 'MMM' : 'MMMM';
  let momentMonth = moment(date, 'YYYY-MM-DD').format(monthType);
  let momentDate = date && date.slice(-2) // check what happens if there is a single digit (do march!)

  return (
    <div className="coa-EventListPage__DateCal">
      <div className="coa-EventListPage__DateCal-month">
        {momentMonth}
      </div>
      <div className="coa-EventListPage__DateCal-date">
        {momentDate}
      </div>
    </div>
  )
}


const EventDateListDetails = ({ event }) => {
  const intl = useIntl();
  const isMobile = useMobileQuery()
  const { date, startTime, endTime, location, title, eventIsFree, registrationUrl, eventUrl, canceled, feesRange } = event;
  
  moment.locale(intl.locale)
  let dayType = isMobile ? 'ddd' : 'dddd';
  let momentDay = moment(date, 'YYYY-MM-DD').format(dayType)
  let eventTime = startTime && endTime
    ? formatHours({
        start1: startTime,
        end1: endTime,
        start2: null,
        end2: null,
      })
    : formatTime(startTime);

  let locationName = null
  if (location) {
    locationName = location.locationType === 'city_location'
    ? location.cityLocation.title
    : location.remoteLocation.title;
  }

  let cost = eventIsFree ? `${intl.formatMessage(i18n.free)}` : feesRange;
  let registration = registrationUrl.length ? `• ${intl.formatMessage(i18n.registrationReq)}`: '';

  return (
    <div className="coa-EventListPage__EntryDetails"> 
    { canceled && <div className="coa-EventListPage__Canceled">canceled</div> // translate!
    }
      <div className="coa-EventListPage__Time">{ `${momentDay} • ${eventTime}`}</div>
      <div className="coa-EventListPage__Title"><a href={eventUrl}>{title}</a></div> 
      <div className="coa-EventListPage__Location">{locationName}</div>
      <div className="coa-EventListPage__Cost">{`${cost} ${registration}` }</div>
    </div>
  )
}

const EventListEntry = ({event}) => {
  return (
    <Link to={event.eventUrl} className="coa-EventListPage__Entry">
      <EventDateCalendar date={event.date} />
      <EventDateListDetails event={event}/>
    </Link>
  )
}

export default EventListEntry;
