import React, { useState, useReducer, useEffect } from 'react';
import DayPicker, {LocaleUtils} from "react-day-picker";

const Filter = () => {
  const lowerBound = new Date(2018, 1, 1)
  const upperBound = new Date()

  return (
    <div className="coa-filter__container col-md-3">
      <span className="coa-filter__rail_label">Filter</span>
      <div className="coa-filter__box">
        <span className="coa-filter__box_label">Date</span>
        <DateFields
          label="From"
          lowerBound={lowerBound}
          upperBound={upperBound}
        />
        <DateFields
          label="To"
          lowerBound={lowerBound}
          upperBound={upperBound}
        />
      </div>
      <div className="coa-filter__apply_button">
      </div>
    </div>
  )
}

const twoDigitRegex = new RegExp('^[0-9]{1,2}$');
const isValidMonth = (month) => (
  String(month).match(twoDigitRegex) &&
  month <= 12 &&
  month >= 1
)

const isValidDay = (day) => (
  String(day).match(twoDigitRegex) &&
  day <= 31 &&
  day >= 1
)

const fourDigitRegex = new RegExp('^[0-9]{1,4}$');
const isValidYear = (year) => (
  String(year).match(fourDigitRegex)
)


// If all fields are entered, then turn them into a date for the DayPicker
const fieldsToDate = ({month=null, day=null, year=null}) => {
  if (!month || !day || !year) return null
  return new Date(year, month - 1, day)
}

// Convert a Date object into month, day, and year values.
const dateToFields = (date) => {
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
    year: date.getFullYear(),
  }
}

/**
  When we can stop supporting IE11, an input type of "date" would do all this work for us.
**/
const DateFields = ({label, lowerBound, upperBound}) => {
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
  const [dateFields, setDateFields] = useReducer((priorDateFields, newDateFields)=>{
    let {month=null, day=null, year=null} = newDateFields;

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
      return priorDateFields
    }
    if (year > new Date().getFullYear()) {
      year = "2020"
    }

    let finalDateFields = {...priorDateFields}
    if (month !== null) finalDateFields.month = month
    if (day !== null) finalDateFields.day = day
    if (year !== null) finalDateFields.year = year

    /**
      If all 3 date inputs are filled out,
      then we'll approximate the nearest valid date.
      For example: if someone enters February 31st,
      javascript's Date function will set it to March 2nd.
    **/
    let finalMonth = finalDateFields.month
    let finalDay = finalDateFields.day
    let finalYear = finalDateFields.year
    if (finalMonth && finalDay && finalYear && finalYear.length === 4) {
      const validDate = new Date(finalYear, finalMonth - 1, finalDay);
      finalDateFields = dateToFields(validDate)
    }

    return finalDateFields
  }, {
    month: '',
    day: '',
    year: ''
  })
  const [openDayPicker, setOpenDayPicker] = useState(false)
  const [dayPickerMonth, setDayPickerMonth] = useState(null)

  const {month, day, year} = dateFields
  const setMonth = (month) => setDateFields({month: month})
  const setDay = (day) => setDateFields({day: day})
  const setYear = (year) => setDateFields({year: year})

  const handleDayPickerClick = (date, { selected }) => {
    if (selected) {
      // Unselect the day if already selected
      setDateFields({month: '', day: '', year: ''});
      return;
    }
    setDateFields(dateToFields(date))
  }
  const dayPickerDate = fieldsToDate(dateFields)

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
        <div
          className="coa-filter__calendar_icon_container"
          onClick={() => setOpenDayPicker(!openDayPicker)}
        >
          <i className="material-icons coa-filter__calendar_icon">event</i>
        </div>
      </div>
      {openDayPicker && (
        <DayPicker
          fromMonth={lowerBound}
          toMonth={upperBound}
          onDayClick={handleDayPickerClick}
          selectedDays={dayPickerDate}
          month={dayPickerMonth || dayPickerDate || new Date()}
          captionElement={({ date, localeUtils }) => (
            <YearMonthForm
              date={date}
              localeUtils={localeUtils}
              onChange={setDayPickerMonth}
              fromMonth={lowerBound}
              toMonth={upperBound}
            />
          )}
        />
      )}
    </div>
  )
}

const NumberInput = ({label, value="", onChange}) => {
  return (
    <div className="coa-filter__date_input_container">
      <label>
        <span className="coa-filter__date_input_label">{label}</span>
        <input
          className={`coa-filter__date_input coa-filter__date_input_${label.toLowerCase()}`}
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </label>
    </div>
  )
}

/**
  Modified from https://react-day-picker.js.org/examples/elements-year-navigation

  The YearMonthForm creates a select dropdown within DayPicker for choosing a month
  or year to navigate to. The result is set as the dayPickerMonth.
  dayPickerMonth is used to set the "month" prop in DayPicker.
  month={dayPickerMonth || dayPickerDate || new Date()}

  If a "dayPickerMonth" was set by selecting a Month or Year
  from the YearMonthForm, then go there.
  Otherwise, if there is a valid date entered by the dateFields, then use that.
  Otherwise, default to the current month.
**/
const YearMonthForm = ({ date, localeUtils, onChange, fromMonth, toMonth }) => {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}

export default Filter;
