import React from 'react';
import PropTypes from 'prop-types';
import HtmlFromRichText from 'components/HtmlFromRichText';
import { useIntl } from 'react-intl';

const LocationInStep = ({ location }) => {
  const intl = useIntl();

  return (
    <a
      href={`/${intl.locale}/location/${location.locationPage.slug}/`}
      className="coa-StepWithLocations__location"
    >
      <div className="coa-StepWithLocations__location-titleaddress">
        <p className="coa-StepWithLocations__location-title">
          {location.locationPage.title}
        </p>
        <p className="coa-StepWithLocations__location-address">{`${
          location.locationPage.physicalStreet
        }${location.locationPage.physicalUnit}, ${
          location.locationPage.physicalCity
        }, ${location.locationPage.physicalState} ${
          location.locationPage.physicalZip
        }`}</p>
      </div>
      <div className="coa-StepWithLocations__location-arrow">
        <i class="material-icons">arrow_forward</i>
      </div>
    </a>
  );
};

const StepWithLocationsContainer = ({ description, locations }) => {
  return (
    <div className="coa-StepWithLocations__container">
      <HtmlFromRichText content={description} />
      {locations.map(location => (
        <LocationInStep location={location} />
      ))}
    </div>
  );
};

const StepWithLocations = ({ description, locations, singleStep }) =>
  singleStep ? (
    <StepWithLocationsContainer
      description={description}
      locations={locations}
    />
  ) : (
    <li>
      <StepWithLocationsContainer
        description={description}
        locations={locations}
      />
    </li>
  );

export default StepWithLocations;
