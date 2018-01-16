import React, {Component} from 'react';
import moment from 'moment';

class Hours extends Component {

  render() {

    const { hours } = this.props;
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
                  <td>{moment(hour.startTime, "HH:mm:ss").format('h:mm A')} - {moment(hour.endTime, "HH:mm:ss").format('h:mm A')}</td>
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
