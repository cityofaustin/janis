import { findKey } from 'lodash';
import filesize from 'filesize';
import axios from 'axios';
import moment from 'moment-timezone';
import Cookies from 'js-cookie';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { WEEKDAY_MAP } from 'js/helpers/constants';

export const formatTime = time => {
  if (time === '12:00:00') {
    return 'Noon';
  }
  // Simplify time parsing. Times work on previews,
  // but we don't do anything with timezones.
  const momentTime = moment(time, 'HH:mm:ss');

  // Only include minutes in display if there are minutes
  const style = momentTime.minutes() ? 'h:mm a' : 'h a';

  return momentTime.format(style);
};

export const formatTimeLang = (time, noon) => {
  // noon is a localized string that is passed in
  if (time === '12:00:00') {
    return noon;
  }
  const momentTime = moment(time, 'HH:mm:ss');
  // Only include minutes in display if there are minutes
  const style = momentTime.minutes() ? 'h:mm a' : 'h a';

  return momentTime.format(style);
};

// Used for location page hours
// example
// MONDAY: '7:30 am–noon, 1 pm–7 pm',
// TUESDAY: '7:30 am–noon, 1 pm–7 pm',
// WEDNESDAY: '7:30 am–noon, 1 pm–7 pm',
// THURSDAY: '7:30 am–noon, 1 pm–7 pm',
// FRIDAY: '7:30 am–noon, 1 pm–7 pm',
// SATURDAY: 'Closed',
// SUNDAY: 'Closed',
export const formatHours = ({ start1, end1, start2, end2 }) => {
  // If we don't have any start times, we're closed that day
  if (start1 === null && start2 === null) {
    return null;
  }

  // TODO: localize?

  // If we don't have a second start time, just show the first ones
  if (start2 === null) {
    return `${formatTime(start1)}–${formatTime(end1)}`;
  }

  // Since we have 2 start times, show both sets
  return `${formatTime(start1)}–${formatTime(end1)}, ${formatTime(
    start2,
  )}–${formatTime(end2)}`;
};

export const cleanContacts = contacts => {
  if (!contacts || !contacts.edges) return null;

  const dateSeed = 'Oct 18 1982 00:00:00 GMT-0500 (CDT)';

  const getWeekday = day => WEEKDAY_MAP[day.toUpperCase()];

  return contacts.edges.map(({ node: contact }) => {
    // Yes, it's `contact.contact` because of the way the API returns data
    let cleaned = Object.assign({}, contact.contact);

    if (cleaned.locationPage) {
      cleaned.hours = cleanLocationPageHours(cleaned.locationPage);
      cleaned.location = {
        title: cleaned.locationPage.title,
        street: cleaned.locationPage.physicalUnit
          ? `${cleaned.locationPage.physicalStreet} ${
              cleaned.locationPage.physicalUnit
            }`
          : cleaned.locationPage.physicalStreet,
        city: cleaned.locationPage.physicalCity,
        state: cleaned.locationPage.physicalState,
        zip: cleaned.locationPage.physicalZip,
      };

      cleaned.locationPageSlug = cleaned.locationPage.slug;
    }

    return cleaned;
  });
};

export const cleanLocationPageJanisUrl = janisUrl => {
  // quick fix for urls until we get localized urls working in joplin
  return `/${janisUrl.split('/en/')[1]}`;
};

/*
tech debt: this code is used for service hours as well, but the variable definition
implies otherwise, could be a source of bugs

also the best place to shape the data is probably the backend, why do we have to
transform the data from the backend so much here? If so shouldn't we reformat the
data on the backend instead, either in the model or graphql schema?
*/
export const cleanLocationPageHours = locationPage => {
  return {
    MONDAY: formatHours({
      start1: locationPage.mondayStartTime,
      end1: locationPage.mondayEndTime,
      start2: locationPage.mondayStartTime2,
      end2: locationPage.mondayEndTime2,
    }),
    TUESDAY: formatHours({
      start1: locationPage.tuesdayStartTime,
      end1: locationPage.tuesdayEndTime,
      start2: locationPage.tuesdayStartTime2,
      end2: locationPage.tuesdayEndTime2,
    }),
    WEDNESDAY: formatHours({
      start1: locationPage.wednesdayStartTime,
      end1: locationPage.wednesdayEndTime,
      start2: locationPage.wednesdayStartTime2,
      end2: locationPage.wednesdayEndTime2,
    }),
    THURSDAY: formatHours({
      start1: locationPage.thursdayStartTime,
      end1: locationPage.thursdayEndTime,
      start2: locationPage.thursdayStartTime2,
      end2: locationPage.thursdayEndTime2,
    }),
    FRIDAY: formatHours({
      start1: locationPage.fridayStartTime,
      end1: locationPage.fridayEndTime,
      start2: locationPage.fridayStartTime2,
      end2: locationPage.fridayEndTime2,
    }),
    SATURDAY: formatHours({
      start1: locationPage.saturdayStartTime,
      end1: locationPage.saturdayEndTime,
      start2: locationPage.saturdayStartTime2,
      end2: locationPage.saturdayEndTime2,
    }),
    SUNDAY: formatHours({
      start1: locationPage.sundayStartTime,
      end1: locationPage.sundayEndTime,
      start2: locationPage.sundayStartTime2,
      end2: locationPage.sundayEndTime2,
    }),
    exceptions: locationPage.hoursExceptions,
  };
};

export const cleanRelatedServiceLinks = links => {
  if (!links) return null;

  return links.map(link => {
    return {
      url: `/${link.topic.theme.slug}/${link.topic.slug}/${link.slug}`,
      text: link.title,
    };
  });
};

export const cleanLocationPage = locationPage => {
  locationPage.contact = {
    phone: {
      value: locationPage.phoneNumber
        ? parsePhoneNumberFromString(locationPage.phoneNumber).formatNational()
        : '',
      // why do we call PhoneDescripton name here, and label elsewhere?
      // and what was wrong with calling it phone description?
      name: locationPage.phoneDescription,
    },
    email: {
      value: locationPage.email,
      name: 'Email',
    },
  };

  locationPage.gettingHere = {
    buses: [
      locationPage.nearestBus1,
      locationPage.nearestBus2,
      locationPage.nearestBus3,
    ].filter(bus => bus !== null),
  };

  locationPage.hours = cleanLocationPageHours(locationPage);

  locationPage.services = locationPage.relatedServices.edges.map(edge => {
    return {
      hours: cleanLocationPageHours(edge.node),
      title: edge.node.relatedService.title,
      exceptions: edge.node.relatedService.hoursExceptions,
      hoursSameAsLocation: edge.node.hoursSameAsLocation,
      url: cleanLocationPageJanisUrl(edge.node.relatedService.janisUrl),
      phones:
        edge.node.relatedService.contacts.edges.length &&
        edge.node.relatedService.contacts.edges[0].node.contact.phoneNumber.edges.map(
          phoneEdge => {
            return {
              // why do we call phoneDescription label here,
              label: phoneEdge.node.phoneDescription,
              number: parsePhoneNumberFromString(
                phoneEdge.node.phoneNumber,
              ).formatNational(),
            };
          },
        ),
    };
  });

  locationPage.location = {
    'Physical address': {
      street: locationPage.physicalUnit
        ? `${locationPage.physicalStreet} ${locationPage.physicalUnit}`
        : locationPage.physicalStreet,
      city: locationPage.physicalCity,
      state: locationPage.physicalState,
      zip: locationPage.physicalZip,
    },
    'Mailing address': {
      street: locationPage.mailingStreet,
      city: locationPage.mailingCity,
      state: locationPage.mailingState,
      zip: locationPage.mailingZip,
    },
  };

  locationPage.image = locationPage.physicalLocationPhoto;

  return { locationPage: locationPage };
};

/**
  Makes copies of pages for each topic and each department.
**/
export const cleanLinks = (links, pageType) => {
  if (!links || !links.edges) return null;
  let pathPrefix = '';

  // Themes
  if (pageType === 'theme') {
    return links.edges.map(({ node: link }) => {
      link.topics = link.topicCollectionPages.edges.map(e => e.node);
      link.url = `${pathPrefix || ''}/${link.slug}`;
      return link;
    });
  }

  // Topic Collections
  if (pageType === 'topiccollection') {
    return links.edges.map(({ node: link }) => {
      link.topics = [];
      link.url = `${pathPrefix || ''}/${link.slug}`;
      link.text = link.title;

      return link;
    });
  }

  let cleanedLinks = [];

  // Topics
  if (pageType === 'topic') {
    for (const edge of links.edges) {
      const link = edge.node;
      if (link.topiccollections && link.topiccollections.edges.length) {
        for (const edge of link.topiccollections.edges) {
          const { topiccollection } = edge.node;

          link.topLinks = [];
          link.otherLinks = [];
          link.url = `${pathPrefix || ''}/${link.slug}`;
          link.text = link.title;
          link.topiccollection = topiccollection;

          cleanedLinks.push(link);
        }
      }
    }

    return cleanedLinks;
  }

  // The only things that makes it past this point
  // should be the top services for the home page
  for (const edge of links.edges) {
    const link = edge.node;

    // Check for global
    if (link.coaGlobal) {
      link.text = link.title;

      // If we end up with a global page as a top service on the home page
      // this makes sure it doesn't cause the build to break
      link.url = `/${link.slug}`;

      // There's only one URL for these so we can push the link without copying it
      cleanedLinks.push(link);
    }

    // If it's under a topic make it in all the right places
    if (link.topics && link.topics.edges.length) {
      for (const edge of link.topics.edges) {
        const { topic, toplink } = edge.node;

        if (topic.topiccollections && topic.topiccollections.edges.length) {
          for (const edge of topic.topiccollections.edges) {
            const { topiccollection } = edge.node;

            if (topiccollection.theme) {
              // We need to make copies here so we actually have multiple urls
              let linkCopy = JSON.parse(JSON.stringify(link));

              pathPrefix = `/${topiccollection.theme.slug}/${
                topiccollection.slug
              }/${topic.slug}`;

              linkCopy.slug = link.slug || link.sortOrder; //TODO: I think sort order is an old process page thing, we should clean it up
              linkCopy.url = `${pathPrefix || ''}/${link.slug}`;
              linkCopy.text = link.title;

              // Give it all the parts to get back to theme
              linkCopy.topic = topic;
              linkCopy.topiccollection = topiccollection;
              linkCopy.theme = topiccollection.theme;
              linkCopy.toplink = toplink;

              cleanedLinks.push(linkCopy);
            }
          }
        }
      }
    }

    // If it's under any departments make sure it's there
    if (link.departments && link.departments.length) {
      for (const department of link.departments) {
        // We need to make copies here so we actually have multiple urls
        let linkCopy = JSON.parse(JSON.stringify(link));

        pathPrefix = `/${department.slug}`;
        linkCopy.slug = link.slug;
        linkCopy.url = `${pathPrefix}/${link.slug}`;
        linkCopy.text = link.title;

        linkCopy.department = department;

        cleanedLinks.push(linkCopy);
      }
    }
  }

  return cleanedLinks;
};

// Let's just do this for now, we'll probably need to make some changes
// when we move to rs7 anyways
export const cleanInformationForPreview = allInformationPages => {
  if (!allInformationPages || !allInformationPages.edges) return null;
  const infos = allInformationPages.edges.map(e => e.node);
  let info = infos[0];

  info.contextualNavData = getContextualNavForPreview(info);
  info.theme = {};

  info.text = info.title;
  info.contacts = cleanContacts(info.contacts);

  return info;
};

export const cleanGuideForPreview = allGuidePages => {
  if (!allGuidePages || !allGuidePages.edges) return null;
  const guides = allGuidePages.edges.map(e => e.node);
  let guide = guides[0];

  guide.contextualNavData = getContextualNavForPreview(guide);
  const contacts = cleanContacts(guide.contacts);
  if (contacts && contacts.length) {
    guide.contact = contacts[0];
  }

  guide.theme = {};

  return guide;
};

export const cleanDepartmentDirectors = directors => {
  if (!directors || !directors.edges) return null;

  return directors.edges.map(({ node: director }) => {
    // Yes, it's `contact.contact` because of the way the API returns data
    let cleaned = Object.assign({}, director);

    return cleaned;
  });
};

export const cleanDepartmentPageLinks = (
  departmentPageLinks,
  departmentSlug,
) => {
  const cleanedLinks = departmentPageLinks
    ? departmentPageLinks.edges.map(edge => ({
        id: edge.node.pageId,
        title: edge.node.title,
        url: `/${departmentSlug}/${edge.node.slug}/`,
      }))
    : [];

  return cleanedLinks;
};

export const cleanDepartmentForPreview = (department, langCode) => {
  if (!department) return null;

  department.url = `/departments/${department.slug}`;
  department.text = department.title;
  department.contacts = cleanContacts(department.contacts);
  department.directors = cleanDepartmentDirectors(department.departmentDirectors);
  department.topServices = cleanDepartmentPageLinks(
    department.topPages,
    department.slug,
  );
  department.relatedLinks = cleanDepartmentPageLinks(
    department.relatedPages,
    department.slug,
  );

  return department;
};

export const cleanTopicsForPreview = allTopics => {
  if (!allTopics || !allTopics.edges) return null;

  const cleanedTopics = allTopics.edges.map(edge => ({
    text: edge.node.title,
    contextualNavData: {
      relatedTo: [],
      offeredBy: [],
      parent: { title: 'Parent', url: '#' },
    },
    ...edge.node,
  }));

  return cleanedTopics;
};

export const cleanTopics = allTopics => {
  if (!allTopics || !allTopics.edges) return null;

  let cleanedTopics = cleanLinks(allTopics, 'topic');
  return cleanedTopics;
};

export const cleanTopicCollectionsForPreview = allTopicCollections => {
  if (!allTopicCollections || !allTopicCollections.edges) return null;

  let cleanedTopicCollections = cleanLinks(
    allTopicCollections,
    'topiccollection',
  );

  return cleanedTopicCollections;
};

export const cleanNavigation = (navigation, lang) => {
  const { allThemes } = navigation;

  if (!allThemes || !allThemes.edges) return null;

  let title;
  switch (lang) {
    case 'en':
      title = 'Departments';
      break;
    case 'es':
      title = 'Departamentos';
      break;
  }

  let cleanedNavigation = cleanLinks(allThemes, 'theme');
  cleanedNavigation.map(theme => {
    theme.topics = cleanTopics(theme.topics);

    // Add departments page link to menu
    if (theme.slug === 'government-business') {
      theme.topicCollectionPages.edges.push({
        node: {
          url: '/departments',
          title: title,
        },
      });
    }
  });

  return cleanedNavigation;
};

const checkUrl = async url => {
  return await axios({
    method: 'HEAD',
    url: url,
  })
    .then(res => url)
    .catch(error => null);
};

const getWorkingDocumentLink = async filename => {
  // Single source mode, example use case:
  // If we're on PROD, we should only get prod documents
  if (process.env.CMS_DOCS !== 'multiple') {
    return `${process.env.CMS_DOCS}/${filename}`;
  }

  // Multi source mode, let's do some url checking and get something
  // that works. example use case:
  // If we're on STAGING, we want docs imported from PROD to work,
  // as well as any new docs we added when testing on staging
  if (process.env.CMS_DOCS === 'multiple') {
    const docUrls = [
      'https://joplin-austin-gov-static.s3.amazonaws.com/production/media/documents',
      'https://joplin-austin-gov-static.s3.amazonaws.com/staging/media/documents',
    ];

    for (const url of docUrls) {
      const validUrl = await checkUrl(`${url}/${filename}`);
      if (validUrl !== null) {
        return validUrl;
      }
    }
  }
};

export const cleanOfficialDocumentPagesForPreview = allOfficialDocumentPages => {
  if (!allOfficialDocumentPages || !allOfficialDocumentPages.edges) return null;

  return allOfficialDocumentPages.edges.map(
    ({ node: officialDocumentPage }) => {
      officialDocumentPage.url = `/official_document/${
        officialDocumentPage.slug
      }`;

      officialDocumentPage.contextualNavData = getContextualNavForPreview(
        officialDocumentPage,
      );

      officialDocumentPage.theme = {};
      return officialDocumentPage;
    },
  );
};

// Let's just do this for now, we'll probably need to make some changes
// when we move to rs7 anyways
export const cleanFormContainersForPreview = allFormContainers => {
  if (!allFormContainers || !allFormContainers.edges) return null;
  const forms = allFormContainers.edges.map(e => e.node);
  let form = forms[0];

  form.contextualNavData = getContextualNavForPreview(form);
  form.theme = {};
  form.contacts = cleanContacts(form.contacts);

  return form;
};

export const getOfferedByFromDepartments = departments => {
  let offeredBy;

  if (departments && departments.length) {
    offeredBy = departments.map(department => ({
      id: department.id,
      title: department.title,
      url: `/${department.slug}/`,
    }));
  } else {
    offeredBy = [];
  }

  return offeredBy;
};

export const getEventPageUrl = (slug, date) => {
  let year = moment(date, 'YYYY-MM-DD').format('YYYY');
  let month = moment(date, 'YYYY-MM-DD').format('M');
  let day = moment(date, 'YYYY-MM-DD').format('D');
  // use moment to get the date
  // function to format the event's page url, used in the Event List
  let eventUrl = `/event/${year}/${month}/${day}/${slug}/`;

  return eventUrl;
};

export const formatFeesRange = fees => {
  // on the Event List View, show a range of fees, from the least to the most
  if (fees.edges && fees.edges.length) {
    if (fees.edges.length === 1) {
      return `$${fees.edges[0].node.fee}`;
    }
    let feesArray = [];
    fees.edges.map(f => feesArray.push(f.node.fee));
    return `$${Math.min(...feesArray)}–$${Math.max(...feesArray)}`;
  }
  return '';
};
