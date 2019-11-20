import React from 'react';

const Service = ({service}) => {
  return (
    <div className="coa-LocationPage__service-container">
      <div className="coa-LocationPage__service-title">
        {service.title}
      </div>
      <div className="coa-LocationPage__service-info-container">
        <div className="coa-LocationPage__service-phone-container">
          <table className="coa-LocationPage__table">
            <tbody>
              <tr>
                <td className="coa-LocationPage__table-service-label">PhoneLabel:</td>
                <td>{service.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="coa-LocationPage__service-hours-container">
          <table className="coa-LocationPage__table">
            <tbody>
              {Object.keys(service.hours).map((day, i) => (
                <tr key={i}>
                  <td className="coa-LocationPage__table-service-label">{day}</td>
                  <td>{service.hours[day]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="coa-LocationPage__service-link">
        <span>Service information</span><i className="coa-LocationPage__service-link-arrow">arrow_forward</i>
      </div>
    </div>
  );
}

const LocationPageServiceList = ({services}) => {
  return (
    <div className="coa-LocationPage__section">
      <div className="coa-LocationPage__sub-section">
        <h2 className="coa-LocationPage__sub-section-title">
          Services offered
        </h2>
        {services && services.map((service, i)=>(
          <Service
            service={service}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

export default LocationPageServiceList;
