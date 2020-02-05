import React from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import PageHeader from 'components/PageHeader';
// is there a contextual nav? i dont think so
import EventListPage from 'components/Pages/Events/EventListPage';


const EventList = ({ eventListPage, intl }) => {
  const {
    // fill in what we need for preview
    eventListPage :{

    },
  } = eventListPage ? { eventListPage } : useRouteData();

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <PageHeader contentType={'event-list'} description={description}>
          {title}
        </PageHeader>
        <EventListPage eventsList={eventsList} intl={intl} />
      </div>
    </div>
  )
}

export default injectIntl(EventList)