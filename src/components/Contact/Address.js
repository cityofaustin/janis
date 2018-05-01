import React from 'react';
import MapMarkerSVG from 'components/SVGs/MapMarker';
import PropTypes from 'prop-types';

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
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
  }),
};

export default Address;
