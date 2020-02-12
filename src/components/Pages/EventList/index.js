import React from 'react';
import { useRouteData, Head } from 'react-static';
import moment from 'moment-timezone';
import { useIntl } from 'react-intl';

import PageHeader from 'components/PageHeader';
// is there a contextual nav?
// import EventListPage from 'components/Pages/Events/EventListPage';
import { EventDate } from 'components/Pages/Event'
import { formatTime, formatHours } from 'js/helpers/cleanData';
import { events as i18n } from 'js/i18n/definitions';

const EventDateCalendar = ({date}) => {
  const intl = useIntl();
  moment.locale(intl.locale);

  let momentMonth = moment(date, 'YYYY-MM-DD').format('MMMM');
  let momentDate = date && date.slice(-2) // check what happens if there is a single digit

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
  moment.locale(intl.locale)
  const { date, startTime, endTime, location, title, eventIsFree, registrationUrl } = event;

  let momentDay = moment(date, 'YYYY-MM-DD').format('dddd')
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

  let cost = eventIsFree ? `${intl.formatMessage(i18n.free)}` : '$999';
  let registration = registrationUrl.length ? `• Registration Required`: '';

  return (
    <div className="coa-EventListPage__EntryDetails">
    { // cancelled
    }
      <div className="coa-EventListPage__Time">{ `${momentDay} • ${eventTime}`}</div>
      <div className="coa-EventListPage__Title"><a href="/">{title}</a></div> 
      <div className="coa-EventListPage__Location">{locationName}</div>
      <div className="coa-EventListPage__Cost">{`${cost} ${registration}` }</div>
    </div>
  )
}


const EventListEntry = ({event}) => {
  return (
    <div className="coa-EventListPage__Entry">
      <EventDateCalendar date={event.date} />
      <EventDateListDetails event={event}/>
    </div>
  )
}

const EventList = ({ intl }) => {
   const { events } = useRouteData();
  // const {
  //   // fill in what we need for preview
  //   eventListPage :{

  //   },
  // } = eventListPage ? { eventListPage } : useRouteData();
  return (
    <div>
      <Head>
        <title>Event List</title>
      </Head>
      <div className="wrapper container-fluid">
        <PageHeader contentType={'event-list'}> Events </PageHeader>
        {
        // <EventListPage eventsList={eventsList} intl={intl} />
        events.map((e) => <EventListEntry event={e} />)
      }
      </div>
    </div>
  )
}

export default EventList