import React, {Component} from 'react';
import moment from 'moment';

class Hours extends Component {

  isToday(day) {
    // Returns hidden classes for rows that aren't today | returns empty string for today
    console.log('\n\n\n\n');
    console.log(day.dayOfWeek.toLowerCase());
    let today = moment();
    if (day.dayOfWeek.toLowerCase() == today.format('dddd').toLowerCase())
      return "";
    else
      return "hidden--sm hidden--md hidden";
  }

  render() {

    const { hours } = this.props;
    let today = moment();


    return (hours) && (

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
              // className = check to see if date is today
              <tr key={index} className={this.isToday(hour)}>
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
}

export default Hours;
