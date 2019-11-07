import { findKey } from 'lodash';
import filesize from 'filesize';
import axios from 'axios';
import moment from 'moment-timezone';

import { WEEKDAY_MAP } from 'js/helpers/constants';

export const cleanContacts = contacts => {
  if (!contacts || !contacts.edges) return null;

  const dateSeed = 'Oct 18 1982 00:00:00 GMT-0500 (CDT)';

  const getWeekday = day => WEEKDAY_MAP[day.toUpperCase()];

  const formatTime = time => {
    // Simplify time parsing. Times work on previews,
    // but we don't do anything with timezones.
    const momentTime = moment(time, 'HH:mm:ss');

    // Only include minutes in display if there are minutes
    const style = momentTime.minutes() ? 'h:mma' : 'ha';

    return momentTime.format(style);
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
        startTime: formatTime(hours.startTime),
        endTime: formatTime(hours.endTime),
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

    // Check for global
    if (link.coaGlobal) {
      link.text = link.title;

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

// Let's just do this for now, we'll probably need to make some changes
// when we move to rs7 anyways
export const cleanServicesForPreview = allServices => {
  if (!allServices || !allServices.edges) return null;
  const services = allServices.edges.map(e => e.node);
  let service = services[0];

  service.contextualNavData = getContextualNavForPreview(service);

  service.text = service.title;
  service.contacts = cleanContacts(service.contacts);

  return service;
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

const getContextualNavForPreview = page => {
  let contextualNavData = {
    relatedTo: [],
    offeredBy: [],
  };

  // If we don't have a topic, return a fake
  // topic describing that
  if (!page.topics || !page.topics.edges || !page.topics.edges.length) {
    contextualNavData.parent = {
      url: 'no-topics',
      title: 'No topics selected',
      topiccollection: {
        topics: [],
      },
    };
  } else {
    // If we have topics,
    // get info from the first one
    contextualNavData.parent = {
      url: page.topics.edges[0].node.topic.slug,
      title: page.topics.edges[0].node.topic.title,
      topiccollection: {
        topics: [],
      },
    };
  }

  return contextualNavData;
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
    department.topServices = department.topPages;
    department.topServices = cleanDepartmentTopServices(
      department.topPages,
      langCode,
    );
    department.relatedLinks = department.relatedPages;
    department.relatedLinks = cleanDepartmentTopServices(
      department.relatedPages,
      langCode,
    );
    department.topServiceIds = cleanDepartmentTopServiceIds(
      department.topServicePages,
    );

    return department;
  });
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

export const cleanTopicCollections = allTopicCollections => {
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

export const cleanOfficialDocumentPages = async allOfficialDocumentPages => {
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
        doc.node.link = await getWorkingDocumentLink(
          doc.node.document.filename,
        );

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

      officialDocumentPage.contextualNavData = getContextualNavForPreview(
        officialDocumentPage,
      );

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

export const cleanFormPages = allFormPages => {
  if (!allFormPages || !allFormPages.edges) return null;
  return cleanLinks(allFormPages, 'form');
};

// Let's just do this for now, we'll probably need to make some changes
// when we move to rs7 anyways
export const cleanFormPagesForPreview = allFormPages => {
  if (!allFormPages || !allFormPages.edges) return null;
  const forms = allFormPages.edges.map(e => e.node);
  let form = forms[0];

  form.contextualNavData = getContextualNavForPreview(form);
  form.theme = {};
  form.contacts = cleanContacts(form.contacts);

  return form;
};
