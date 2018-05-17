import { WEEKDAY_MAP } from 'js/helpers/constants';

export const cleanContacts = contacts => {
  if (!contacts || !contacts.edges) return null;

  const dateSeed = 'Oct 18 1982 00:00:00 GMT-0500 (CDT)';

  const getWeekday = day => WEEKDAY_MAP[day.toUpperCase()];

  const getTimestamp = hours => {
    const splitHours = hours.split(':');
    let timestamp = new Date(dateSeed);
    timestamp.setHours(splitHours[0]);
    timestamp.setMinutes(splitHours[1]);
    return timestamp.getTime();
  };

  return contacts.edges.map(({ node: contact }) => {
    // Yes, it's `contact.contact` because of the way the API returns data
    let cleaned = Object.assign({}, contact.contact);

    if (cleaned.phone) {
      cleaned.phone = JSON.parse(cleaned.phone);
    }
    if (cleaned.hours && cleaned.hours.edges) {
      cleaned.hours = cleaned.hours.edges.map(({ node: hours }) => ({
        dayOfWeek: hours.dayOfWeek.toLowerCase(),
        dayOfWeekNumeric: getWeekday(hours.dayOfWeek),
        startTime: getTimestamp(hours.startTime),
        endTime: getTimestamp(hours.endTime),
      }));
    }
    return cleaned;
  });
};

export const cleanRelatedServiceLinks = links => {
  if (!links) return null;

  return links.map(link => {
    return {
      url: `/services/${link.slug}`,
      text: link.title,
    };
  });
};

export const cleanLinks = (links, pathPrefix) => {
  if (!links || !links.edges) return null;

  return links.edges.map(({ node: link }) => {
    const { title, slug, ...rest } = link;
    return {
      url: `${pathPrefix || ''}/${slug}`,
      text: title,
      ...rest,
    };
  });
};

export const clean311 = threeoneone => {
  const { all311 } = threeoneone;

  if (!all311 || !all311.edges) return null;

  return all311.edges.map(({ node: link }) => {
    const { title, url } = link;
    return {
      url: url,
      text: title,
    };
  });
};
