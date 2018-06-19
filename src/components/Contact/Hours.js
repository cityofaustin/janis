import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedTime } from 'react-intl';
import { findIndex, capitalize } from 'lodash';

import { WEEKDAY_MAP } from 'js/helpers/constants';
import { date as i18n1, contact as i18n2 } from 'js/i18n/definitions';

import ClockSVG from 'components/SVGs/ClockO';

import { hoursPropTypes } from './proptypes';

class Hours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: 7,
    };
  }

  componentDidMount() {
    this.setState({
      today: new Date().getDay(),
    });
  }

  getOrderedWeekdays(day) {
    let weekday_collection = Object.keys(WEEKDAY_MAP).map(key => ({
      name: key.toLowerCase(),
      numeric: WEEKDAY_MAP[key],
    }));
    return weekday_collection.splice(day).concat(weekday_collection);
  }

  render() {
    const { hours, intl } = this.props;

    return (
      <div className="coa-ContactItem coa-ContactHours">
        <ClockSVG />
        <table className="usa-table-borderless">
          <thead className="usa-sr-only">
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Open - Close Hours</th>
            </tr>
          </thead>
          <tbody>
            {this.getOrderedWeekdays(this.state.today).map(weekday => {
              const hourIndex = findIndex(hours, {
                dayOfWeekNumeric: weekday.numeric,
              });
              return (
                <tr key={weekday.name}>
                  <th scope="row">
                    {intl.formatMessage(
                      i18n1['weekday' + capitalize(weekday.name)],
                    )}
                  </th>

                  {hourIndex > -1 && (
                    <td>
                      <FormattedTime
                        value={hours[hourIndex].startTime}
                        timeZone="UTC"
                      />
                      <span> - </span>
                      <FormattedTime
                        value={hours[hourIndex].endTime}
                        timeZone="UTC"
                      />
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
