import React from 'react';
import MapMarkerSVG from 'js/svg/MapMarker';
import PropTypes from 'prop-types';

const Address = ({ name, location }) => (
  <div className="coa-ContactItem coa-ContactAddress">
    <MapMarkerSVG size="20"/>
    <div>
      <span>{name}</span>
      <span>{location.street}</span>
      <span>{location.city}, {location.state} {location.zip}</span>
    </div>
  </div>
);

Address.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.shape({
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
  }),
};

export default Address;
