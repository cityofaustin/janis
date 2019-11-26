import { DAYS } from 'js/helpers/constants';

export const getDaysInOrder = () => {
  const today = new Date().getDay();
  const days = DAYS();
  return days.splice(today).concat(days);
}
