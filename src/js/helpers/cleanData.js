import { getPathWithLangCode } from 'js/helpers/language';
import moment from 'moment';

export const cleanContacts = (contacts) => {

  if(!contacts || !contacts.edges) return null;

  return contacts.edges.map(({node: contact}) => {
    let cleaned = Object.assign(contact.contact);
    if(cleaned.hours && cleaned.hours.edges) {
      cleaned.hours = cleaned.hours.edges.map(({ node: hours }) => {
        hours.startTime = moment(hours.startTime, "HH:mm:ss").format('h:mm A');
        hours.endTime = moment(hours.endTime, "HH:mm:ss").format('h:mm A');
        let dayMoment = moment(hours.dayOfWeek, 'dddd');
        hours.dayOfWeek = dayMoment.format('dddd');
        hours.day = dayMoment.format('E');

        return hours;
      });
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
