import { findKey } from 'lodash';
import { WEEKDAY_MAP } from 'js/helpers/constants';

export const cleanContacts = contacts => {
  if (!contacts) return null;

  const dateSeed = 'Oct 18 1982 00:00:00 GMT-0500 (CDT)';

  const getWeekday = day => WEEKDAY_MAP[day.toUpperCase()];

  const getTimestamp = hours => {
    const splitHours = hours.split(':');
    let timestamp = new Date(dateSeed);
    timestamp.setHours(splitHours[0]);
    timestamp.setMinutes(splitHours[1]);
    return timestamp.getTime();
  };

  return contacts.map(contact => {
    let cleaned = Object.assign({}, contact);

    if (cleaned.hours) {
      cleaned.hours = cleaned.hours.map(hours => ({
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
  if (!links) return null;

  return links.map(link => {
    const { title, text, slug, ...rest } = link;
    return {
      slug: slug,
      url: `${pathPrefix || ''}/${slug}`,
      text: title || text,
      ...rest,
    };
  });
};

export const cleanServices = allServices => {
  if (!allServices) return null;

  let cleanedServices = cleanLinks(allServices, '/services');
  cleanedServices.map(service => {
    service.contacts = cleanContacts(service.contacts);
    service.related = cleanRelatedServiceLinks(service.related);

    //TODO: mapblock data should include contact data when sent via joplin
    const tempkey = findKey(service.dynamicContent, { type: 'map_block' });
    if (tempkey)
      service.dynamicContent[tempkey].value['contact'] = service.contacts.length
        ? service.contacts[0]
        : null;
  });
  return cleanedServices;
};

export const cleanDepartments = allDepartments => {
  if (!allDepartments) return null;

  return allDepartments.map(department => {
    department.url = `/departments/${department.id}`;
    department.text = department.name;
    department.contacts = cleanContacts(department.contacts);
    return department;
  });
};

export const cleanTopics = allTopics => {
  if (!allTopics) return null;

  let cleanedTopics = cleanLinks(allTopics, '/topics');
  cleanedTopics.map(topic => {
    topic.services = cleanLinks(topic.servicePages, '/services'); //for navigation
    topic.tiles = topic.servicePages; //for theme page
  });
  return cleanedTopics;
};

export const cleanThemes = allThemes => {
  if (!allThemes) return null;

  let cleanedThemes = cleanLinks(allThemes, '/themes');
  cleanedThemes.map(theme => {
    theme.topics = cleanTopics(theme.topics);
  });

  return cleanedThemes;
};

export const cleanNavigation = navigation => {
  const { allThemes } = navigation;

  if (!allThemes) return null;

  let cleanedNavigation = cleanLinks(allThemes, '/themes');
  cleanedNavigation.map(theme => {
    theme.topics = cleanTopics(theme.topics);
  });

  return cleanedNavigation;
};

export const clean311 = threeoneone => {
  const { allThreeOneOnes } = threeoneone;

  if (!allThreeOneOnes) return null;

  return allThreeOneOnes.map(link => {
    const { title, url } = link;
    return {
      url: url,
      text: title,
    };
  });
};
