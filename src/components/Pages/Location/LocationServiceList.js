import React, { useState } from 'react';
import classNames from 'classnames';
import { find, capitalize } from 'lodash';

import { getDaysInOrder } from 'js/helpers/date';

const DayHours = ({day, hours}) => (
  <tr>
    <td className="coa-LocationPage__table-service-label">{capitalize(day)}</td>
    <td>{hours}</td>
  </tr>
)

const ServiceHours = ({hours}) => {
  const [expanded, setExpanded] = useState(true);
  const days = getDaysInOrder();

  const todayHours = {
    day: days[0],
    hours: hours[days[0]],
  };
  const otherHours = days.slice(1).map(day => ({
    day,
    hours: hours[day],
  }));

  return (
    <div className="coa-LocationPage__service-hours-container">
      <table className="coa-LocationPage__table">
        <tbody>
          <DayHours {...todayHours}/>
        </tbody>
      </table>
      <div
        className={classNames("coa-LocationPage__additional-service-hours", {
          "coa-LocationPage__additional-service-hours-expanded": expanded,
        })}
      >
        <table className="coa-LocationPage__table">
          <tbody>
            {otherHours.map((data, i) => (
              <DayHours key={i} {...data}/>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="coa-LocationPage__service-hours-menu"
        onClick={() => setExpanded(!expanded)}
      >
        <span>
          {expanded ? 'Hide hours' : 'See more hours'}
        </span>
        <i className="coa-LocationPage__service-hour-arrow">
          {expanded ? 'expand_less' : 'expand_more'}
        </i>
      </div>
    </div>
  )
}

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
        <ServiceHours hours={service.hours}/>
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
