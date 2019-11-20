import React from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import PageHeader from 'components/PageHeader';
import LocationInfo from 'components/Pages/Location/LocationInfo';
import LocationServiceList from 'components/Pages/Location/LocationServiceList';
import LocationGettingHere from 'components/Pages/Location/LocationGettingHere';

import "components/Pages/Location/_Location.scss";

const LocationPage = ({ locationPage, intl }) => {
  const {
    locationPage: {
      title,
      contact: {
        phone,
        email,
      },
      location,
      image,
      hours,
      services,
      buses,
    }
  } = locationPage ? { locationPage } : useRouteData();

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="coa-Page__all-of-the-content coa-LocationPage__content-container">
        <div className="coa-LocationPage__header">
          <i class="material-icons coa-LocationPage__header-icon">where_to_vote</i>
          <h1 className="coa-LocationPage__header-title">
            {title}
          </h1>
        </div>
        <LocationInfo
          phone={phone}
          email={email}
          location={location}
          image={image}
          hours={hours}
        />
        <LocationServiceList
          services={services}
        />
        <LocationGettingHere/>
      </div>
    </div>
  )
}

export default injectIntl(LocationPage);
