import React, {Component} from 'react';
import moment from 'moment';
import {sortBy, findIndex} from 'lodash';

class Hours extends Component {

  sort() {
    // TODO: Joplin data MUST include data for all 7 days of week.
    let now = moment().format('e') + "";
    let sorted = sortBy(this.props.hours, ['day']);
    let index = findIndex(sorted, {'day': now});
    return sorted.splice(index).concat(sorted);
  }

  render() {
    const hours = this.sort();
    let JSX;

    if (!hours || !hours.length) {
      JSX = null;
    } else {
      JSX = (
        <div className="coa-section__map">
          <h5>Hours</h5>
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
                  <th scope="row">{hour.dayOfWeek}</th>
                  <td>{ hour.startTime } - { hour.endTime }</td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
      );
    }

    return JSX;
  }
}

export default Hours;
