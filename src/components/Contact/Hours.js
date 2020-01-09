import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedTime } from 'react-intl';
import { findIndex, capitalize } from 'lodash';

import { WEEKDAY_MAP } from 'js/helpers/constants';
import { date as i18n1, contact as i18n2 } from 'js/i18n/definitions';
import { getDaysInOrder } from 'js/helpers/date';

import { hoursPropTypes } from './proptypes';

class Hours extends Component {
  constructor(props) {
    super(props);
    this.today = new Date().getDay();
  }

  getOrderedWeekdays(day) {
    let weekday_collection = Object.keys(WEEKDAY_MAP).map(key => ({
      name: key,
      numeric: WEEKDAY_MAP[key],
    }));
    return weekday_collection.splice(day).concat(weekday_collection);
  }

  render() {
    const { hours, intl } = this.props;

    return (
      <div className="coa-ContactItem coa-ContactHours">
        <i className="material-icons">access_time</i>
        <div className="coa-ContactHours_table-container">
          <table className="usa-table-borderless">
            <thead className="usa-sr-only">
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Open - Close Hours</th>
              </tr>
            </thead>
            <tbody>
              {getDaysInOrder().map((day, i) => (
                <tr key={i}>
                  <th scope="row">
                    {intl.formatMessage(i18n1['weekday' + capitalize(day)])}
                  </th>
                  <td>
                    {hours[day] !== null
                      ? hours[day]
                      : intl.formatMessage(i18n2.closed)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!!hours.exceptions && (
            <React.Fragment>
              <div className="coa-ContactHoursExceptionsTitle">
                {intl.formatMessage(i18n2.exceptions)}
              </div>
              <div className="coa-ContactHoursExceptions">
                {hours.exceptions}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

Hours.propTypes = {
  hours: hoursPropTypes,
};

export default injectIntl(Hours);
