import React, { useState } from 'react';
import classNames from 'classnames';
import { find, capitalize } from 'lodash';
import { useIntl } from 'react-intl';

import HtmlFromRichText from 'components/HtmlFromRichText';
import { getDaysInOrder } from 'js/helpers/date';
import {
  date as i18nDate,
  locations as i18nLocations,
  contact as i18nContact,
} from 'js/i18n/definitions';

const DayHours = ({ day, hours }) => {
  const intl = useIntl();
  return (
    <tr>
      <td className="coa-LocationPage__table-service-label">
        {intl.formatMessage(i18nDate['weekday' + capitalize(day)])}
      </td>
      <td>
        {hours !== null ? hours : intl.formatMessage(i18nLocations.closed)}
      </td>
    </tr>
  );
};

const HoursExceptions = ({
  serviceHoursExceptions,
  locationHoursExceptions,
  hoursSameAsLocation,
}) => {
  const intl = useIntl();
  let exceptions = serviceHoursExceptions;
  if (hoursSameAsLocation) {
    exceptions = locationHoursExceptions;
  }
  if (!exceptions) {
    return <></>
  } else {
    return (
      <div>
        <div className="coa-ContactHoursExceptionsTitle">
          {intl.formatMessage(i18nContact.exceptions)}
        </div>
        <div className="coa-ContactHoursExceptions">
          <HtmlFromRichText content={exceptions} />
        </div>
      </div>
    );
  }
};

const ServiceHours = ({ serviceHours, locationHours, hoursSameAsLocation }) => {
  const [expanded, setExpanded] = useState(false);
  const intl = useIntl();
  let hours = serviceHours;
  let hoursAreEmpty = Object.values(serviceHours).every(
    entry => entry == null || entry == undefined || entry == '',
  );
  if (hoursSameAsLocation) {
    hours = locationHours;
    hoursAreEmpty = Object.values(locationHours).every(
      entry => entry == null || entry == undefined || entry == '',
    );
  }
  let showHours = true;
  if (!hoursSameAsLocation && hoursAreEmpty) {
    showHours = false;
  }

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
    <div>
      { showHours && (
    <div className="coa-LocationPage__service-hours-container">
      <table className="coa-LocationPage__table">
        <tbody>
          <DayHours {...todayHours} />
        </tbody>
      </table>
      <div
        className={classNames('coa-LocationPage__additional-service-hours', {
          'coa-LocationPage__additional-service-hours-expanded': expanded,
        })}
      >
        <table className="coa-LocationPage__table">
          <tbody>
            {otherHours.map((data, i) => (
              <DayHours key={i} {...data} />
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="coa-LocationPage__service-hours-menu"
        onClick={() => setExpanded(!expanded)}
      >
        <span>
          {expanded
            ? intl.formatMessage(i18nLocations.closeHours)
            : intl.formatMessage(i18nLocations.seeMoreHours)}
        </span>
        <i className="coa-LocationPage__service-hour-arrow">
          {expanded ? 'expand_less' : 'expand_more'}
        </i>
      </div>
    </div>
  )}
        </div>
  );
};

const Service = ({ service, locationHours }) => {
  const intl = useIntl();

  return (
    <div className="coa-LocationPage__service-container">
      <div className="coa-LocationPage__service-title">{service.title}</div>
      <div className="coa-LocationPage__service-info-container">
        {!!service.phones && !!service.phones.length && (
          <div className="coa-LocationPage__service-phone-container">
            <table className="coa-LocationPage__table">
              <tbody>
                {service.phones.map(phone => (
                  <tr>
                    {!!phone.label && (
                      <td className="coa-LocationPage__table-service-label">
                        {phone.label}
                      </td>
                    )}
                    <td>
                      <a href={`tel:${phone.number}`}>{phone.number}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* atm service hours return null, but exceptions return undefined, so
          we need to check both cases */}

        {Object.values(service.hours).some(
          value => value !== null && value !== undefined,
        ) && (
          <ServiceHours
            serviceHours={service.hours}
            locationHours={locationHours}
            hoursSameAsLocation={service.hoursSameAsLocation}
          />
        )}
        {/* we'll need similar logic to show location exception if that is checked */}
        {(!!service.hours.exceptions || !!locationHours.exceptions) && (
          <HoursExceptions
            serviceHoursExceptions={service.hours.exceptions}
            locationHoursExceptions={locationHours.exceptions}
            hoursSameAsLocation={service.hoursSameAsLocation}
          />
        )}
      </div>
      <a className="coa-LocationPage__service-link-link" href={service.url}>
        <div className="coa-LocationPage__service-link">
          <span>{intl.formatMessage(i18nLocations.serviceInformation)}</span>
          <i className="coa-LocationPage__service-link-arrow">arrow_forward</i>
        </div>
      </a>
    </div>
  );
};

const LocationPageServiceList = ({ services, locationHours }) => {
  const intl = useIntl();
  return (
    <div className="coa-LocationPage__section">
      <div className="coa-LocationPage__sub-section">
        <h2 className="coa-LocationPage__sub-section-title">
          {intl.formatMessage(i18nLocations.servicesOffered)}
        </h2>
        {services &&
          services.map((service, i) => (
            <Service service={service} key={i} locationHours={locationHours} />
          ))}
      </div>
    </div>
  );
};

export default LocationPageServiceList;
