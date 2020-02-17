import React from 'react';
import { useRouteData, Head } from 'react-static';
import moment from 'moment-timezone';
import { useIntl } from 'react-intl';

import PageHeader from 'components/PageHeader';
import EventListPagination from 'components/Pages/EventList/EventListPagination';
import UserFeedback from 'components/UserFeedback';
import { events as i18n } from 'js/i18n/definitions';


const EventList = () => {
  const intl = useIntl();
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
      <PageHeader contentType={'event-list'}> {intl.formatMessage(i18n.events)} </PageHeader>
      <div className="wrapper container-fluid">
        <EventListPagination events={events} intl={intl} />
        <UserFeedback />
      </div>
    </div>
  )
}

// proptypes?

export default EventList