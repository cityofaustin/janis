import React from 'react';
import { useRouteData, Head } from 'react-static';
import moment from 'moment-timezone';
import { useIntl } from 'react-intl';

import PageHeader from 'components/PageHeader';
import PaginationStatic from 'components/PageSections/Pagination/PaginationStatic.js';
import UserFeedback from 'components/UserFeedback';
import EventListEntry from 'components/Pages/EventList/EventListEntry';
import { events as i18n } from 'js/i18n/definitions';

const filterOnDate = event => {
  // the api returns events greater than or equal to the time when the site is built
  // this filters out the ones between the build time and now
  const dateNow = moment().tz('America/Chicago').format('YYYY-MM-DD')
  return moment(event.date).isSameOrAfter(dateNow);
}

const EventList = () => {
  const intl = useIntl();
  const { events } = useRouteData();

  return (
    <div>
      <Head>
        <title>Event List</title>
      </Head>
      <PageHeader contentType={'event-list'}> {intl.formatMessage(i18n.events)} </PageHeader>
      <div className="wrapper container-fluid">
        <PaginationStatic
          pagesArray={events.filter(filterOnDate)}
          PageComponent={EventListEntry}
        />
        <UserFeedback />
      </div>
    </div>
  )
}

export default EventList
