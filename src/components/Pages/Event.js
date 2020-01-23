import React from 'react';
import { useRouteData, Head } from 'react-static';

import PageHeader from 'components/PageHeader';
// import LocationInfo from 'components/Pages/Location/LocationInfo';
// import LocationServiceList from 'components/Pages/Location/LocationServiceList';
// import LocationGettingHere from 'components/Pages/Location/LocationGettingHere';
import UserFeedback from 'components/UserFeedback';

const EventPage = ({ eventPage }) => {
  const {
    eventPage: { number },
  } = eventPage ? { eventPage } : useRouteData();

  debugger;

  return (
    <div>
      <Head>
        <title>{number}</title>
      </Head>
      <div className="coa-Page__all-of-the-content coa-LocationPage__content-container">
        <div className="coa-LocationPage__header">
          <i className="material-icons coa-LocationPage__header-icon">place</i>
          <h1 className="coa-LocationPage__header-title">{number}</h1>
        </div>
      </div>
      <UserFeedback />
    </div>
  );
};

export default EventPage;
