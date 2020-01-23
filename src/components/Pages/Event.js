import React from 'react';
import { useRouteData, Head } from 'react-static';

import PageHeader from 'components/PageHeader';
// import LocationInfo from 'components/Pages/Location/LocationInfo';
// import LocationServiceList from 'components/Pages/Location/LocationServiceList';
// import LocationGettingHere from 'components/Pages/Location/LocationGettingHere';
import UserFeedback from 'components/UserFeedback';

import HtmlFromRichText from 'components/HtmlFromRichText';
import ContextualNav from 'components/PageSections/ContextualNav';

const EventPage = ({ eventPage }) => {
  const blarg = eventPage ? { eventPage } : useRouteData();

  const {
    eventPage: { title, description, date },
  } = blarg;

  debugger;

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <ContextualNav
        parent={{ title: 'All Events' /*todo translate*/, url: '/events/' }}
        relatedTo={[]}
        offeredBy={[]}
      />
      <div className="coa-Page__all-of-the-content coa-LocationPage__content-container">
        <div className="coa-LocationPage__header">
          <i className="material-icons coa-LocationPage__header-icon">place</i>
          <h1 className="coa-LocationPage__header-title">{title}</h1>
          {description && (
            <HtmlFromRichText title={' '} content={description} />
          )}
        </div>
      </div>
      <UserFeedback />
    </div>
  );
};

export default EventPage;
