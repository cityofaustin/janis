import { SUPPORTED_LANG_CODES } from 'js/i18n/constants';
import { createGraphQLClientsByLang } from 'js/helpers/fetchData';

import filesize from 'filesize';
import axios from 'axios';
import moment from 'moment-timezone';

import allThemesQuery from 'js/queries/allThemesQuery';
import topServicesQuery from 'js/queries/topServicesQuery';

// Shinier ✨✨ new queries!
import allPagesQuery from 'js/queries/allPagesQuery';
import getTopicCollectionTopicQuery from 'js/queries/getTopicCollectionTopicQuery';
import getTopicPageAdditionalData from 'js/queries/getTopicPageAdditionalData';
import getPageUrlQuery from 'js/queries/getPageUrl';

// Shiny ✨ new queries!
import getDepartmentsPageQuery from 'js/queries/getDepartmentsPageQuery';
import getAllGuidePagesSectionsQuery from 'js/queries/getAllGuidePagesSectionsQuery';
import getEventPageQuery from 'js/queries/getEventPageQuery';

import {
  cleanNavigation,
  cleanContact,
  cleanLinks,
  cleanDepartmentDirectors,
  cleanDepartmentPageLinks,
  cleanLocationPage,
  getOfferedByFromDepartments,
  getEventPageUrl,
  formatFeesRange,
  cleanEvents
} from 'js/helpers/cleanData';

const getRelatedTo = async (parent, grandparent, client) => {
  let relatedTo = [];

  const { topicCollectionTopics } = await client.request(
    getTopicCollectionTopicQuery,
    {
      id: grandparent.id,
    },
  );

  if (topicCollectionTopics && topicCollectionTopics.edges.length) {
    relatedTo = topicCollectionTopics.edges
      .filter(
        edge =>
          edge.node &&
          edge.node.page.topicpage.id !== parent.id &&
          edge.node.page.topicpage.live,
      )
      .map(edge => ({
        id: edge.node.page.topicpage.id,
        title: edge.node.page.topicpage.title,
        url: `${grandparent.url}${edge.node.page.topicpage.slug}/`,
      }));
  }

  return relatedTo;
};

const getTopicPageData = async (topicPage, instance, client) => {
  const { topicCollectionTopics, basePageTopics } = await client.request(
    getTopicPageAdditionalData,
    {
      tc_id: instance.parent.id,
      topic_id: topicPage.id,
    },
  );

  topicPage.contextualNavData = {};
  if (instance && instance.parent) {
    topicPage.contextualNavData.parent = instance.parent;

    if (topicCollectionTopics && topicCollectionTopics.edges) {
      topicPage.contextualNavData.relatedTo = topicCollectionTopics.edges
        .filter(
          edge =>
            edge.node &&
            edge.node.page.topicpage.id !== topicPage.id && // remove duplicates
            edge.node.page.topicpage.live, // and only include live
        )
        .map(edge => ({
          id: edge.node.page.topicpage.id,
          title: edge.node.page.topicpage.title,
          url: `${instance.parent.url}/${edge.node.page.topicpage.slug}/`,
        }));
    }
  }

  // we also need to get information about the top links
  if (topicPage.topPages.edges && topicPage.topPages.edges.length) {
    topicPage.topLinks = topicPage.topPages.edges.map(edge => ({
      pageType: edge.node.pageType,
      title: edge.node.title,
      url: `${instance.url}${edge.node.slug}/`,
    }));
  } else {
    topicPage.topLinks = [];
  }

  // and others
  if (basePageTopics.edges && basePageTopics.edges.length) {
    const topLinkIds = topicPage.topPages.edges
      ? topicPage.topPages.edges.map(edge => edge.node.pageId)
      : [];
    topicPage.otherLinks = basePageTopics.edges
      .filter(
        node => !topLinkIds.includes(node.node.pageId) && node.node.page.live,
      )
      .map(node => {
        let page = node.node.page;
        return {
          pageType: page.pageType,
          title: page.title,
          url: `${instance.url}${page.slug}`,
        };
      });
  } else {
    topicPage.otherLinks = [];
  }

  return { topic: topicPage };
};

const cleanDepartmentPageData = departmentPage => {
  let department = departmentPage;
  department.topServices = cleanDepartmentPageLinks(
    department.topPages,
    department.slug,
  );
  department.relatedLinks = cleanDepartmentPageLinks(
    department.relatedPages,
    department.slug,
  );

  // keeping this logic in there for now, stuff is kinda messy
  department.contact = cleanContact(department.contact);
  department.directors = cleanDepartmentDirectors(
    department.departmentDirectors,
  );

  return { department: departmentPage };
};

const getTopicCollectionPageData = async (
  topicCollectionPage,
  instanceOfPage,
  client,
) => {
  const { topicCollectionTopics } = await client.request(
    getTopicCollectionTopicQuery,
    {
      id: topicCollectionPage.id,
    },
  );

  // topicCollectionTopics returns all the topics that are under that topic collection
  let topicCollection = topicCollectionPage;
  if (topicCollectionTopics.edges.length) {
    topicCollection.topics = topicCollectionTopics.edges
      .filter(edge => edge.node.page.topicpage.live)
      .map(edge => ({
        title: edge.node.page.topicpage.title,
        description: edge.node.page.topicpage.description,
        slug: edge.node.page.topicpage.slug,
        topiccollection: {
          slug: topicCollection.slug,
          theme: {
            slug: topicCollection.theme.slug,
          },
        },
        pages: edge.node.page.topicpage.topPages.edges
          // .filter(topPageEdge => topPageEdge.node.live) // todo: can't filter on live now
          .map(topPageEdge => ({
            pageType: topPageEdge.node.pageType,
            title: topPageEdge.node.title,
            url: `${instanceOfPage.url}${edge.node.page.topicpage.slug}/${topPageEdge.node.slug}/`,
          })),
      }));
  } else {
    topicCollection.topics = [];
  }

  return { tc: topicCollection };
};

const getServicePageData = async (
  servicePageData,
  instance,
  client,
  pagesOfGuides,
) => {
  let relatedTo = [];
  if (instance.grandparent) {
    relatedTo = await getRelatedTo(
      instance.parent,
      instance.grandparent,
      client,
    );
  }

  let servicePage = servicePageData;

  // keeping this logic in there for now, stuff is kinda messy
  servicePage.contact = cleanContact(servicePageData.contact);

  servicePage.contextualNavData = {
    parent: instance.parent,
    relatedTo: relatedTo,
    offeredBy: getOfferedByFromDepartments(servicePageData.departments),
  };

  servicePage.events = cleanEvents(servicePageData.events);

  if (pagesOfGuides && pagesOfGuides[servicePageData.id]) {
    // We're checking if this id is part of guide page because it may not be published and draw an error.
    servicePage.pageIsPartOf = pagesOfGuides[servicePageData.id];
  }
  return { service: servicePage };
};

const getInformationPageData = async (
  informationPageData,
  instance,
  client,
  pagesOfGuides,
) => {
  let relatedTo = [];
  if (instance.grandparent) {
    relatedTo = await getRelatedTo(
      instance.parent,
      instance.grandparent,
      client,
    );
  }

  let informationPage = informationPageData;
  // keeping this logic in there for now, stuff is kinda messy
  informationPage.contact = cleanContact(informationPageData.contact);

  informationPage.contextualNavData = {
    parent: instance.parent,
    relatedTo: relatedTo,
    offeredBy: getOfferedByFromDepartments(informationPageData.departments),
  };

  informationPage.events = cleanEvents(informationPageData.events);

  if (pagesOfGuides && pagesOfGuides[informationPageData.id]) {
    // We're checking if this id is part of guide page because it may not be published and draw an error.
    informationPage.pageIsPartOf = pagesOfGuides[informationPageData.id];
  }

  return { informationPage: informationPage };
};

const getGuidePageData = async (guidePageData, instance, client) => {
  let relatedTo = [];
  if (instance.grandparent) {
    relatedTo = await getRelatedTo(
      instance.parent,
      instance.grandparent,
      client,
    );
  }

  // keeping this logic in there for now, stuff is kinda messy
  guidePageData.contact = cleanContact(guidePageData.contact);

  guidePageData.contextualNavData = {
    parent: instance.parent,
    relatedTo: relatedTo,
    offeredBy: getOfferedByFromDepartments(guidePageData.departments),
  };

  return { guidePage: guidePageData };
};

const getFormContainerData = async (formContainerData, instance, client) => {
  let relatedTo = [];
  if (instance.grandparent) {
    relatedTo = await getRelatedTo(
      instance.parent,
      instance.grandparent,
      client,
    );
  }

  formContainerData.contextualNavData = {
    parent: instance.parent,
    relatedTo: relatedTo,
    offeredBy: getOfferedByFromDepartments(formContainerData.departments),
  };

  return { formContainer: formContainerData };
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
  // is this still needed? with brians new work?
  /*
    depending on environment, returns a valid url from either staging or production
    used in getOfficialDocumentPageData
  */
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
      'https://joplin3-austin-gov-static.s3.amazonaws.com/production/media/documents',
      'https://joplin3-austin-gov-static.s3.amazonaws.com/staging/media/documents',
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
  officialDocumentPage,
  instance,
  client,
) => {
  let relatedTo = [];
  if (instance.grandparent) {
    relatedTo = await getRelatedTo(
      instance.parent,
      instance.grandparent,
      client,
    );
  }

  officialDocumentPage.contextualNavData = {
    parent: instance.parent,
    relatedTo: relatedTo,
    offeredBy: getOfferedByFromDepartments(officialDocumentPage.departments),
  };

  for (let doc of officialDocumentPage.documents.edges) {
    // If we have a document in wagtail
    // use that info to update the information syncronously
    if (doc.node.document) {
      doc.node.link = await getWorkingDocumentLink(doc.node.document.filename);
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

const cleanEventPageData = eventPageData => {
  // Fill in some contextual nav info
  eventPageData.offeredBy = getOfferedByFromDepartments(
    eventPageData.departments,
  );

  // reverse the order of the fees
  // eventPage.fees.edges.reverse();

  return { eventPage: eventPageData };
};

const getDepartmentsPageData = async client => {
  const { allDepartmentPages } = await client.request(getDepartmentsPageQuery);

  const departments = allDepartmentPages.edges.map(edge => ({
    title: edge.node.title,
    url: `/${edge.node.slug}/`,
  }));

  return { departments: departments };
};

const getAllEvents = async (client, hideCanceled) => {
  const date_now = moment()
    .tz('America/Chicago')
    .format('YYYY-MM-DD');
  const gqlVariables = hideCanceled
    ? { date_Gte: date_now, canceled: false }
    : { date_Gte: date_now };
  const { allEventPages } = await client.request(
    getEventPageQuery,
    gqlVariables,
  );

  const events = allEventPages.edges.map(edge => ({
    title: edge.node.title,
    description: edge.node.description,
    canceled: edge.node.canceled,
    date: edge.node.date,
    startTime: edge.node.startTime,
    endTime: edge.node.endTime,
    eventUrl: getEventPageUrl(edge.node.slug, edge.node.date),
    feesRange: formatFeesRange(edge.node.fees),
    // until we have support for multiple locations, we're taking the first one
    location: edge.node.locations[0],
    eventIsFree: edge.node.eventIsFree,
    registrationUrl: edge.node.registrationUrl,
  }));

  return { events: events };
};

const buildPageAtUrl = async (
  pageAtUrlInfo,
  instanceOfPage,
  client,
  pagesOfGuides,
) => {
  /*
  buildPageAtUrl takes a page information object and the language client
  returns object with page url, template and data from appropriate query
  */
  const {
    janisUrls,
    janisInstances,
    eventpage,
    locationpage,
    departmentpage,
    topiccollectionpage,
    janisbasepagewithtopiccollections,
    janisbasepagewithtopics,
    allDepartments,
    allEvents,
  } = pageAtUrlInfo;
  if (departmentpage) {
    return {
      path: instanceOfPage.url,
      template: 'src/components/Pages/Department',
      getData: () => cleanDepartmentPageData(departmentpage),
    };
  }

  // If we are a topic collection page, we need to use a query to get information about
  // our child topics and their top pages
  if (topiccollectionpage) {
    return {
      path: instanceOfPage.url,
      template: 'src/components/Pages/TopicCollection',
      getData: () =>
        getTopicCollectionPageData(topiccollectionpage, instanceOfPage, client),
    };
  }

  if (janisbasepagewithtopiccollections) {
    let topicPage = janisbasepagewithtopiccollections.topicpage;
    return {
      path: instanceOfPage.url,
      template: 'src/components/Pages/Topic',
      getData: () => getTopicPageData(topicPage, instanceOfPage, client),
    };
  }

  if (janisbasepagewithtopics) {
    const {
      guidepage,
      servicepage,
      informationpage,
      officialdocumentpage,
      formcontainer,
    } = janisbasepagewithtopics;

    if (guidepage) {
      return {
        path: instanceOfPage.url,
        template: 'src/components/Pages/Guide',
        getData: () => getGuidePageData(guidepage, instanceOfPage, client),
      };
    }

    if (servicepage) {
      return {
        path: instanceOfPage.url,
        template: 'src/components/Pages/Service',
        getData: () =>
          getServicePageData(
            servicepage,
            instanceOfPage,
            client,
            pagesOfGuides.servicePage,
          ),
      };
    }

    if (informationpage) {
      return {
        path: instanceOfPage.url,
        template: 'src/components/Pages/Information',
        getData: () =>
          getInformationPageData(
            informationpage,
            instanceOfPage,
            client,
            pagesOfGuides.informationPage,
          ),
      };
    }

    if (officialdocumentpage) {
      return {
        path: instanceOfPage.url,
        template: 'src/components/Pages/OfficialDocuments/OfficialDocumentList',
        getData: () =>
          getOfficialDocumentPageData(
            officialdocumentpage,
            instanceOfPage,
            client,
          ),
      };
    }

    if (formcontainer) {
      return {
        path: instanceOfPage.url,
        template: 'src/components/Pages/Form',
        getData: () =>
          getFormContainerData(formcontainer, instanceOfPage, client),
      };
    }
  }

  if (locationpage) {
    return {
      path: janisUrls[0],
      template: 'src/components/Pages/Location',
      getData: () => cleanLocationPage(locationpage),
    };
  }

  if (eventpage) {
    return {
      path: janisUrls[0],
      template: 'src/components/Pages/Event',
      getData: () => cleanEventPageData(eventpage),
    };
  }

  // If we're the departments page
  if (allDepartments) {
    return {
      path: '/departments/',
      template: 'src/components/Pages/Departments',
      getData: () => getDepartmentsPageData(client),
    };
  }

  // If we are the list of all events
  if (allEvents) {
    return {
      path: '/events/',
      template: 'src/components/Pages/EventList',
      // getAllEvents takes client and boolean: if we should hide the cancelled events
      getData: () => getAllEvents(client, false),
    };
  }
};

const getPagesOfGuidesData = async client => {
  const { allGuidePages } = await client.request(getAllGuidePagesSectionsQuery);

  const pagesOfGuidesData = {};

  allGuidePages.edges.map(async guidePage => {
    if (guidePage.node.sections.length > 0) {
      const guideUrl = await client.request(getPageUrlQuery, {
        id: guidePage.node.id,
      });

      let url ='/'

      if (
        guideUrl.allPages &&
        guideUrl.allPages.edges &&
        guideUrl.allPages.edges[0].node &&
        guideUrl.allPages.edges[0].node.janisInstances
      ) {
        url = guideUrl.allPages.edges[0].node.janisInstances[0].url;
      }
      guidePage.node.sections.map(section => {
        // Example section object
        /*
        {
          heading: 'Learn and prepare',
          pages: [
            { servicePage: null, informationPage: [Object] },
            { servicePage: [Object], informationPage: null },
          ]
        }

        */
        for (const pageType of ['servicePage', 'informationPage']) {
          if (!pagesOfGuidesData[pageType]) {
            pagesOfGuidesData[pageType] = {};
          }

          for (const pageEntry of section.pages) {
            const page = pageEntry[pageType];

            // Example page object
            /*
            {
              id: 'SW5mb3JtYXRpb25QYWdlTm9kZToyNTc=',
              pageType: 'information page',
              title: 'Documents for mobile food vendors in Austin'
            }
            */

            if (page) {
              if (!pagesOfGuidesData[pageType][page.id]) {
                pagesOfGuidesData[pageType][page.id] = [];
              }

              pagesOfGuidesData[pageType][page.id].push({
                pageName: page.title,
                pageType: page.pageType,
                ofPageType: guidePage.node.pageType,
                guidePageTitle: guidePage.node.title,
                guidePageUrl: url,
              });
            }
          }
        }
      });
    }
  });

  return pagesOfGuidesData;
};

const makeAllPages = async (langCode, incrementalPageId) => {
  /*
    makeAllPages returns react-static data object with homepage
    and all built pages as children for '/en', '/es' and '/'
  */
  const path = `/${!!langCode ? langCode : ''}`;
  console.log(`- Building routes for ${path}...`);

  const client = createGraphQLClientsByLang(langCode);

  let pages = [];
  let after = '';
  while (true) {
    const siteStructure = await client.request(allPagesQuery, { after: after });
    pages = pages.concat(siteStructure.allPages.edges);
    after = siteStructure.allPages.pageInfo.endCursor;
    if (!siteStructure.allPages.pageInfo.hasNextPage) {
      break;
    }
  }

  // This is really something that should happen in joplin,
  // but let's just use janis to do it for now
  if (incrementalPageId) {
    console.log("Looks like we're trying to do an incremental build!");
    // First let's find all of the parent/grandparent ids we need
    // to rebuild titles on links etc.
    let idsToRebuild = [incrementalPageId];

    for (const pageAtUrlInfo of parsedStructure) {
      if (pageAtUrlInfo.id === incrementalPageId) {
        if (pageAtUrlInfo.parent_department) {
          idsToRebuild.push(pageAtUrlInfo.parent_department);
        }

        if (pageAtUrlInfo.parent_topic) {
          idsToRebuild.push(pageAtUrlInfo.parent_topic);
        }

        if (pageAtUrlInfo.grandparent_topic_collection) {
          idsToRebuild.push(pageAtUrlInfo.grandparent_topic_collection);
        }
      }
    }

    parsedStructure = parsedStructure.filter(pageAtUrlInfo =>
      idsToRebuild.includes(pageAtUrlInfo.id),
    );
  }

  const pagesOfGuidesData = await getPagesOfGuidesData(client);

  // Build a page with all the departments
  pages.push({
    node: {
      allDepartments: true,
      janisInstances: [
        {
          url: '/departments/',
        },
      ],
    },
  });

  // and also a page with all the events
  pages.push({
    node: {
      allEvents: true,
      janisInstances: [
        {
          url: '/events/',
        },
      ],
    },
  });

  let allPages = await Promise.all(
    pages.map(pageAtUrlInfo => {
      if (!!pageAtUrlInfo.node.janisInstances.length) {
      return Promise.all(
        pageAtUrlInfo.node.janisInstances.map(instanceOfPage =>
          buildPageAtUrl(
            pageAtUrlInfo.node,
            instanceOfPage,
            client,
            pagesOfGuidesData,
          ),
        ),
      );
    }

    // not all pages have instances (events and locations not under departments)
    return Promise.all(
      pageAtUrlInfo.node.janisUrls.map(instanceOfPage =>
        buildPageAtUrl(
          pageAtUrlInfo.node,
          instanceOfPage,
          client,
          pagesOfGuidesData,
        ),
      ),
    );
    }),
  );

  // the nested maps return nested arrays that need to be flattened
  allPages = allPages.flat();


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

      const allActiveEvents = await getAllEvents(client, true);

      return {
        topServices,
        image: {
          file: 'tomek-baginski-593896-unsplash',
          title: 'Lady Bird Lake',
        },
        events: allActiveEvents.events,
      };
    },
  };

  return data;
};

export default {
  // siteRoot: 'https://alpha.austin.gov',
  // basePath // Do not alter this line if you want a working PR
  basePath: process.env.BASE_PATH_PR ? process.env.BASE_PATH_PR : '/',
  stagingSiteRoot: 'https://janis-staging.herokuapp.com/',
  getSiteProps: () => ({
    title: 'City of Austin',
  }),
  getSiteData: async () => {
    // getSiteData's result is made available to the entire site via the useSiteData hook
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
      // {
      //   path: '/search',
      //   template: 'src/components/Pages/Search',
      // },
      {
        path: '404',
        template: 'src/components/Pages/404',
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
  prefetchRate: Number(process.env.REACT_STATIC_PREFETCH_RATE) || 0,
};
