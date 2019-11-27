import React, { useState } from 'react';
import classNames from 'classnames';
import { find, capitalize } from 'lodash';
import { useIntl } from 'react-intl';

import { getDaysInOrder } from 'js/helpers/date';
import { date as i18nDate, locations as i18nLocations } from 'js/i18n/definitions';

const DayHours = ({day, hours}) => {
  const intl = useIntl();
  return (
    <tr>
      <td className="coa-LocationPage__table-service-label">
        {intl.formatMessage(
          i18nDate['weekday' + capitalize(day)],
        )}
      </td>
      <td>{hours}</td>
    </tr>
  );
}

const ServiceHours = ({hours}) => {
  const [expanded, setExpanded] = useState(false);
  const intl = useIntl();

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
          <DayHours
            {...todayHours}
          />
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
              <DayHours
                key={i}
                {...data}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="coa-LocationPage__service-hours-menu"
        onClick={() => setExpanded(!expanded)}
      >
        <span>
          {expanded ?
            intl.formatMessage(i18nLocations.closeHours) :
            intl.formatMessage(i18nLocations.seeMoreHours)
          }
        </span>
        <i className="coa-LocationPage__service-hour-arrow">
          {expanded ? 'expand_less' : 'expand_more'}
        </i>
      </div>
    </div>
  )
}

const Service = ({service}) => {
  const intl = useIntl();
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
        <ServiceHours
          hours={service.hours}
        />
      </div>
      <div className="coa-LocationPage__service-link">
        <span>{intl.formatMessage(i18nLocations.serviceInformation)}</span><i className="coa-LocationPage__service-link-arrow">arrow_forward</i>
      </div>
    </div>
  );
}

const LocationPageServiceList = ({services}) => {
  const intl = useIntl();
  return (
    <div className="coa-LocationPage__section">
      <div className="coa-LocationPage__sub-section">
        <h2 className="coa-LocationPage__sub-section-title">
          {intl.formatMessage(i18nLocations.servicesOffered)}
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
