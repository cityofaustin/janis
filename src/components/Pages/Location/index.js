import React from 'react';
import { useRouteData, Head } from 'react-static';

import PageHeader from 'components/PageHeader';
import LocationInfo from 'components/Pages/Location/LocationInfo';
import LocationServiceList from 'components/Pages/Location/LocationServiceList';
import LocationGettingHere from 'components/Pages/Location/LocationGettingHere';

import { formatHours } from 'js/helpers/cleanData';

import 'components/Pages/Location/_Location.scss';

const LocationPage = ({ locationPage }) => {
  const blarg = useRouteData();

  const {
    locationPage: {
      title,
      contact: { phone, email },
      location,
      image,
      // hours,
      services,
      gettingHere: { buses },
    },
  } = locationPage ? { locationPage } : blarg;

  const hours = {
    MONDAY: formatHours({
      start1: blarg.locationPage.mondayStartTime,
      end1: blarg.locationPage.mondayEndTime,
      start2: blarg.locationPage.mondayStartTime2,
      end2: blarg.locationPage.mondayEndTime2,
    }),
    TUESDAY: formatHours({
      start1: blarg.locationPage.tuesdayStartTime,
      end1: blarg.locationPage.tuesdayEndTime,
      start2: blarg.locationPage.tuesdayStartTime2,
      end2: blarg.locationPage.tuesdayEndTime2,
    }),
    WEDNESDAY: formatHours({
      start1: blarg.locationPage.wednesdayStartTime,
      end1: blarg.locationPage.wednesdayEndTime,
      start2: blarg.locationPage.wednesdayStartTime2,
      end2: blarg.locationPage.wednesdayEndTime2,
    }),
    THURSDAY: formatHours({
      start1: blarg.locationPage.thursdayStartTime,
      end1: blarg.locationPage.thursdayEndTime,
      start2: blarg.locationPage.thursdayStartTime2,
      end2: blarg.locationPage.thursdayEndTime2,
    }),
    FRIDAY: formatHours({
      start1: blarg.locationPage.fridayStartTime,
      end1: blarg.locationPage.fridayEndTime,
      start2: blarg.locationPage.fridayStartTime2,
      end2: blarg.locationPage.fridayEndTime2,
    }),
    SATURDAY: formatHours({
      start1: blarg.locationPage.saturdayStartTime,
      end1: blarg.locationPage.saturdayEndTime,
      start2: blarg.locationPage.saturdayStartTime2,
      end2: blarg.locationPage.saturdayEndTime2,
    }),
    SUNDAY: formatHours({
      start1: blarg.locationPage.sundayStartTime,
      end1: blarg.locationPage.sundayEndTime,
      start2: blarg.locationPage.sundayStartTime2,
      end2: blarg.locationPage.sundayEndTime2,
    }),
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="coa-Page__all-of-the-content coa-LocationPage__content-container">
        <div className="coa-LocationPage__header">
          <i className="material-icons coa-LocationPage__header-icon">place</i>
          <h1 className="coa-LocationPage__header-title">{title}</h1>
        </div>
        <LocationInfo
          phone={phone}
          email={email}
          location={location}
          image={image}
          hours={hours}
        />
        {!!services && services.length && (
          <LocationServiceList services={services} />
        )}
        {!!buses && buses.length && <LocationGettingHere buses={buses} />}
      </div>
    </div>
  );
};

export default LocationPage;
