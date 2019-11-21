import { SUPPORTED_LANG_CODES } from 'js/i18n/constants';
import { createGraphQLClientsByLang } from 'js/helpers/fetchData';

import filesize from 'filesize';
import axios from 'axios';

// TODO: clean these up/remove them
import allThemesQuery from 'js/queries/allThemesQuery';
import topServicesQuery from 'js/queries/topServicesQuery';
// import all311Query from 'js/queries/all311Query';

// Shiny ✨ new queries!
import siteStructureQuery from 'js/queries/siteStructureQuery';
import getTopicCollectionPageQuery from 'js/queries/getTopicCollectionPageQuery';
import getTopicPageQuery from 'js/queries/getTopicPageQuery';
import getInformationPageQuery from 'js/queries/getInformationPageQuery';
import getServicePageQuery from 'js/queries/getServicePageQuery';
import getDepartmentPageQuery from 'js/queries/getDepartmentPageQuery';
import getOfficialDocumentPageQuery from 'js/queries/getOfficialDocumentPageQuery';
import getGuidePageQuery from 'js/queries/getGuidePageQuery';
import getContextualNavTopicDataQuery from 'js/queries/getContextualNavTopicDataQuery';
import getContextualNavDepartmentDataQuery from 'js/queries/getContextualNavDepartmentDataQuery';
import getDepartmentsPageQuery from 'js/queries/getDepartmentsPageQuery';
import getFormPageQuery from 'js/queries/getFormPageQuery';

import {
  cleanNavigation,
  cleanContacts,
  cleanLinks,
  cleanDepartmentDirectors,
} from 'js/helpers/cleanData';

const getAllTopicLinks = (
  allServicePageTopics,
  allInformationPageTopics,
  allOfficialDocumentPageTopics,
  allGuidePageTopics,
  allFormPageTopics,
) => {
  // I don't like this but we still need to do some logic here
  // to get all the pages
  let allLinks = [];
  if (allServicePageTopics && allServicePageTopics.edges) {
    for (const edge of allServicePageTopics.edges) {
      if (edge.node) {
        allLinks.push(edge.node.page);
      }
    }
  }

  if (allInformationPageTopics && allInformationPageTopics.edges) {
    for (const edge of allInformationPageTopics.edges) {
      if (edge.node) {
        allLinks.push(edge.node.page);
      }
    }
  }

  if (allOfficialDocumentPageTopics && allOfficialDocumentPageTopics.edges) {
    for (const edge of allOfficialDocumentPageTopics.edges) {
      if (edge.node) {
        allLinks.push(edge.node.page);
      }
    }
  }

  if (allGuidePageTopics && allGuidePageTopics.edges) {
    for (const edge of allGuidePageTopics.edges) {
      if (edge.node) {
        allLinks.push(edge.node.page);
      }
    }
  }

  if (allFormPageTopics && allFormPageTopics.edges) {
    for (const edge of allFormPageTopics.edges) {
      if (edge.node) {
        allLinks.push(edge.node.page);
      }
    }
  }

  return allLinks;
};

const getTopicPageData = async (id, parent_topic_collection, client) => {
  const {
    allTopics,
    allTopicCollections,
    allTopicPageTopicCollections,
    allGuidePageTopics,
    allInformationPageTopics,
    allOfficialDocumentPageTopics,
    allServicePageTopics,
    allFormPageTopics,
  } = await client.request(getTopicPageQuery, {
    id: id,
    tc_id: parent_topic_collection,
  });

  let topic = allTopics.edges[0].node;

  // we need to get info for the contextual nav,
  // this is different for topic pages so we'll just do it here instead of using
  // getContextualNavData
  topic.contextualNavData = {};
  if (
    allTopicCollections &&
    allTopicCollections.edges.length &&
    allTopicCollections.edges[0].node.theme
  ) {
    topic.contextualNavData.parent = {
      id: allTopicCollections.edges[0].node.id,
      title: allTopicCollections.edges[0].node.title,
      url: `/${allTopicCollections.edges[0].node.theme.slug}/${
        allTopicCollections.edges[0].node.slug
      }/`,
    };

    if (allTopicPageTopicCollections && allTopicPageTopicCollections.edges) {
      topic.contextualNavData.relatedTo = allTopicPageTopicCollections.edges
        .filter(edge => edge.node && edge.node.page.id !== id)
        .map(edge => ({
          id: edge.node.page.id,
          title: edge.node.page.title,
          url: `/${allTopicCollections.edges[0].node.theme.slug}/${
            allTopicCollections.edges[0].node.slug
          }/${edge.node.page.slug}/`,
        }));
    }
  }

  // we also need to get information about the top links
  const topLinkIds = topic.topPages.edges.map(edge => edge.node.pageId);
  topic.topLinks = topic.topPages.edges.map(edge => ({
    pageType: edge.node.pageType,
    title: edge.node.title,
    url: `/${allTopicCollections.edges[0].node.theme.slug}/${
      allTopicCollections.edges[0].node.slug
    }/${topic.slug}/${edge.node.slug}/`,
  }));

  // and others
  topic.otherLinks = getAllTopicLinks(
    allServicePageTopics,
    allInformationPageTopics,
    allOfficialDocumentPageTopics,
    allGuidePageTopics,
    allFormPageTopics,
  )
    .filter(page => !topLinkIds.includes(page.id))
    .map(page => ({
      pageType: page.pageType,
      title: page.title,
      url: `/${allTopicCollections.edges[0].node.theme.slug}/${
        allTopicCollections.edges[0].node.slug
      }/${topic.slug}/${page.slug}`,
    }));

  return { topic: topic };
};

const getDepartmentPageData = async (id, client) => {
  const { allDepartmentPages } = await client.request(getDepartmentPageQuery, {
    id: id,
  });

  let department = allDepartmentPages.edges[0].node;
  department.topServices = department.topPages
    ? department.topPages.edges.map(edge => ({
        id: edge.node.pageId,
        title: edge.node.title,
        url: `/${department.slug}/${edge.node.slug}/`,
      }))
    : [];

  department.relatedLinks = department.relatedPages
    ? department.relatedPages.edges.map(edge => ({
        id: edge.node.pageId,
        title: edge.node.title,
        url: `/${department.slug}/${edge.node.slug}/`,
      }))
    : [];

  // keeping this logic in there for now, stuff is kinda messy
  department.contacts = cleanContacts(department.contacts);
  department.directors = cleanDepartmentDirectors(
    department.departmentDirectors,
  );

  return { department: department };
};

const getTopicCollectionPageData = async (id, client) => {
  const {
    allTopicCollections,
    allTopicPageTopicCollections,
  } = await client.request(getTopicCollectionPageQuery, { id: id });

  let topicCollection = allTopicCollections.edges[0].node;
  topicCollection.topics = allTopicPageTopicCollections.edges.map(edge => ({
    title: edge.node.page.title,
    description: edge.node.page.description,
    slug: edge.node.page.slug,
    topiccollection: {
      slug: topicCollection.slug,
      theme: {
        slug: topicCollection.theme.slug,
      },
    },
    pages: edge.node.page.topPages.edges.map(topPageEdge => ({
      pageType: topPageEdge.node.pageType,
      title: topPageEdge.node.title,
      url: `/${topicCollection.theme.slug}/${topicCollection.slug}/${
        edge.node.page.slug
      }/${topPageEdge.node.slug}/`,
    })),
  }));

  return { tc: topicCollection };
};

const getContextualNavData = async (
  parent_department,
  parent_topic,
  grandparent_topic_collection,
  relatedDepartments,
  client,
) => {
  let contextualNavData = {};

  const { allTopics, allTopicPageTopicCollections, allTopicCollections } =
    parent_topic && grandparent_topic_collection
      ? await client.request(getContextualNavTopicDataQuery, {
          parent_topic: parent_topic,
          grandparent_topic_collection: grandparent_topic_collection,
        })
      : {
          allTopics: null,
          allTopicPageTopicCollections: null,
          allTopicCollections: null,
        };

  const { allDepartmentPages } = parent_department
    ? await client.request(getContextualNavDepartmentDataQuery, {
        parent_department: parent_department,
      })
    : { allDepartmentPages: null };

  // get parent
  if (
    parent_topic &&
    grandparent_topic_collection &&
    allTopics &&
    allTopics.edges.length &&
    allTopicCollections &&
    allTopicCollections.edges.length &&
    allTopicCollections.edges[0].node.theme
  ) {
    contextualNavData.parent = {
      id: allTopics.edges[0].node.id,
      title: allTopics.edges[0].node.title,
      url: `/${allTopicCollections.edges[0].node.theme.slug}/${
        allTopicCollections.edges[0].node.slug
      }/${allTopics.edges[0].node.slug}/`,
    };
  }

  if (
    parent_department &&
    allDepartmentPages &&
    allDepartmentPages.edges.length
  ) {
    contextualNavData.parent = {
      id: allDepartmentPages.edges[0].node.id,
      title: allDepartmentPages.edges[0].node.title,
      url: `/${allDepartmentPages.edges[0].node.slug}/`,
    };
  }

  // get related to
  if (
    parent_topic &&
    grandparent_topic_collection &&
    allTopicPageTopicCollections &&
    allTopicPageTopicCollections.edges.length &&
    allTopicCollections &&
    allTopicCollections.edges.length &&
    allTopicCollections.edges[0].node.theme
  ) {
    contextualNavData.relatedTo = allTopicPageTopicCollections.edges
      .filter(edge => edge.node && edge.node.page.id !== parent_topic)
      .map(edge => ({
        id: edge.node.page.id,
        title: edge.node.page.title,
        url: `/${allTopicCollections.edges[0].node.theme.slug}/${
          allTopicCollections.edges[0].node.slug
        }/${edge.node.page.slug}/`,
      }));
  } else {
    contextualNavData.relatedTo = [];
  }

  // get offered by
  if (relatedDepartments && relatedDepartments.edges.length) {
    contextualNavData.offeredBy = relatedDepartments.edges.map(edge => ({
      id: edge.node.relatedDepartment.id,
      title: edge.node.relatedDepartment.title,
      url: `/${edge.node.relatedDepartment.slug}/`,
    }));
  } else {
    contextualNavData.offeredBy = [];
  }

  return contextualNavData;
};

const getServicePageData = async (
  id,
  parent_department,
  parent_topic,
  grandparent_topic_collection,
  client,
) => {
  const { allServicePages } = await client.request(getServicePageQuery, {
    id: id,
  });

  let service = allServicePages.edges[0].node;

  // keeping this logic in there for now, stuff is kinda messy
  service.contacts = cleanContacts(service.contacts);

  service.contextualNavData = await getContextualNavData(
    parent_department,
    parent_topic,
    grandparent_topic_collection,
    service.relatedDepartments,
    client,
  );

  return { service: service };
};

const getInformationPageData = async (
  id,
  parent_department,
  parent_topic,
  grandparent_topic_collection,
  client,
) => {
  const { allInformationPages } = await client.request(
    getInformationPageQuery,
    { id: id },
  );

  let informationPage = allInformationPages.edges[0].node;

  // keeping this logic in there for now, stuff is kinda messy
  informationPage.contacts = cleanContacts(informationPage.contacts);

  informationPage.contextualNavData = await getContextualNavData(
    parent_department,
    parent_topic,
    grandparent_topic_collection,
    informationPage.relatedDepartments,
    client,
  );

  return { informationPage: informationPage };
};

const getGuidePageData = async (
  id,
  parent_department,
  parent_topic,
  grandparent_topic_collection,
  client,
) => {
  const { allGuidePages } = await client.request(getGuidePageQuery, {
    id: id,
  });

  let guidePage = allGuidePages.edges[0].node;

  // keeping this logic in there for now, stuff is kinda messy
  let contacts = cleanContacts(guidePage.contacts);

  // Guide pages only support single contacts for now
  if (contacts && contacts.length) {
    guidePage.contact = contacts[0];
  }

  guidePage.contextualNavData = await getContextualNavData(
    parent_department,
    parent_topic,
    grandparent_topic_collection,
    guidePage.relatedDepartments,
    client,
  );

  return { guidePage: guidePage };
};

const getFormPageData = async (
  id,
  parent_department,
  parent_topic,
  grandparent_topic_collection,
  client,
) => {
  const { allFormPages } = await client.request(getFormPageQuery, { id: id });

  let formPage = allFormPages.edges[0].node;

  formPage.contextualNavData = await getContextualNavData(
    parent_department,
    parent_topic,
    grandparent_topic_collection,
    formPage.relatedDepartments,
    client,
  );

  return { formPage: formPage };
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

const getOfficialDocumentPageData = async (
  id,
  parent_department,
  parent_topic,
  grandparent_topic_collection,
  client,
) => {
  const { allOfficialDocumentPages } = await client.request(
    getOfficialDocumentPageQuery,
    {
      id: id,
    },
  );

  let officialDocumentPage = allOfficialDocumentPages.edges[0].node;

  officialDocumentPage.contextualNavData = await getContextualNavData(
    parent_department,
    parent_topic,
    grandparent_topic_collection,
    officialDocumentPage.relatedDepartments,
    client,
  );

  for (let doc of officialDocumentPage.officialDocuments.edges) {
    // If we have a document in wagtail
    // use that info to update the information syncronously
    if (doc.node.document) {
      doc.node.link = await getWorkingDocumentLink(doc.node.document.filename);

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

  return { officialDocumentPage: officialDocumentPage };
};

const getDepartmentsPageData = async client => {
  const { allDepartmentPages } = await client.request(getDepartmentsPageQuery);

  const departments = allDepartmentPages.edges.map(edge => ({
    title: edge.node.title,
    url: `/${edge.node.slug}/`,
  }));

  return { departments: departments };
};

const buildPageAtUrl = async (pageAtUrlInfo, client) => {
  const {
    url,
    type,
    id,
    parent_department,
    parent_topic,
    parent_topic_collection,
    grandparent_topic_collection,
  } = pageAtUrlInfo;

  // If we're a department page, we need to make sure our top services/related info works
  if (type === 'department') {
    return {
      path: url,
      template: 'src/components/Pages/Department',
      getData: () => getDepartmentPageData(id, client),
    };
  }

  // If we are a topic collection page, we need to use a query to get information about
  // our child topics and their top pages
  // (this might be able to move to the end with the "just run a query without extra vars" part)
  if (type === 'topic collection') {
    return {
      path: url,
      template: 'src/components/Pages/TopicCollection',
      getData: () => getTopicCollectionPageData(id, client),
    };
  }

  // If we are a topic page, we need a parent topic collection id
  if (type === 'topic' && parent_topic_collection) {
    return {
      path: url,
      template: 'src/components/Pages/Topic',
      getData: () => getTopicPageData(id, parent_topic_collection, client),
    };
  }

  // If we're a service page
  if (type === 'service page') {
    return {
      path: url,
      template: 'src/components/Pages/Service',
      getData: () =>
        getServicePageData(
          id,
          parent_department,
          parent_topic,
          grandparent_topic_collection,
          client,
        ),
    };
  }

  // If we're an information page
  if (type === 'information page') {
    return {
      path: url,
      template: 'src/components/Pages/Information',
      getData: () =>
        getInformationPageData(
          id,
          parent_department,
          parent_topic,
          grandparent_topic_collection,
          client,
        ),
    };
  }

  // If we're a guide page
  if (type === 'guide page') {
    return {
      path: url,
      template: 'src/components/Pages/Guide',
      getData: () =>
        getGuidePageData(
          id,
          parent_department,
          parent_topic,
          grandparent_topic_collection,
          client,
        ),
    };
  }

  // If we're an official docs page
  if (type === 'official document page') {
    return {
      path: url,
      template: 'src/components/Pages/OfficialDocumentList',
      getData: () =>
        getOfficialDocumentPageData(
          id,
          parent_department,
          parent_topic,
          grandparent_topic_collection,
          client,
        ),
    };
  }

  // If we're the departments page
  if (type === 'departments') {
    return {
      path: url,
      template: 'src/components/Pages/Departments',
      getData: () => getDepartmentsPageData(client),
    };
  }

  // If we're a form page
  if (type === 'form page') {
    return {
      path: url,
      template: 'src/components/Pages/Form',
      getData: () =>
        getFormPageData(
          id,
          parent_department,
          parent_topic,
          grandparent_topic_collection,
          client,
        ),
    };
  }
};

const makeAllPages = async (langCode, incrementalPageId) => {
  if (incrementalPageId) {
    console.log("Looks like we're trying to do an incremental build!");
  }

  const path = `/${!!langCode ? langCode : ''}`;
  console.log(`- Building routes for ${path}...`);

  const client = createGraphQLClientsByLang(langCode);

  const siteStructure = await client.request(siteStructureQuery);
  let parsedStructure = JSON.parse(siteStructure.siteStructure.structureJson);

  // Doing this in a super naive way, let's just rebuild the page itself
  // this should probably happen in joplin but let's just filter for now
  if (incrementalPageId) {
    parsedStructure = parsedStructure.filter(
      paui => paui.id === incrementalPageId,
    );

    for (const pageAtUrlInfo of parsedStructure) {
      console.log(pageAtUrlInfo.id);
    }
  }

  // We probably have some work to do around the documents page
  // but for now let's just add it in here
  parsedStructure.push({
    url: `/departments/`,
    type: `departments`,
  });

  const allPages = await Promise.all(
    parsedStructure.map(pageAtUrlInfo => buildPageAtUrl(pageAtUrlInfo, client)),
  );

  const data = {
    path: path,
    template: 'src/components/Pages/Home',
    children: allPages,
    getData: async () => {
      const { allServicePages } = await client.request(topServicesQuery);
      let services = cleanLinks(allServicePages, 'service');

      // Make sure we don't have any dupes in top services
      services = services.filter(
        (service, index) =>
          index === services.findIndex(s => s.id === service.id),
      );

      const topServices = services.map(s => ({
        type: !!langCode ? langCode : 'en',
        url: s.url,
        title: s.title,
      }));

      return {
        topServices,
        image: {
          file: 'tomek-baginski-593896-unsplash',
          title: 'Lady Bird Lake',
        },
      };
    },
  };

  return data;
};

export default {
  // siteRoot: 'https://alpha.austin.gov',
  //basePath // Do not alter this line if you want a working PR
  basePath: process.env.BASE_PATH_PR ? process.env.BASE_PATH_PR : '/',
  stagingSiteRoot: 'https://janis-staging.herokuapp.com/',
  getSiteProps: () => ({
    title: 'City of Austin',
  }),
  getSiteData: async () => {
    const queries = [
      {
        query: allThemesQuery,
        dataKey: 'navigation',
        middleware: cleanNavigation,
      },
    ];
    const requests = [];
    const data = {};
    SUPPORTED_LANG_CODES.map(langCode => {
      const client = createGraphQLClientsByLang(langCode);
      queries.map(query => {
        requests.push(client.request(query.query));
        data[query.dataKey] = data[query.dataKey] || {};
        data[query.dataKey][langCode] = null;
      });
    });

    (await Promise.all(requests)).forEach((response, i) => {
      const queryIndex = i % queries.length;
      const langIndex = (i - queryIndex) / queries.length;
      data[queries[queryIndex].dataKey][SUPPORTED_LANG_CODES[langIndex]] =
        typeof queries[queryIndex].middleware === 'function'
          ? queries[queryIndex].middleware(
              response,
              SUPPORTED_LANG_CODES[langIndex],
            )
          : response;
    });

    return data;
  },
  getRoutes: async ({ incremental }) => {
    let incrementalPageId = null;

    if (incremental) {
      // TODO: Make sure we have an id of the page that was updated
      incrementalPageId = process.env.PAGE_ID;
      console.log(
        `Incrementally rebuilding page with id: ${incrementalPageId}`,
      );
    }

    const routes = [
      {
        path: '/search',
        template: 'src/components/Pages/Search', //TODO: update search page to be conscious of all languages
      },
      {
        path: '404',
        template: 'src/components/Pages/404', //TODO: update 404 page to be conscious of all languages
      },
    ];

    const allLangs = Array.from(SUPPORTED_LANG_CODES);
    allLangs.unshift(undefined);
    const translatedRoutes = await Promise.all(
      allLangs.map(langCode => makeAllPages(langCode, incrementalPageId)),
    );
    const allRoutes = routes.concat(translatedRoutes);

    return allRoutes;
  },
  webpack: (config, { stage }) => {
    // Include babel poyfill for IE 11 and below
    // https://github.com/nozzle/react-static/blob/811ebe1b5a5b8e24fffec99fcdb3375818383711/docs/concepts.md#browser-support
    if (stage === 'prod') {
      config.entry = ['babel-polyfill', config.entry];
    } else if (stage === 'dev') {
      config.entry = ['babel-polyfill', ...config.entry];
    }
    return config;
  },
  plugins: ['react-static-plugin-react-router'],
};
