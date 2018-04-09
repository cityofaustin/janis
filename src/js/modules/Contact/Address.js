import React from 'react';
import MapMarkerSVG from 'js/svg/MapMarker';
import PropTypes from 'prop-types';

const Address = ({ className, name, location }) => (
  <div className={`${className} coa-ContactAddress`}>
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
  className: PropTypes.string,
  location: PropTypes.shape({
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
  }),
};

export default Address;
