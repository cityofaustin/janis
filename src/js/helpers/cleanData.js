import getPathWithLangCode from 'js/helpers/language';

export const cleanContacts = (contacts) => {

  if(!contacts || !contacts.edges) return null;

  return contacts.edges.map(({node: contact}) => {
    let cleaned = Object.assign(contact.contact);
    if(cleaned.hours && cleaned.hours.edges) {
      cleaned.hours = cleaned.hours.edges.map(({ node: hours }) => hours);
    }
    return cleaned;
  });
};

export const cleanRelatedServiceLinks = (links) => {

  if (!links) return null;

  return links.map((link) => {
    return {
      url: getPathWithLangCode(`/service/${link.slug}`),
      text: link.title
    }
  });
};

export const cleanServiceLinks = (links) => {

  if(!links || !links.edges) return null;

  return links.edges.map(({node: link}) => {
    return {
      url: getPathWithLangCode(`/service/${link.slug}`),
      text: link.title
    }
  });
}
