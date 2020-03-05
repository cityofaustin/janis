import React from 'react';
import moment from 'moment-timezone';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { formatTimeLang } from 'js/helpers/cleanData';
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
  // Spanish also lowercases the months
  momentMonth = momentMonth.charAt(0).toUpperCase() + momentMonth.slice(1);
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


const EventDateListDetails = ({ event, homepage }) => {
  const intl = useIntl();
  const isMobile = useMobileQuery()
  let dayType = isMobile ? 'ddd' : 'dddd';
  const { date, startTime, endTime, location, title, eventIsFree, registrationUrl, eventUrl, canceled, feesRange } = event;
  const noon = intl.formatMessage(i18n.noon);

  // parse Date
  moment.locale(intl.locale)
  let momentDay = moment(date, 'YYYY-MM-DD').format(dayType)
  momentDay = momentDay.charAt(0).toUpperCase() + momentDay.slice(1);
  if (momentDay.slice(-1) === '.') {
    momentDay = momentDay.slice(0, -1)
  }

  let eventTime = startTime && endTime
    ? `${formatTimeLang(startTime, noon)}–${formatTimeLang(endTime, noon)}`
    : formatTimeLang(startTime, noon);

  let locationName = null
  if (location) {
    locationName = (location.locationType === 'city_location')
      ? location.cityLocation.title
      : location.remoteLocation.name;
  }

  // Joplin lets a user mark an event as free but also include costs.
  // Or not mark as free, but not include fees. Ideally Id like to just check if eventIsFree
  // let cost = (eventIsFree) ? `${intl.formatMessage(i18n.free)}` : feesRange;
  // In the interim, this will have to do. b/c if a user doesnt enter fees, it should say free -chia
  let cost = (feesRange.length === 0) ? `${intl.formatMessage(i18n.free)}` : feesRange;
  let registration = registrationUrl.length ? `• ${intl.formatMessage(i18n.registrationReq)}`: '';

  if (cost.slice(0,2) === '$0') {
    cost = `${intl.formatMessage(i18n.free)}${cost.slice(2)}`
  }

  return (
    <div
      className={classNames('coa-EventListPage__EntryDetails', 
          {'coa-EventListPage__EntryDetails--homepage': homepage} )}> 
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

const EventListEntry = ({ event, homepage }) => {
  return (
    <Link
      to={event.eventUrl}
      className={classNames('coa-EventListPage__Entry', {'coa-EventListPage__Entry--homepage': homepage})}
    >
      <EventDateCalendar date={event.date} />
      <EventDateListDetails event={event} homepage={homepage}/>
    </Link>
  )
}

export default EventListEntry;
