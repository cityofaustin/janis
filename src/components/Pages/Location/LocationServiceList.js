import React from 'react';

const LocationPageService = ({service}) => {
  return (
    <div>A service.</div>
  )
}

const LocationPageServiceList = ({services}) => {
  return (
    <div className="coa-LocationPage__section">
      <div className="coa-LocationPage__sub-section">
        <h2 className="coa-LocationPage__sub-section-title">
          Services offered
        </h2>
        {services && services.map((service)=>(
          <LocationPageService/>
        ))}
      </div>
    </div>
  );
}

export default LocationPageServiceList;
