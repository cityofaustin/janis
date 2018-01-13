import React, {Component} from 'react';
import moment from 'moment';


class Hours extends Component {
  // TODO:


  constructor(props) {
    super(props);
    let today = moment()
    this.state = {
      hours: this.markToday(this.sortDays(this.props.hours, today), today),
      today: today,
      showHide: 'Show All Hours',
    }
  }

  componentWillReceiveProps(newProps) {
    // State must be updated each time component renders in order to update to
    //    correct hours while maintaining hide/display method capability
    let today = moment();
    this.setState({
      hours: this.markToday(this.sortDays(newProps.hours, today), today),
      today: today,
      showHide: 'Show All Hours',
    });
  }

  createDay(dayOfWeek, startTime, endTime) {
    // Used for 'empty' days | empty dates from Wagtail
    // dayOfWeek can be a string containing the name of the day or an int
    //  representing the day's index in the week
    if (typeof dayOfWeek == 'number') {
      switch (dayOfWeek) {
        case 0:
          dayOfWeek = 'Sunday';
          break;
        case 1:
          dayOfWeek = 'Monday';
          break;
        case 2:
          dayOfWeek = 'Tuesday';
          break;
        case 3:
          dayOfWeek = 'Wednesday';
          break;
        case 4:
          dayOfWeek = 'Thursday';
          break;
        case 5:
          dayOfWeek = 'Friday';
          break;
        case 6:
          dayOfWeek = 'Saturday';
          break;
        default:
          return;
      }
    }
    return {
      'dayOfWeek': dayOfWeek,
      'startTime': startTime,
      'endTime': endTime
    }
  }

  titleCaseWord(word) {
    // title cases (first char captial, rest lower) given word
    word = word.toLowerCase();
    return word.replace(word[0], word[0].toUpperCase());
  }

  dayNumber(day) {
    // takes in day and returns a number denoting its position in the week
    day = day.toLowerCase();
    switch(day) {
      case "sunday":
        return 0;
      case "monday":
        return 1;
      case "tuesday":
        return 2;
      case "wednesday":
        return 3;
      case "thursday":
        return 4;
      case "friday":
        return 5;
      case "saturday":
        return 6;
    }
  }



  sortDays(days, today) {
    // returns a complete sorted list of days in the week, with non-given days created as CLOSED
    // I can't figure out a better way to do this sorting than with several arrays.
    // TODO: Refactor to be more efficient

    let offset = this.dayNumber(today.format('dddd')); // Offset to put today at first array position

    // Creates a new array representing the entire week; populates correct
    //    index with relevant day
    let newDays = ['','','','','','',''];
    days.map((day) => {
      day.dayOfWeek = this.titleCaseWord(day.dayOfWeek);
      newDays[this.dayNumber(day.dayOfWeek)] = day;
    });

    // Adds missing days to array
    newDays.map((day, index) => {
      if (!day) {
        newDays[index] = this.createDay(index, "CLOSED", "CLOSED");
      }
    });

    // This bit actually creates the returned list with today as first elem
    let returnDays = new Array(7);
    newDays.map((day) => {
      let dayNumber = this.dayNumber(day.dayOfWeek);
      if (dayNumber < offset) {
        returnDays[dayNumber + 7 - offset] = day;
      } else {
        returnDays[dayNumber - offset] = day;
      }
    });
    return returnDays;
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
    // handles click for show/display button
    let newHours;
    let showHide;
    if (this.state.showHide === 'Show All Hours') {
      newHours = this.displayAllDays(hours);
      showHide = 'Show Only Today';
    } else {
      newHours = this.markToday(hours, moment());
      showHide = 'Show All Hours';
    }

    this.setState({
      hours: newHours,
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

  render() {
    const hours = this.state.hours.slice();
    let showHide = this.state.showHide;

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
        <button onClick={() => this.handleClick(hours)}>{showHide}</button>
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
