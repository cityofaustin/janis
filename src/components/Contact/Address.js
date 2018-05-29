import React from 'react';
import MapMarkerSVG from 'components/SVGs/MapMarker';
import PropTypes from 'prop-types';

import { addressPropTypes } from './proptypes';

const Address = ({ location }) => (
  <div className="coa-ContactItem coa-ContactAddress">
    <MapMarkerSVG />
    <div>
      <span>{location.name}</span>
      <span>{location.street}</span>
      <span>
        {location.city}, {location.state} {location.zip}
      </span>
    </div>
  </div>
);

Address.propTypes = {
  location: addressPropTypes,
};

export default Address;
