import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedTime } from 'react-intl';
import { findIndex, capitalize } from 'lodash';
import moment from 'moment';

import { WEEKDAY_MAP } from 'js/helpers/constants';
import { date as i18n1, contact as i18n2 } from 'js/i18n/definitions';


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

  formatTime(time) {
    let style;
    // Only include minutes in display if there are minutes
    if (moment(time).minutes()) {
      style = "h:mma";
    } else {
      style = "ha";
    }
    return moment(time).format(style);
  }

  render() {
    const { hours, intl } = this.props;

    return (
      <div className="coa-ContactItem coa-ContactHours">
        <i className="material-icons">access_time</i>
        <table className="usa-table-borderless">
          <thead className="usa-sr-only">
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Open - Close Hours</th>
            </tr>
          </thead>
          <tbody>
            {this.getOrderedWeekdays(this.today).map(weekday => {
              const hourIndex = findIndex(hours, {
                dayOfWeekNumeric: weekday.numeric,
              });
              return (
                <tr key={weekday.name} >
                  <th scope="row">
                    {intl.formatMessage(
                      i18n1['weekday' + capitalize(weekday.name)],
                    )}
                  </th>

                  {hourIndex > -1 && (
                    <td>
                      {`${this.formatTime(hours[hourIndex].startTime)}-${this.formatTime(hours[hourIndex].endTime)}`}
                    </td>
                  )}
                  {hourIndex === -1 && (
                    <td>{intl.formatMessage(i18n2.closed)}</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Hours.propTypes = {
  hours: hoursPropTypes,
};

export default injectIntl(Hours);
