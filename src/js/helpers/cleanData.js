export const cleanContacts = (contacts) => {

  if(!contacts || !contacts.edges) return null;

  const dateSeed = 'Oct 18 1982 00:00:00 GMT-0500 (CDT)';

  const weekdayMap = {
    "SUNDAY":   0,
    "MONDAY":   1,
    "TUESDAY":  2,
    "WEDNESDAY":3,
    "THURSDAY": 4,
    "FRIDAY":   5,
    "SATURDAY": 6,
  };

  const getWeekday = (day) => (weekdayMap[day]);

  const getTimestamp = (hours) => {
    const splitHours = hours.split(':');
    let timestamp = new Date(dateSeed);
    timestamp.setHours(splitHours[0]);
    timestamp.setMinutes(splitHours[1]);
    return timestamp.getTime();
  };

  return contacts.edges.map(({node: contact}) => {
    let {contact: cleaned} = contact;
    if(cleaned.hours && cleaned.hours.edges) {
      cleaned.hours = cleaned.hours.edges.map(({ node: hours }) => ({
        dayOfWeek: hours.dayOfWeek,
        dayOfWeekNumeric: getWeekday(hours.dayOfWeek),
        startTime: getTimestamp(hours.startTime),
        endTime: getTimestamp(hours.endTime),
      }));
    }
    return cleaned;
  });
};

export const cleanRelatedServiceLinks = (links) => {

  if (!links) return null;

  return links.map((link) => {
    return {
      url: `/services/${link.slug}`,
      text: link.title
    }
  });
};

export const cleanServiceLinks = (links) => {

  if(!links || !links.edges) return null;

  return links.edges.map(({node: link}) => {
    return {
      url: `/services/${link.slug}`,
      text: link.title
    }
  });
}
