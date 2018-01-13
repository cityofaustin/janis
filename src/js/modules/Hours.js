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
      days: this.markToday(this.sortDays(this.props.hours), moment()),
      today: moment(),
      showHide: 'Show All',
    }
    console.log('\n\n\n');
    console.log(this.state.days);
  }

  createDay(dayOfWeek, startTime, endTime) {
    return {
      'dayOfWeek': dayOfWeek,
      'startTime': startTime,
      'endTime': endTime
    }
  }

  sortDays(days) {
    // returns a complete sorted list of days in the week, with non-given days created as CLOSED
    let newDays = new Array(7);
    for (let i = 0; i < days.length; i++) {
      switch (days[i].dayOfWeek) {
        case 'SUNDAY':
          newDays[0] = days[i];
          break;
        case 'MONDAY':
          newDays[1] = days[i];
          break;
        case 'TUESDAY':
          newDays[2] = days[i];
          break;
        case 'WEDNESDAY':
          newDays[3] = days[i];
          break;
        case 'THURSDAY':
          newDays[4] = days[i];
          break;
        case 'FRIDAY':
          newDays[5] = days[i];
          break;
        case 'SATURDAY':
          newDays[6] = days[i];
          break;
        default:
          break;
      }
    }
    for (let i = 0; i < newDays.length; i++) {
      const CLOSED = 'CLOSED';
      if (!newDays[i]) {
        switch (i) {
          case 0:
            newDays[0] = this.createDay('SUNDAY', CLOSED, CLOSED);
            break;
          case 1:
            newDays[1] = this.createDay('MONDAY', CLOSED, CLOSED);
            break;
          case 2:
            newDays[2] = this.createDay('TUESDAY', CLOSED, CLOSED);
            break;
          case 3:
            newDays[3] = this.createDay('WEDNESDAY', CLOSED, CLOSED);
            break;
          case 4:
            newDays[4] = this.createDay('THURSDAY', CLOSED, CLOSED);
            break;
          case 5:
            newDays[5] = this.createDay('FRIDAY', CLOSED, CLOSED);
            break;
          case 6:
            newDays[6] = this.createDay('SATURDAY', CLOSED, CLOSED);
            break;
        }
      }
    }
    return newDays
  }

  markTodayClasses(day, compare) {
    // day and compare are moment() objects; displayAll is Boolean
    // Returns hidden classes for rows that aren't today if displayAll == false | returns empty string for today
    if (day.dayOfWeek.toLowerCase() == compare.format('dddd').toLowerCase())
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

  handleClick(hours) {
    let newHours;
    let showHide;
    if (this.state.showHide === 'Show All') {
      newHours = this.displayAllDays(hours);
      showHide = 'Hide Others';
    } else {
      newHours = this.markToday(hours, moment());
      showHide = 'Show All';
    }

    this.setState({
      days: newHours,
      today: this.state.today,
      showHide: showHide,
    });
  }

  displayAllDays(hours) {
    // strips all hidden tags from all days
    let newHours = hours;
    for (let i = 0; i < newHours.length; i++) {
      newHours[i].classes = newHours[i].classes.replace('hidden--sm', '');
      newHours[i].classes = newHours[i].classes.replace('hidden--md', '');
    }
    return newHours;
  }

  hideOtherDays(hours) {
    let newDays = hours;
  }

  render() {
    // const { hours } = this.props;
    const hours = this.state.days.slice();
    let showHide = this.state.showHide + ' Hours';
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
            <tr><button onClick={() => this.handleClick(hours)}>{showHide}</button></tr>
          </tbody>
        </table>
      </div>
    );

  }
}

class IndividualDay extends Component {
    render() {
      let startTime = this.props.day.startTime;
      let endTime = this.props.day.endTime;

      if (!typeof startTime === 'string') {
        startTime = moment(this.props.day.startTime, "HH:mm:ss").format('h:mm A');
      }

      if (!typeof endTime === 'string') {
        endTime = moment(this.props.day.endTime, "HH:mm:ss").format('h:mm A');
      }
      return (
        <tr key={this.props.key} className={this.props.day.classes}>
          <th scope="row">{this.props.day.dayOfWeek}</th>
          <td>{startTime} - {endTime}</td>
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
