import React from 'react';
import { useRouteData, Head } from 'react-static';
import moment from 'moment-timezone';
import { useIntl } from 'react-intl';

import PageHeader from 'components/PageHeader';
// import EventListPage from 'components/Pages/Events/EventListPage';
import EventListEntry from 'components/Pages/EventList/EventListEntry'
import { events as i18n } from 'js/i18n/definitions'; // will need to translate to eventos


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
      <PageHeader contentType={'event-list'}> Events </PageHeader>
      <div className="wrapper container-fluid">
        <div className="col-xs-12 col-md-8">
        {
        // <EventListPage eventsList={eventsList} intl={intl} />
        events.map((e) => <EventListEntry event={e} />)
      }
      </div>
      </div>
    </div>
  )
}

// proptypes?


export default EventList