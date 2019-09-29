import { findKey } from 'lodash';
import filesize from 'filesize';

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

    // quick fix re: phone numbers are current inconsiently entered on the backend
    if (cleaned.phone) {
      try {
        cleaned.phone = JSON.parse(cleaned.phone);
      } catch (error) {
        cleaned.phone = JSON.stringify({ default: cleaned.phone });
      }
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
    if (link.relatedDepartments && link.relatedDepartments.edges.length) {
      for (const edge of link.relatedDepartments.edges) {
        const { relatedDepartment } = edge.node;

        // We need to make copies here so we actually have multiple urls
        let linkCopy = JSON.parse(JSON.stringify(link));

        pathPrefix = `/${relatedDepartment.slug}`;
        linkCopy.slug = link.slug || link.sortOrder; //TODO: I think sort order is an old process page thing, we should clean it up
        linkCopy.url = `${pathPrefix || ''}/${link.slug}`;
        linkCopy.text = link.title;

        linkCopy.department = relatedDepartment;

        cleanedLinks.push(linkCopy);
      }
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

// Let's just do this for now, we'll probably need to make some changes
// when we move to rs7 anyways
export const cleanServicesForPreview = allServices => {
  if (!allServices || !allServices.edges) return null;
  const services = allServices.edges.map(e => e.node);
  let service = services[0];

  service.topic = {
    slug: 'sample-text',
    title: 'Sample Text',
    topiccollection: {
      topics: [],
    },
  };
  service.theme = {};
  service.text = service.title;
  service.contacts = cleanContacts(service.contacts);

  return service;
};

export const cleanInformationPages = allInformationPages => {
  if (!allInformationPages || !allInformationPages.edges) return null;

  let cleanedInformationPages = cleanLinks(allInformationPages, '/information');
  cleanedInformationPages.map(informationPage => {
    informationPage.contacts = cleanContacts(informationPage.contacts);
  });
  return cleanedInformationPages;
};

// Let's just do this for now, we'll probably need to make some changes
// when we move to rs7 anyways
export const cleanInformationForPreview = allInformationPages => {
  if (!allInformationPages || !allInformationPages.edges) return null;
  const infos = allInformationPages.edges.map(e => e.node);
  let info = infos[0];

  info.topic = {
    slug: 'sample-text',
    title: 'Sample Text',
    topiccollection: {
      topics: [],
    },
  };
  info.theme = {};
  info.text = info.title;
  info.contacts = cleanContacts(info.contacts);

  return info;
};

export const cleanDepartmentDirectors = directors => {
  if (!directors || !directors.edges) return null;

  return directors.edges.map(({ node: director }) => {
    // Yes, it's `contact.contact` because of the way the API returns data
    let cleaned = Object.assign({}, director);

    return cleaned;
  });
};

export const cleanDepartmentTopServiceLink = (topService, langCode) => {
  const page =
    topService.servicePage ||
    topService.guidePage ||
    topService.informationPage ||
    topService.officialDocumentPage;

  if (page) {
    // If we have a topic let's make our URL from it
    if (page.topics && page.topics.edges.length) {
      const topic = page.topics.edges[0].node.topic;

      if (
        topic &&
        topic.topiccollections &&
        topic.topiccollections.edges.length
      ) {
        const tc = topic.topiccollections.edges[0].node.topiccollection;

        return {
          title: page.title,
          url: `/${tc.theme.slug}/${tc.slug}/${topic.slug}/${page.slug}`,
          type: !!langCode ? langCode : 'en',
        };
      }
    }

    // If we have a department let's make our URL from it
    if (page.relatedDepartments && page.relatedDepartments.edges.length) {
      const dept = page.relatedDepartments.edges[0].node.relatedDepartment;

      return {
        title: page.title,
        url: `/${dept.slug}/${page.slug}`,
        type: !!langCode ? langCode : 'en',
      };
    }
  }
};

export const cleanDepartmentTopServices = (topServicePages, langCode) => {
  if (!topServicePages || !topServicePages.edges) return null;

  return topServicePages.edges
    .map(({ node: topService }) => {
      let cleaned = cleanDepartmentTopServiceLink(topService, langCode);

      return cleaned;
    })
    .filter(x => typeof x !== 'undefined');
};

export const cleanDepartmentTopServiceIds = topServicePages => {
  if (!topServicePages || !topServicePages.edges) return null;

  return topServicePages.edges
    .map(({ node: topService }) => {
      const page =
        topService.servicePage ||
        topService.guidePage ||
        topService.informationPage ||
        topService.officialDocumentPage;

      if (page) return page.id;
    })
    .filter(x => typeof x !== 'undefined');
};

export const cleanDepartments = (allDepartments, langCode) => {
  if (!allDepartments || !allDepartments.edges) return null;

  return allDepartments.edges.map(({ node: department }) => {
    department.url = `/departments/${department.slug}`;
    department.text = department.title;
    department.contacts = cleanContacts(department.contacts);
    department.directors = cleanDepartmentDirectors(
      department.departmentDirectors,
    );
    department.relatedLinks = [];
    department.topServices = department.topServicePages;
    department.topServices = cleanDepartmentTopServices(
      department.topServicePages,
      langCode,
    );
    department.topServiceIds = cleanDepartmentTopServiceIds(
      department.topServicePages,
    );

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

export const cleanOfficialDocumentPages = allOfficialDocumentPages => {
  if (!allOfficialDocumentPages || !allOfficialDocumentPages.edges) return null;

  let cleanedOfficialDocumentPages = cleanLinks(
    allOfficialDocumentPages,
    'official_document',
  );

  for (let page of cleanedOfficialDocumentPages) {
    if (!page.officialDocuments.edges) continue;
    for (let doc of page.officialDocuments.edges) {
      // If we have a document in wagtail
      // use that info to update the information syncronously
      if (doc.node.document) {
        doc.node.link = `${process.env.CMS_DOCS}/${doc.node.document.filename}`;
        // Maybe there's a better way to handle this but meh for now
        // If it's a pdf, add the size
        if (doc.node.document.filename.slice(-3) === 'pdf') {
          doc.node.pdfSize = filesize(doc.node.document.fileSize).replace(
            ' ',
            '',
          );
        }
      }
    }
  }

  return cleanedOfficialDocumentPages;
};

export const cleanOfficialDocumentPagesForPreview = allOfficialDocumentPages => {
  if (!allOfficialDocumentPages || !allOfficialDocumentPages.edges) return null;

  return allOfficialDocumentPages.edges.map(
    ({ node: officialDocumentPage }) => {
      officialDocumentPage.url = `/official_document/${
        officialDocumentPage.slug
      }`;
      officialDocumentPage.topic = {
        slug: 'sample-topic',
        title: 'Sample Topic',
        topiccollection: {
          topics: [],
        },
      };
      officialDocumentPage.theme = {};
      return officialDocumentPage;
    },
  );
};

export const cleanGuidePages = allGuidePages => {
  if (!allGuidePages || !allGuidePages.edges) return null;
  let cleanedGuidePages = cleanLinks(allGuidePages, 'guide');

  return cleanedGuidePages;
};
