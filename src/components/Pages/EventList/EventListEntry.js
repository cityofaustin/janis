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
  // Spanish is adding periods at the end of abbreviations on mobile
  if (momentMonth.slice(-1) === '.') {
    momentMonth = momentMonth.slice(0, -1)
  }
  // the Date is the last two digits of the date
  let momentDate = date && date.slice(-2)

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
  console.log(event.checkDate);
  const intl = useIntl();
  const isMobile = useMobileQuery()
  let dayType = isMobile ? 'ddd' : 'dddd';
  const { date, startTime, endTime, location, title, eventIsFree, registrationUrl, eventUrl, canceled, feesRange } = event;
  
  // parse Date
  moment.locale(intl.locale)
  let momentDay = moment(date, 'YYYY-MM-DD').format(dayType)
  momentDay = momentDay.charAt(0).toUpperCase() + momentDay.slice(1);
  if (momentDay.slice(-1) === '.') {
    momentDay = momentDay.slice(0, -1)
  }
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
    locationName = (location.locationType === 'city_location')
      ? location.cityLocation.title
      : location.remoteLocation.name;
  }

  // Joplin lets a user mark an event as free but also include costs.
  // Or not mark as free, but not include fees
  let cost = (eventIsFree && feesRange.length === 0) ? `${intl.formatMessage(i18n.free)}` : feesRange;
  let registration = registrationUrl.length ? `• ${intl.formatMessage(i18n.registrationReq)}`: '';

  if (cost.slice(0,2) === '$0') {
    cost = `${intl.formatMessage(i18n.free)}${cost.slice(2)}`
  }

  return (
    <div className="coa-EventListPage__EntryDetails"> 
      { 
        canceled 
        && <div className="coa-EventListPage__Canceled">
            {intl.formatMessage(i18n.canceled)}
           </div> 
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
