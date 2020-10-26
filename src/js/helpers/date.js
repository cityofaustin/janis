import { DAYS } from 'js/helpers/constants';

export const getDaysInOrder = () => {
  const today = new Date().getDay();
  const days = DAYS();
  return days.splice(today).concat(days);
}

/**
  We're using this function because:
  "Parsing of date strings with the Date constructor... is strongly discouraged due to browser differences and inconsistencies."
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date

  So we convert a dateString from pagesArray "YYYY-MM-DD" into a valid Date.
  new Date("YYYY-MM-DD") will not work consistently but
  new Date("YYYY", "MM"-1, "DD") will work properly.
**/
export const createDateFromString = (dateString) => {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-")
  return new Date(year, month-1, day)
}
