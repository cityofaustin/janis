import React, {Component} from 'react';
import moment from 'moment';


class Hours extends Component {
  // TODO:
  //  - create all seven days (do in WagTail?)
  //  - create display all method
  //  - create hide all but today method (same method as above?)

  constructor(props) {
    super(props);
    this.state = {
      days: this.sortDays(this.props.hours),
      today: moment(),
    }
    console.log('\n\n\n');
    console.log(this.state.days);
  }

  sortDays(days) {
    // TODO: method that returns given list of days sorted (ie. M, T, W, TH, F from F, W, TH, M, T)
    // MAYBE: adds missing days
    return days
  }

  markTodayClasses(day, compare) {
    // Returns hidden classes for rows that aren't today | returns empty string for today
    let today = moment();
    if (day.dayOfWeek.toLowerCase() == today.format('dddd').toLowerCase())
      return "coa-Hours__today";
    else
      return "hidden--sm hidden--md";
  }

  markToday(days, today) {
    // iterates through given days, classes prop to those from markTodayClasses
    for (let i = 0; i < days.length; i++) {
      days[i].classes = this.markTodayClasses(days[i], today);
    }
    return days;
  }

  render() {
    // const { hours } = this.props;
    const hours = this.markToday(this.state.days.slice(), this.state.today);

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
            { hours.map((day, index) => <IndividualDay day={day} key={index} />)}
          </tbody>
        </table>
      </div>
    );

  }
}

class IndividualDay extends Component {
    render() {
      return (
        <tr key={this.props.key} className={this.props.day.classes}>
          <th scope="row">{this.props.day.dayOfWeek}</th>
          <td>{moment(this.props.day.startTime, "HH:mm:ss").format('h:mm A')} - {moment(this.props.day.endTime, "HH:mm:ss").format('h:mm A')}</td>
        </tr>
      )
    }
}


export default Hours;


//===========
// ORIGINAL hours mapping
// {
//
//   hours.map((hour, index) =>
//     // className = check to see if date is today, insert returned classes
//     <tr key={index} className={this.markTodayClasses(hour, this.state.today)}>
//       <th scope="row">{hour.dayOfWeek}</th>
//       <td>{moment(hour.startTime, "HH:mm:ss").format('h:mm A')} - {moment(hour.endTime, "HH:mm:ss").format('h:mm A')}</td>
//     </tr>
//   )
// }
