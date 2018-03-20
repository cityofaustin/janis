import React, {Component} from 'react';
import { FormattedMessage, FormattedTime } from 'react-intl';
import {sortBy, findIndex} from 'lodash';
//TODO: import correct svg
import AirplaneSVG from 'js/svg/Airplane';


const i18nMessagesWeekdayMap = {
  "SUNDAY":   <FormattedMessage
      id="Hours.weekday.sunday"
      defaultMessage="Sunday"
    />,
  "MONDAY":   <FormattedMessage
      id="Hours.weekday.monday"
      defaultMessage="Monday"
    />,
  "TUESDAY":  <FormattedMessage
      id="Hours.weekday.tuesday"
      defaultMessage="Tuesday"
    />,
  "WEDNESDAY":<FormattedMessage
      id="Hours.weekday.wednesday"
      defaultMessage="Wednesday"
    />,
  "THURSDAY": <FormattedMessage
      id="Hours.weekday.thursday"
      defaultMessage="Thursday"
    />,
  "FRIDAY":   <FormattedMessage
      id="Hours.weekday.friday"
      defaultMessage="Friday"
    />,
  "SATURDAY": <FormattedMessage
      id="Hours.weekday.saturday"
      defaultMessage="Saturday"
    />,
};

class ContactHours extends Component {

  sort(hours) {
    // TODO: Joplin data MUST include data for all 7 days of week.
    let now = new Date()
    let sorted = sortBy(hours, ['dayOfWeekNumeric']);
    let index = findIndex(sorted, {'dayOfWeek': now.getDay()});
    return sorted.splice(index).concat(sorted);
  }

  render() {
    const hours = this.sort(this.props.hours);
    return (
      <div className={`${this.props.className} coa-ContactHours`}>
        <AirplaneSVG size="20"/>
        <table className="usa-table-borderless">
          <thead className="usa-sr-only">
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Open - Close Hours</th>
            </tr>
          </thead>
          <tbody>
          {
            hours.map((hour, index) =>
              <tr key={index}>
                <th scope="row">{i18nMessagesWeekdayMap[hour.dayOfWeek]}</th>
                <td><FormattedTime value={hour.startTime} /> - <FormattedTime value={hour.endTime} /></td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default ContactHours;
