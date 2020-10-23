import React, { useState, useReducer, useEffect, useRef } from 'react';
import DayPicker, {LocaleUtils} from "react-day-picker";
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { useDesktopQuery } from 'js/helpers/reactMediaQueries';
import { filter as i18n1 } from 'js/i18n/definitions';
import { mobilePopupHelper } from 'js/helpers/hooks';
import { months, weekdaysLong, weekdaysShort } from 'js/i18n/constants';
import { maxKeywordLength } from 'js/helpers/constants';

const Filter = ({applyFilter, fromDate, toDate, searchedTerm, lowerBound, upperBound}) => {
  const intl = useIntl();
  const isDesktop = useDesktopQuery();

  if (!isDesktop) {
    return (
      <FilterMobilePopup
        applyFilter={applyFilter}
        fromDate={fromDate}
        toDate={toDate}
        searchedTerm={searchedTerm}
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
          searchedTerm={searchedTerm}
          lowerBound={lowerBound}
          upperBound={upperBound}
        />
      </div>
    )
  }
}

const FilterMobilePopup = ({applyFilter, fromDate, toDate, searchedTerm, lowerBound, upperBound}) => {
  const intl = useIntl();
  const [menuOpened, setMenuOpened] = useState(false);
  mobilePopupHelper(menuOpened, setMenuOpened)

  return (
    <div style={{width: "100%"}}>
      <div onClick={()=>setMenuOpened(true)} className="coa-filter__filter-button col-xs-12">
        <i className="material-icons">filter_list</i>
        {intl.formatMessage(i18n1.filters)}
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
            setMenuOpened={setMenuOpened}
            applyFilter={applyFilter}
            fromDate={fromDate}
            toDate={toDate}
            searchedTerm={searchedTerm}
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
  return new Date(year, month - 1, day)
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
  Converts dateString into an object digestible by DateFields components
  @param dateString {String "YYYY-MM-DD"}
  @returns dateFields {Object {month, day, year}}
**/
const dateStringToFields = (dateString) => {
  if (dateString) {
    const [year, month, day] = dateString.split("-")
    return {
      month,
      day,
      year
    }
  } else {
    return {
      month: '',
      day: '',
      year: ''
    }
  }
}

/**
  Converts dateFields object into a dateString
  @param dateFields {Object {month, day, year}}
  @returns dateString {String "YYYY-MM-DD"}
**/
const fieldsToDateString = (fields) => {
  const date = fieldsToDate(fields)
  if (!date) return null
  let month = String(date.getUTCMonth() + 1)
  if (month.length === 1) {
    month = "0" + month
  }
  let day = String(date.getUTCDate())
  if (day.length === 1) {
    day = "0" + day
  }
  const year = String(date.getUTCFullYear())
  return year + '-' + month + '-' + day
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
    const validDate = new Date(finalYear, finalMonth - 1, finalDay);
    finalDateFields = dateToFields(validDate)
  }

  return finalDateFields
}

/**
  When we focus on an input field on a mobile device, the mobile keyboard popups out.
  When that keyboard pops out, it sometimes pushes our input field up, above the view of the screen.
  This code will scroll the input field (and container) back into view.
**/
const fixMobileInputScrolling = (containerRef) => {
  setTimeout(()=>{
    // If input goes offscreen when the mobile keyboard pops up, then scroll it back into view.
    if (containerRef.current.getBoundingClientRect().top < 0) {
      containerRef.current.scrollIntoView()
    }
  },1000)
}

const FilterBox = ({setMenuOpened=null, applyFilter, fromDate, toDate, searchedTerm="", lowerBound, upperBound}) => {
  const intl = useIntl();
  const isDesktop = useDesktopQuery();

  const closeMobileMenu = () => {
    setMenuOpened && setMenuOpened(false)
  }

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
  const [fromDateFields, setFromDateFields] = useReducer(dateFieldsReducer, dateStringToFields(fromDate))
  useEffect(()=>{
    setFromDateFields(dateStringToFields(fromDate))
  }, [fromDate])

  const [toDateFields, setToDateFields] = useReducer(dateFieldsReducer, dateStringToFields(toDate))
  useEffect(()=>{
    setToDateFields(dateStringToFields(toDate))
  }, [toDate])

  const [searchString, setSearchString] = useState(searchedTerm)
  useEffect(()=>{
    setSearchString(searchedTerm)
  }, [searchedTerm])

  const runApplyFilter = () => {
    applyFilter(fieldsToDateString(fromDateFields), fieldsToDateString(toDateFields), searchString)
  }

  const keywordInputContainerRef = useRef()
  const keywordInputRef = useRef()
  const handleKeywordInput = event => {
    if (event.key === "Enter") {
      // If we're on desktop, apply the filter as soon as a user presses "Enter" on the keyword search
      if (isDesktop) {
        runApplyFilter()
      } else {
        // move mobile keyboard away on "Enter"
        // Still need to click "Apply Filter" to apply the filter on mobile
        keywordInputRef.current.blur()
      }
    } else {
      if (searchString.length < maxKeywordLength) {
        setSearchString(event.target.value)
      }
    }
  }

  return (
    <div>
      <div className="coa-filter__box" ref={keywordInputContainerRef}>
        <span className="coa-filter__box-label">{intl.formatMessage(i18n1.keyword)}</span>
        <span className="coa-filter__box-label-description">{intl.formatMessage(i18n1.keywordDescription)}</span>
        <span className="coa-filter__keyword-input-container">
          <i className="material-icons coa-filter__search-icon">search</i>
          <form
            className="coa-filter__keyword-input-form"
            onSubmit={(event)=>{event.preventDefault()}}
          >
            <input
              ref={keywordInputRef}
              onFocus={()=>fixMobileInputScrolling(keywordInputContainerRef)}
              className="coa-filter__keyword-input"
              onChange={handleKeywordInput}
              onKeyPress={handleKeywordInput}
              value={searchString}
            />
          </form>
        </span>
      </div>
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
          onClick={()=>{
            applyFilter(null, null, null)
            closeMobileMenu()
          }}
        >
          {intl.formatMessage(i18n1.clearFilters)}
        </div>
      )}
      <div
        className="coa-filter__apply-button"
        onClick={()=>{
          runApplyFilter()
          closeMobileMenu()
        }}
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
  const setMonth = (event) => setDateFields({month: event.target.value})
  const setDay = (event) => setDateFields({day: event.target.value})
  const yearInputRef = useRef()
  const setYear = (event) => {
    if (event.key === "Enter") {
      // When user enters "year" input, move away the mobile keyboard
      // Still need to click "Apply Filter" to apply the filter on mobile
      yearInputRef.current.blur()
    }
    setDateFields({year: event.target.value})
  }

  const handleDayPickerClick = (date, { selected }) => {
    setOpenDayPicker(false)
    if (selected) {
      // Unselect the day if already selected
      setDateFields({month: '', day: '', year: ''});
      return;
    }
    setDateFields(dateToFields(date))
  }

  const dateFieldContainerRef = useRef()

  return (
    <div ref={dateFieldContainerRef} style={{"marginTop": "1rem"}}>
      <span className="coa-filter__date-fields-label">{label}</span>
      <div className="coa-filter__date-fields">
        <form
          style={{"display": "inherit"}}
          onSubmit={(event)=>{event.preventDefault()}}
        >
          <NumberInput
            label="month"
            value={month}
            onChange={setMonth}
            dateFieldContainerRef={dateFieldContainerRef}
          />
          <NumberInput
            label="day"
            value={day}
            onChange={setDay}
            dateFieldContainerRef={dateFieldContainerRef}
          />
          <NumberInput
            label="year"
            value={year}
            onChange={setYear}
            dateFieldContainerRef={dateFieldContainerRef}
            inputRef={yearInputRef}
          />
        </form>
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

const NumberInput = ({label, value="", onChange, dateFieldContainerRef, inputRef=null}) => {
  const intl = useIntl();
  return (
    <div className="coa-filter__date-input-container">
      <label>
        <span className="coa-filter__date-input-label">{intl.formatMessage(i18n1[label])}</span>
        <input
          ref={inputRef}
          onFocus={()=>fixMobileInputScrolling(dateFieldContainerRef)}
          className={`coa-filter__date-input coa-filter__date-input-${label.toLowerCase()}`}
          type="number"
          value={value}
          onChange={onChange}
          onKeyPress={onChange}
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
