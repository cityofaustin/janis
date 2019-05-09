import { findKey } from 'lodash';
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
      url: `/${link.topic.theme.slug}/${link.topic.slug}/${link.slug}`,
      text: link.title,
    };
  });
};

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

  for (const edge of links.edges) {
    const link = edge.node;

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

              linkCopy.slug = link.slug || link.sortOrder;
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

    // If it's under a department make sure it's there
    if (link.department) {
      pathPrefix = `/${link.department.slug}`;

      link.slug = link.slug || link.sortOrder;
      link.url = `${pathPrefix || ''}/${link.slug}`;
      link.text = link.title;
      cleanedLinks.push(link);
    }
  }

  return cleanedLinks;
};

export const cleanProcesses = allProcesses => {
  if (!allProcesses || !allProcesses.edges) return null;

  let cleanedProcesses = cleanLinks(allProcesses, '/processes');
  cleanedProcesses.map(process => {
    process.contacts = cleanContacts(process.contacts);
    process.processSteps = cleanLinks(process.processSteps, process.url);

    //build step details for overview page
    process.stepDetailGroup = process.processSteps.map(
      ({ title, sortOrder, linkTitle, url, overviewSteps }) => ({
        title: `${sortOrder}. ${title}`,
        link: { text: linkTitle, url: url },
        content: overviewSteps,
      }),
    );

    //build badges for process and processStep pages
    process.badges = process.processSteps.map(
      ({ shortTitle, url, sortOrder }) => ({
        text: shortTitle,
        url: url,
        symbol: sortOrder,
      }),
    );
    process.processSteps.map(processStep => {
      processStep.processTitle = process.title;
      processStep.processUrl = process.url;
      processStep.badges = process.badges;
      processStep.topic = process.topic;
      processStep.contact = process.contact;
    });
  });
  return cleanedProcesses;
};

export const cleanServices = allServices => {
  if (!allServices || !allServices.edges) return null;

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

export const cleanInformationPages = allInformationPages => {
  if (!allInformationPages || !allInformationPages.edges) return null;

  let cleanedInformationPages = cleanLinks(allInformationPages, '/information');
  cleanedInformationPages.map(informationPage => {
    informationPage.contacts = cleanContacts(informationPage.contacts);
  });
  return cleanedInformationPages;
};

export const cleanDepartmentDirectors = directors => {
  if (!directors || !directors.edges) return null;

  return directors.edges.map(({ node: director }) => {
    // Yes, it's `contact.contact` because of the way the API returns data
    let cleaned = Object.assign({}, director);

    return cleaned;
  });
};

export const cleanDepartments = allDepartments => {
  if (!allDepartments || !allDepartments.edges) return null;

  return allDepartments.edges.map(({ node: department }) => {
    department.url = `/departments/${department.slug}`;
    department.text = department.title;
    department.contacts = cleanContacts(department.contacts);
    department.directors = cleanDepartmentDirectors(
      department.departmentDirectors,
    );
    department.relatedLinks = [];
    return department;
  });
};

export const cleanTopics = allTopics => {
  if (!allTopics || !allTopics.edges) return null;

  let cleanedTopics = cleanLinks(allTopics, 'topic');
  return cleanedTopics;
};

export const cleanTopicCollections = allTopicCollections => {
  if (!allTopicCollections || !allTopicCollections.edges) return null;

  let cleanedTopicCollections = cleanLinks(
    allTopicCollections,
    'topiccollection',
  );

  // console.log(cleanedTopicCollections);
  return cleanedTopicCollections;
};

export const cleanThemes = allThemes => {
  if (!allThemes || !allThemes.edges) return null;

  let cleanedThemes = cleanLinks(allThemes, 'theme');
  cleanedThemes.map(theme => {
    theme.topics = cleanTopics(theme.topics);
  });

  return cleanedThemes;
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
