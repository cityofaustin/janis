import moment from 'moment-timezone';
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

export const cleanContact = contact => {
  const dateSeed = 'Oct 18 1982 00:00:00 GMT-0500 (CDT)';

  // const getWeekday = day => WEEKDAY_MAP[day.toUpperCase()];

  let cleaned = Object.assign({}, contact);

  if (cleaned.locationPage) {
    cleaned.hours = cleanLocationPageHours(cleaned.locationPage);
    if (cleaned.locationPage.physicalCity) {
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
    }

    cleaned.locationPageSlug = cleaned.locationPage.slug;
  }

  // we do !! operations on these to see if we should render the contact info blocks
  // so we can't just have it as an empty object ( !!{} == true ) so let's do a quick
  // check and set it to null if it's an empty object
  // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
  if (Object.keys(cleaned).length === 0 && cleaned.constructor === Object) {
    cleaned = null;
  }

  return cleaned;
};

export const cleanLocation = locations => {
  // with the introduction of virtual events, we no longer can just accept the 
  // first location in the array, since events can have two locations (virtual 
  // plus a physical one)
  let location = {}
  if (locations.length === 1) {
    return locations[0]
  }
  if (locations.length === 2) {
    if (locations[0].locationType === 'virtual_event') {
      location = {...locations[1]};
      location.virtualEvent = locations[0].virtualEvent;
      location.virtualEvent.additionalInformation = locations[0].virtualEvent.additionalInformation;
    } else {
      location = {...locations[0]};
      location.virtualEvent = locations[1].virtualEvent;
      location.virtualEvent.additionalInformation = locations[1].virtualEvent.additionalInformation;
    }
  }
  return location
}

export const cleanLocationPageUrl = janisUrls => {
  if (!!janisUrls.length) {
    return janisUrls[0];
  }
  return '/';
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
      //janisUrl is an array of urls, checks to see if there is length and if so takes the 1st one
      url: cleanLocationPageUrl(edge.node.relatedService.janisUrls),
      phones:
        edge.node.relatedService.contact &&
        edge.node.relatedService.contact.phoneNumbers &&
        edge.node.relatedService.contact.phoneNumbers.edges.map(phoneEdge => {
          return {
            label: phoneEdge.node.phoneDescription,
            number: parsePhoneNumberFromString(
              phoneEdge.node.phoneNumber,
            ).formatNational(),
          };
        }),
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

  locationPage.events = cleanEvents(locationPage.events)

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

              linkCopy.slug = link.slug ;
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

export const cleanInformationForPreview = informationPage => {
  informationPage.contact = cleanContact(informationPage.contact);

  return informationPage;
};

export const cleanDepartmentDirectors = directors => {
  if (!directors || !directors.edges) return null;

  return directors.edges.map(({ node: director }) => {
    let cleaned = Object.assign({}, director);

    return cleaned;
  });
};

export const cleanDepartmentPageLinks = (
  departmentPageLinks,
  departmentSlug,
) => {
  let customTitle = "2021 Annual Report";
  const cleanedLinks = departmentPageLinks
    ? departmentPageLinks.edges.map(edge => {
    let replaceTitle = (edge.node.title === "Office of Police Oversight: 2021 annual report");
    return ({
        id: edge.node.pageId,
        title: replaceTitle ? customTitle : edge.node.title,
        url: `/${departmentSlug}/${edge.node.slug}/`,
      })})
    : [];

  return cleanedLinks;
};

export const cleanDepartmentForPreview = (department, langCode) => {
  if (!department) return null;

  department.url = `/departments/${department.slug}`;
  department.text = department.title;
  department.contact = cleanContact(department.contact);
  department.directors = cleanDepartmentDirectors(
    department.departmentDirectors,
  );
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

export const cleanTopicsForPreview = topic => {
  if (topic.topPages.edges && topic.topPages.edges.length) {
    topic.topLinks = topic.topPages.edges.map(edge => ({
      pageType: edge.node.pageType,
      title: edge.node.title,
      url: `${topic.contextualNavData.parent.url}${edge.node.slug}/`,
    }));
  }

  return topic;
};

export const cleanTopics = allTopics => {
  if (!allTopics || !allTopics.edges) return null;

  let cleanedTopics = cleanLinks(allTopics, 'topic');
  return cleanedTopics;
};

export const cleanTopicCollectionsForPreview = topicCollection => {
  let cleanedTopicCollection = cleanLinks(topicCollection, 'topiccollection');
  return cleanedTopicCollection;
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
  if (fees && fees.edges && fees.edges.length) {
    if (fees.edges.length === 1) {
      return `$${fees.edges[0].node.fee}`;
    }
    let feesArray = [];
    fees.edges.map(f => feesArray.push(f.node.fee));
    return `$${Math.min(...feesArray)}–$${Math.max(...feesArray)}`;
  }
  return '';
};

export const cleanEvents = events => {
  // takes an array of events and creates the event Url, formats the fees and picks first location
  if (!events) return null;

  return events.map(event => {
    return {
      title: event.title,
      description: event.description,
      canceled: event.canceled,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      eventUrl: event.eventUrl ? event.eventUrl : getEventPageUrl(event.slug, event.date),
      feesRange: formatFeesRange(event.fees),
      // until we have support for multiple locations, we're taking the first one
      location: event.locations && event.locations.length ? event.locations[0] : null,
      eventIsFree: event.eventIsFree,
      registrationUrl: event.registrationUrl,
    }
  });
};

export const filterEvents = events => {
  const dateNow = moment()
    .tz('America/Chicago')
    .format('YYYY-MM-DD');

  return events.filter(e => moment(e.date).isSameOrAfter(dateNow)).slice(0, 3);
}

export const cleanOfficialDocumentPageCollections = officialDocumentCollection => {
  let cleanedOfficialDocumentCollection = [];
  if (officialDocumentCollection && officialDocumentCollection.edges) {
    officialDocumentCollection.edges.map(edge => {
      let collection = edge.node.officialDocumentCollection;
      cleanedOfficialDocumentCollection.push({
        title: collection.title,
        url: `/${collection.departments[0].slug}/${collection.slug}`,
      });
    });
  }
  return cleanedOfficialDocumentCollection;
};
