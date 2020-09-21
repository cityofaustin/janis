import React, { useState, useReducer, useEffect } from 'react';

const Filter = () => {
  return (
    <div className="coa-filter__container col-md-3">
      <span className="coa-filter__rail_label">Filter</span>
      <div className="coa-filter__box">
        <span className="coa-filter__box_label">Date</span>
        <DatePicker label="From"/>
        <DatePicker label="To"/>
      </div>
      <div className="coa-filter__apply_button">
      </div>
    </div>
  )
}

const twoDigitRegex = new RegExp('^[0-9]{1,2}$');
const isValidMonth = (month) => (
  month.match(twoDigitRegex) &&
  month <= 12 &&
  month >= 1
)

const isValidDay = (day) => (
  day.match(twoDigitRegex) &&
  day <= 31 &&
  day >= 1
)

const fourDigitRegex = new RegExp('^[0-9]{1,4}$');
const isValidYear = (year) => (
  year.match(fourDigitRegex)
)

/**
  When we can stop supporting IE11, an input type of "date" would do all this work for us.
**/
const DatePicker = ({label}) => {
  /**
    updateDate() is used to update any value of date.
    Examples:
    updateDate({month: 12})
    updateDate({day: 31})
    updateDate({month: 12, day: 31})

    "month", "day", and "year" must all be in one state object
    because there is a useEffect side effect
    when we need to update all 3 at the same time.
  **/
  const [date, setDate] = useReducer((priorDate, newDate)=>{
    let {month, day, year} = newDate;

    /**
    If invalid date values are entered, then don't register them.
    "pattern", "min", "max" input field attributes only work at the moment of form submission.
    Those attributes alone won't prevent users from entering bad inputs.
    **/
    if (
      (month && !isValidMonth(month)) ||
      (day && !isValidDay(day)) ||
      (year && !isValidYear(year))
    ) {
      return priorDate
    }
    if (year > new Date().getFullYear()) {
      year = "2020"
    }

    /**
      If all 3 date inputs are filled out,
      then we'll approximate the nearest valid date.
      For example: if someone enters February 31st,
      javascript's Date function will set it to March 2nd.
    **/
    if (month && day && year) {
      const validDate = new Date(year, month - 1, day);
      month = validDate.getMonth() + 1;
      day = validDate.getDate();
      year = validDate.getFullYear();
    }

    return {...priorDate, ...{month, day, year}}
  }, {
    month: '',
    day: '',
    year: ''
  })
  const {month, day, year} = date

  const setMonth = (month) => setDate({month: month})
  const setDay = (day) => setDate({day: day})
  const setYear = (year) => setDate({year: year})

  // useEffect(()=>{
  //   if (!!month && !!day && !!year) {
  //     const validDate = new Date(year, month - 1, day);
  //     const validMonth = validDate.getMonth() + 1;
  //     const validDay = validDate.getDate();
  //     const validYear = validDate.getFullYear();
  //     // If the date entered was invalid, then set the nearest valid date.
  //     if (
  //       validMonth !== month ||
  //       validDay !== day ||
  //       validYear !== year
  //     ) {
  //       setDate({
  //         month: validMonth,
  //         day: validDay,
  //         year: validYear
  //       })
  //     }
  //   }
  // }, [date])

  return (
    <div>
      <span className="coa-filter__date_fields_label">{label}</span>
      <div className="coa-filter__date_fields">
        <NumberInput
          label="Month"
          value={month}
          onChange={setMonth}
        />
        <NumberInput
          label="Day"
          value={day}
          onChange={setDay}
        />
        <NumberInput
          label="Year"
          value={year}
          onChange={setYear}
        />
        <i className="material-icons coa-filter__calendar_icon">event</i>
      </div>
    </div>
  )
}

const NumberInput = ({label, value, onChange}) => {
  return (
    <label>
      <span className="coa-filter__date_input_label">{label}</span>
      <input
        className={`coa-filter__date_input coa-filter__date_input_${label.toLowerCase()}`}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  )
}

export default Filter;
