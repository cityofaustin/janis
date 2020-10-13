import React, { useState, useReducer, useEffect } from 'react';
import DayPicker, {LocaleUtils} from "react-day-picker";
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { useDesktopQuery } from 'js/helpers/reactMediaQueries';
import { filter as i18n1 } from 'js/i18n/definitions';
import { mobilePopupHelper } from 'js/helpers/hooks';
import { months, weekdaysLong, weekdaysShort } from 'js/i18n/constants';

const Filter = ({applyFilter, fromDate, toDate, lowerBound, upperBound}) => {
  const intl = useIntl();
  const isDesktop = useDesktopQuery();

  if (!isDesktop) {
    return (
      <FilterMobilePopup
        applyFilter={applyFilter}
        fromDate={fromDate}
        toDate={toDate}
        lowerBound={lowerBound}
        upperBound={upperBound}
      />
    )
  } else {
    return (
      <div className="coa-filter__container col-md-auto">
        <span className="coa-filter__rail_label">{intl.formatMessage(i18n1.filter)}</span>
        <FilterBox
          applyFilter={applyFilter}
          fromDate={fromDate}
          toDate={toDate}
          lowerBound={lowerBound}
          upperBound={upperBound}
        />
      </div>
    )
  }
}

const FilterMobilePopup = ({applyFilter, fromDate, toDate, lowerBound, upperBound}) => {
  const intl = useIntl();
  const [menuOpened, setMenuOpened] = useState(false);
  mobilePopupHelper(menuOpened, setMenuOpened)

  return (
    <div style={{width: "100%"}}>
      <div onClick={()=>setMenuOpened(true)} className="coa-filter__filter-by-date-button col-xs-12">
        <i className="material-icons">filter_list</i>
        {intl.formatMessage(i18n1.filterByDate)}
      </div>
      <div
        className={classNames("coa-filter__mobile-popup-background", {
          "coa-filter__mobile-popup-background-open": menuOpened
        })}
      >
        <div className="coa-filter__mobile-popup-container">
          <div className="coa-filter__mobile-popup-title-container">
            <div className="coa-filter__mobile-popup-title">
              {intl.formatMessage(i18n1.filter)}
            </div>
            <i
              className="material-icons coa-filter__mobile-close"
              onClick={()=>setMenuOpened(false)}
            >close</i>
          </div>
          <FilterBox
            applyFilter={applyFilter}
            fromDate={fromDate}
            toDate={toDate}
            lowerBound={lowerBound}
            upperBound={upperBound}
          />
        </div>
      </div>
    </div>
  )
}

const twoDigitRegex = new RegExp('^[0-9]{1,2}$');
const fourDigitRegex = new RegExp('^[0-9]{1,4}$');
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
const isValidYear = (year) => (
  String(year).match(fourDigitRegex)
)

// If all fields are entered, then turn them into a date for the DayPicker
const fieldsToDate = ({month=null, day=null, year=null}) => {
  if (!month || !day || !year) return null
  return new Date(Date.UTC(year, month - 1, day))
}

/**
  Convert a Date object into month, day, and year values.
  If a null date is passed, then set empty strings.
  Note: we must get the UTC values. Otherwise, Javascript will convert them to
  your browser's timezone, and the values will not match what you entered.
  For Central Time, all of the days are one day behind UTC. Getting the UTC
  values will allow everything to match as expected.
**/
const dateToFields = (date) => {
  return (date) ? {
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    year: date.getUTCFullYear(),
  } : {
    month: '',
    day: '',
    year: ''
  }
}

/**
  The dateFieldsReducer contains the logic to update the month, day, and year values
  from either the DayPicker Widget or the month, day, and year input fields.
  When we can stop supporting IE11, an input type of "date" might do some of this work for us.
  @param newDateFields
    The newDateFields object can be used to update any value of date.
    Examples:
    setDateFields({month: 12})
    setDateFields({day: 31})
    setDateFields({month: 12, day: 31})

    "month", "day", and "year" must all be in one state object
    because there is a useReducer side effect
    when we need to update all 3 at the same time.
  @returns dateFields
    An Object containing the month, day, and year of the selected
    {
      month: <Number>,
      day: <Number>,
      year: <Number>
    }
**/
function dateFieldsReducer(priorDateFields, newDateFields) {
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
  if (year > new Date().getUTCFullYear()) {
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
    const validDate = new Date(Date.UTC(finalYear, finalMonth - 1, finalDay));
    finalDateFields = dateToFields(validDate)
  }

  return finalDateFields
}

const FilterBox = ({applyFilter, fromDate, toDate, lowerBound, upperBound}) => {
  const intl = useIntl();
  const isDesktop = useDesktopQuery();

  /**
    If your initial state is determined by props,
    then you must set a useEffect to reset your state whenever those props change.
    Technically, this is an anti-pattern.
    However, we really do want to have 2 different states for toDate and fromDate.
    There is the "toDate/fromDate" that has already been applied by a filter,
    then there are the in-progress "toDateFields/fromDateFields" set by the DateFields component.
    The "toDateFields/fromDateFields" will only be set as the "toDate/fromDate" when the user explicitly
    clicks the button to "Apply Filter".
    https://github.com/facebook/react/issues/16461
  **/
  const [fromDateFields, setFromDateFields] = useReducer(dateFieldsReducer, dateToFields(fromDate))
  useEffect(()=>{
    setFromDateFields(dateToFields(fromDate))
  }, [fromDate])
  const [toDateFields, setToDateFields] = useReducer(dateFieldsReducer, dateToFields(toDate))
  useEffect(()=>{
    setToDateFields(dateToFields(toDate))
  }, [toDate])

  return (
    <div>
      <div className="coa-filter__box">
        <span className="coa-filter__box-label">{intl.formatMessage(i18n1.date)}</span>
        <DateFields
          label={intl.formatMessage(i18n1.from)}
          dateFields={fromDateFields}
          setDateFields={setFromDateFields}
          lowerBound={lowerBound}
          upperBound={upperBound}
        />
        <DateFields
          label={intl.formatMessage(i18n1.to)}
          dateFields={toDateFields}
          setDateFields={setToDateFields}
          lowerBound={lowerBound}
          upperBound={upperBound}
        />
      </div>
      {!isDesktop && (
        <div
          className="coa-filter__mobile-clear-button"
          onClick={()=>applyFilter(null, null, false)}
        >
          {intl.formatMessage(i18n1.clearFilters)}
        </div>
      )}
      <div
        className="coa-filter__apply-button"
        onClick={()=>applyFilter(fieldsToDate(fromDateFields), fieldsToDate(toDateFields), true)}
      >
        {intl.formatMessage(i18n1.applyFilters)}
      </div>
    </div>
  )
}

const DateFields = ({label, dateFields, setDateFields, lowerBound, upperBound}) => {
  const intl = useIntl();
  const [openDayPicker, setOpenDayPicker] = useState(false)
  const [dayPickerMonth, setDayPickerMonth] = useState(null)

  const {month, day, year} = dateFields
  const dayPickerDate = fieldsToDate(dateFields)
  const setMonth = (month) => setDateFields({month: month})
  const setDay = (day) => setDateFields({day: day})
  const setYear = (year) => setDateFields({year: year})

  const handleDayPickerClick = (date, { selected }) => {
    setOpenDayPicker(false)
    if (selected) {
      // Unselect the day if already selected
      setDateFields({month: '', day: '', year: ''});
      return;
    }
    setDateFields(dateToFields(date))
  }

  return (
    <div style={{"margin-top": "1rem"}}>
      <span className="coa-filter__date-fields-label">{label}</span>
      <div className="coa-filter__date-fields">
        <NumberInput
          label="month"
          value={month}
          onChange={setMonth}
        />
        <NumberInput
          label="day"
          value={day}
          onChange={setDay}
        />
        <NumberInput
          label="year"
          value={year}
          onChange={setYear}
        />
        <div
          className="coa-filter__calendar-icon-container"
          onClick={() => setOpenDayPicker(!openDayPicker)}
        >
          <i className="material-icons coa-filter__calendar-icon">event</i>
        </div>
      </div>
      <DayPicker
        className={`coa-daypicker__container ${!openDayPicker && "coa-daypicker__container-hidden"}`}
        fromMonth={lowerBound}
        toMonth={upperBound}
        onDayClick={handleDayPickerClick}
        selectedDays={dayPickerDate}
        month={dayPickerMonth || dayPickerDate || new Date()}
        months={months(intl)}
        weekdaysLong={weekdaysLong(intl)}
        weekdaysShort={weekdaysShort(intl)}
        captionElement={({ date, localeUtils }) => (
          <YearMonthPicker
            date={date}
            months={months(intl)}
            onChange={setDayPickerMonth}
            fromMonth={lowerBound}
            toMonth={upperBound}
          />
        )}
      />
    </div>
  )
}

const NumberInput = ({label, value="", onChange}) => {
  const intl = useIntl();
  return (
    <div className="coa-filter__date-input-container">
      <label>
        <span className="coa-filter__date-input-label">{intl.formatMessage(i18n1[label])}</span>
        <input
          className={`coa-filter__date-input coa-filter__date-input-${label.toLowerCase()}`}
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

  The YearMonthPicker creates a select dropdown within DayPicker for choosing a month
  or year to navigate to. The result is set as the dayPickerMonth.
  dayPickerMonth is used to set the "month" prop in DayPicker.
  month={dayPickerMonth || dayPickerDate || new Date()}

  If a "dayPickerMonth" was set by selecting a Month or Year
  from the YearMonthPicker, then go there.
  Otherwise, if there is a valid date entered by the dateFields, then use that.
  Otherwise, default to the current month.
**/
const YearMonthPicker = ({ date, months, onChange, fromMonth, toMonth }) => {
  const years = [];
  for (let i = fromMonth.getUTCFullYear(); i <= toMonth.getUTCFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <div className="DayPicker-Caption">
      <form className="coa-daypicker__year-month-container">
        <select className="coa-daypicker__select" name="month" onChange={handleChange} value={date.getUTCMonth()}>
          {months.map((month, i) => (
            <option key={month} value={i}>
              {month}
            </option>
          ))}
        </select>
        <select className="coa-daypicker__select" name="year" onChange={handleChange} value={date.getUTCFullYear()}>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default Filter;
