import moment from 'moment-timezone';
import filesize from 'filesize';
import { cloneDeep } from 'lodash';

import { SUPPORTED_LANG_CODES } from 'js/i18n/constants';
import { createGraphQLClientsByLang } from 'js/helpers/fetchData';

import allThemesQuery from 'js/queries/allThemesQuery';
import topServicesQuery from 'js/queries/topServicesQuery';
import searchIndexBuilder from 'js/helpers/searchIndexBuilder.js';
import {getOfficialDocumentCollectionLowerBound} from 'js/helpers/getOfficialDocumentCollectionDocuments.js';

// Shinier ✨✨ new queries!
import allPagesQuery from 'js/queries/allPagesQuery';
import getTopicCollectionTopicQuery from 'js/queries/getTopicCollectionTopicQuery';
import getTopicPageAdditionalData from 'js/queries/getTopicPageAdditionalData';
import getPageUrlQuery from 'js/queries/getPageUrl';

// Shiny ✨ new queries!
import getDepartmentsPageQuery from 'js/queries/getDepartmentsPageQuery';
import getAllGuidePagesSectionsQuery from 'js/queries/getAllGuidePagesSectionsQuery';
import getEventPageQuery from 'js/queries/getEventPageQuery';
import getNewsListPageQuery from 'js/queries/getNewsListPageQuery';
import getHomePagesQuery from 'js/queries/getHomePagesQuery';

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
  cleanEvents,
  cleanOfficialDocumentPageCollections,
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

const getTopicPageData = async (page, instance, client) => {
  let topicPage = { ...page };

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
        edge => !topLinkIds.includes(edge.node.pageId) && edge.node.page.live,
      )
      .map(edge => {
        let page = edge.node.page;
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

const cleanDepartmentPageData = (page, locale) => {
  let departmentPage = { ...page };

  departmentPage.topServices = cleanDepartmentPageLinks(
    departmentPage.topPages,
    departmentPage.slug,
  );
  departmentPage.relatedLinks = cleanDepartmentPageLinks(
    departmentPage.relatedPages,
    departmentPage.slug,
  );

  // keeping this logic in there for now, stuff is kinda messy
  departmentPage.contact = cleanContact(departmentPage.contact);
  departmentPage.directors = cleanDepartmentDirectors(
    departmentPage.departmentDirectors,
  );

  // get the first janisUrl from the array here so we don't need to deal with it in the component
  moment.locale(locale);
  for (let newsItem of departmentPage.news) {
    newsItem.url = newsItem.janisbasepagePtr.janisUrls
      ? newsItem.janisbasepagePtr.janisUrls[0]
      : '';

    newsItem.newsDate = moment(newsItem.firstPublishedAt, 'YYYY-MM-DD').format(
      'LL',
    );
  }

  return { department: departmentPage };
};

const cleanNewsPageData = (newsPage, instanceOfPage, lastPublishedAt) => {
  return { ...newsPage, ...instanceOfPage, lastPublishedAt };
};

const getTopicCollectionPageData = async (page, instanceOfPage, client) => {
  let topicCollectionPage = { ...page };

  const { topicCollectionTopics } = await client.request(
    getTopicCollectionTopicQuery,
    {
      id: topicCollectionPage.id,
    },
  );

  // topicCollectionTopics returns all the topics that are under that topic collection
  if (topicCollectionTopics.edges.length) {
    topicCollectionPage.topics = topicCollectionTopics.edges
      .filter(edge => edge.node.page.topicpage.live)
      .map(edge => ({
        title: edge.node.page.topicpage.title,
        description: edge.node.page.topicpage.description,
        slug: edge.node.page.topicpage.slug,
        topiccollection: {
          slug: topicCollectionPage.slug,
          theme: {
            slug: topicCollectionPage.theme.slug,
          },
        },
        pages: edge.node.page.topicpage.topPages.edges
          // .filter(topPageEdge => topPageEdge.node.live) // todo: can't filter on live now
          .map(topPageEdge => ({
            pageType: topPageEdge.node.pageType,
            title: topPageEdge.node.title,
            url: `${instanceOfPage.url}${edge.node.page.topicpage.slug}/${
              topPageEdge.node.slug
            }/`,
          })),
      }));
  } else {
    topicCollectionPage.topics = [];
  }

  return { tc: topicCollectionPage };
};

const getServicePageData = async (page, instance, client, pagesOfGuides) => {
  let servicePage = { ...page };

  let relatedTo = [];
  if (instance.grandparent) {
    relatedTo = await getRelatedTo(
      instance.parent,
      instance.grandparent,
      client,
    );
  }

  // keeping this logic in there for now, stuff is kinda messy
  servicePage.contact = cleanContact(servicePage.contact);

  servicePage.contextualNavData = {
    parent: instance.parent,
    relatedTo: relatedTo,
    offeredBy: getOfferedByFromDepartments(servicePage.departments),
  };

  servicePage.events = cleanEvents(servicePage.events);

  if (pagesOfGuides && pagesOfGuides[servicePage.id]) {
    // We're checking if this id is part of guide page because it may not be published and draw an error.
    servicePage.pageIsPartOf = pagesOfGuides[servicePage.id];
  }

  return { service: servicePage };
};

const getInformationPageData = async (
  informationPageData,
  instance,
  client,
  pagesOfGuides,
) => {
  let informationPage = { ...informationPageData };

  let relatedTo = [];
  if (instance.grandparent) {
    relatedTo = await getRelatedTo(
      instance.parent,
      instance.grandparent,
      client,
    );
  }

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

const getGuidePageData = async (page, instance, client) => {
  let guidePage = { ...page };

  let relatedTo = [];
  if (instance.grandparent) {
    relatedTo = await getRelatedTo(
      instance.parent,
      instance.grandparent,
      client,
    );
  }

  guidePage.contact = cleanContact(guidePage.contact);

  guidePage.contextualNavData = {
    parent: instance.parent,
    relatedTo: relatedTo,
    offeredBy: getOfferedByFromDepartments(guidePage.departments),
  };

  return { guidePage: guidePage };
};

const getFormContainerData = async (fc, instance, client) => {
  let formContainer = { ...fc };

  let relatedTo = [];
  if (instance.grandparent) {
    relatedTo = await getRelatedTo(
      instance.parent,
      instance.grandparent,
      client,
    );
  }

  formContainer.contact = cleanContact(formContainer.contact);

  formContainer.contextualNavData = {
    parent: instance.parent,
    relatedTo: relatedTo,
    offeredBy: getOfferedByFromDepartments(formContainer.departments),
  };

  return { formContainer: formContainer };
};

const getOfficialDocumentCollectionData = async (page, instance, client, pageId) => {
  let officialDocumentCollection = { ...page };
  officialDocumentCollection.pageId = pageId

  let relatedTo = [];
  if (instance.grandparent) {
    relatedTo = await getRelatedTo(
      instance.parent,
      instance.grandparent,
      client,
    );
  }

  officialDocumentCollection.contextualNavData = {
    parent: instance.parent,
    relatedTo: relatedTo,
    offeredBy: getOfferedByFromDepartments(officialDocumentCollection.departments),
  };

  officialDocumentCollection.lowerBound = await getOfficialDocumentCollectionLowerBound(officialDocumentCollection.id, client);

  return { officialDocumentCollection: officialDocumentCollection };
};

const getOfficialDocumentPageData = (page, instance) => {
  let officialDocumentPage = { ...page };

  if (officialDocumentPage?.document?.filename.slice(-3) === 'pdf') {
    officialDocumentPage.pdfSize = filesize(
      officialDocumentPage.document.fileSize,
    ).replace(' ', '');
  }

  officialDocumentPage.officialDocumentCollection = cleanOfficialDocumentPageCollections(
    officialDocumentPage.officialDocumentCollection,
  );

  officialDocumentPage.contextualNavData = {
    // parent: officialDocumentPage.officialDocumentCollection[0],
    parent: instance.parent,
    relatedTo: [],
    offeredBy: getOfferedByFromDepartments(officialDocumentPage.departments),
  };

  return { officialDocumentPage: officialDocumentPage };
};


const cleanEventPageData = page => {
  let eventPage = { ...page };

  // Fill in some contextual nav info
  eventPage.offeredBy = getOfferedByFromDepartments(eventPage.departments);

  // reverse the order of the fees
  // eventPage.fees.edges.reverse();

  return { eventPage: eventPage };
};

const getDepartmentsPageData = async client => {
  const { allDepartmentPages } = await client.request(getDepartmentsPageQuery);

  const departments = allDepartmentPages.edges.map(edge => ({
    title: edge.node.title,
    url: `/${edge.node.slug}/`,
  }));

  return { departments: departments };
};

const getNewsListForDepartment = async (client, departmentId, locale) => {
  const { allPages } = await client.request(getNewsListPageQuery, {
    departmentPageId: departmentId,
  });

  const departmentPage = allPages.edges[0].node.departmentpage;

  const parent = {
    id: departmentId,
    title: departmentPage.title,
    url: departmentPage.janisbasepagePtr.janisUrls[0],
  };

  moment.locale(locale);
  const newsList = departmentPage.news.map(newsItem => ({
    title: newsItem.title,
    url: newsItem.janisbasepagePtr.janisUrls
      ? newsItem.janisbasepagePtr.janisUrls[0]
      : '',
    newsDate: moment(newsItem.firstPublishedAt, 'YYYY-MM-DD').format('LL'),
  }));

  return { newsList: newsList, parent: parent };
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
    pageId,
    janisUrls,
    janisInstances,
    eventpage,
    locationpage,
    departmentpage,
    officialdocumentpage,
    topiccollectionpage,
    janisbasepagewithtopiccollections,
    janisbasepagewithtopics,
    allDepartments,
    allEvents,
    newspage,
    lastPublishedAt,
  } = pageAtUrlInfo;
  if (departmentpage) {
    let locale = 'en';
    if (['en', 'es'].includes(client.options.headers['Accept-Language'])) {
      locale = client.options.headers['Accept-Language'];
    }

    const departmentNewsPage = {
      path: 'news',
      template: 'src/components/Pages/News/NewsList',
      getData: async () =>
        await getNewsListForDepartment(client, departmentpage.id, locale),
    };

    return {
      path: instanceOfPage.url,
      template: 'src/components/Pages/Department',
      children: [departmentNewsPage],
      getData: () => cleanDepartmentPageData(departmentpage, locale),
    };
  }

  // If we are a topic collection page, we need to use a query to get information about
  // our child topics and their top pages
  if (topiccollectionpage) {
    return {
      path: instanceOfPage.url,
      template: 'src/components/Pages/TopicCollection',
      getData: async () =>
        await getTopicCollectionPageData(topiccollectionpage, instanceOfPage, client),
    };
  }

  if (janisbasepagewithtopiccollections) {
    let topicPage = janisbasepagewithtopiccollections.topicpage;
    return {
      path: instanceOfPage.url,
      template: 'src/components/Pages/Topic',
      getData: async () => await getTopicPageData(topicPage, instanceOfPage, client),
    };
  }

  if (janisbasepagewithtopics) {
    const {
      guidepage,
      servicepage,
      informationpage,
      officialdocumentcollection,
      formcontainer,
    } = janisbasepagewithtopics;

    if (guidepage) {
      return {
        path: instanceOfPage.url,
        template: 'src/components/Pages/Guide',
        getData: async () => await getGuidePageData(guidepage, instanceOfPage, client),
      };
    }

    if (servicepage) {
      return {
        path: instanceOfPage.url,
        template: 'src/components/Pages/Service',
        getData: async () =>
          await getServicePageData(
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
        getData: async () =>
          await getInformationPageData(
            informationpage,
            instanceOfPage,
            client,
            pagesOfGuides.informationPage,
          ),
      };
    }

    if (officialdocumentcollection) {
      return {
        path: instanceOfPage.url,
        template: 'src/components/Pages/OfficialDocuments/OfficialDocumentCollection',
        getData: async () =>
          await getOfficialDocumentCollectionData(
            officialdocumentcollection,
            instanceOfPage,
            client,
            pageId,
          ),
      };
    }

    if (formcontainer) {
      return {
        path: instanceOfPage.url,
        template: 'src/components/Pages/Form',
        getData: async () =>
          await getFormContainerData(formcontainer, instanceOfPage, client),
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
      getData: async () => await getDepartmentsPageData(client),
    };
  }

  // If we are the list of all events
  if (allEvents) {
    return {
      path: '/events/',
      template: 'src/components/Pages/EventList',
      // getAllEvents takes client and boolean: if we should hide the cancelled events
      getData: async () => await getAllEvents(client, false),
    };
  }

  // If we are a news page
  if (newspage) {
    return {
      path: instanceOfPage.url,
      template: 'src/components/Pages/News',
      getData: () =>
        cleanNewsPageData(newspage, instanceOfPage, lastPublishedAt),
    };
  }

  if (officialdocumentpage) {
    return {
      path: instanceOfPage.url,
      template: 'src/components/Pages/OfficialDocuments/OfficialDocumentPage',
      getData: async () => await getOfficialDocumentPageData(officialdocumentpage, instanceOfPage),
    }
  }

  return {
    path: '404',
    template: 'src/components/Pages/404',
  }
};

const getPagesOfGuidesData = async client => {
  const { allGuidePages } = await client.request(getAllGuidePagesSectionsQuery);

  const pagesOfGuidesData = {};

  await Promise.all(allGuidePages.edges.map(async guidePage => {
    if (guidePage.node.sections.length > 0) {
      const guideUrl = await client.request(getPageUrlQuery, {
        id: guidePage.node.id,
      });

      let url = '/';

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
  }));

  return pagesOfGuidesData;
};

const makeAllPages = async (langCode, incrementalPageId) => {
  /*
    makeAllPages returns react-static data object with homepage
    and all built pages as children for '/en', '/es' and '/'
  */
  const path = `/${langCode || ''}`
  console.log(`- Building routes for ${path}...`);

  const client = await createGraphQLClientsByLang(langCode);

  let pages = [];
  let after = '';
  let batchSize = Number(process.env.GRAPHQL_BATCH_SIZE) || null;
  if (!batchSize) {
    if (process.env.DEPLOY_ENV === "production") {
      // Our production Joplin dyno is larger and has more resources to process more requests without timing out.
      batchSize = 10
    } else {
      batchSize = 10
    }
  }
  while (true) {
    const siteStructure = await client.request(allPagesQuery, { after: after, batchSize: batchSize});
    pages = pages.concat(siteStructure.allPages.edges);
    after = siteStructure.allPages.pageInfo.endCursor;
    if (!siteStructure.allPages.pageInfo.hasNextPage) {
      break;
    }
  }

  /**
    Build search index here before pages are altered.
  **/
  // const USE_ELASTICSEARCH = false
  // const indexName = `local_${langCode}_${Date.now()}`
  // const searchIndex = await searchIndexBuilder(pages, indexName, USE_ELASTICSEARCH)

  // incremental build code, may be obsolete with v3
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
    pages.map(async pageAtUrlInfo => {
      if (!!pageAtUrlInfo.node.janisInstances.length) {
        return await Promise.all(
          pageAtUrlInfo.node.janisInstances.map(async instanceOfPage =>
            await buildPageAtUrl(
              pageAtUrlInfo.node,
              instanceOfPage,
              client,
              pagesOfGuidesData,
            ),
          ),
        );
      }

      // not all pages have instances (events and locations not under departments)
      return await Promise.all(
        pageAtUrlInfo.node.janisUrls.map(async instanceOfPage =>
          await buildPageAtUrl(
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

  allPages.push({
    path: '/search/',
    template: 'src/components/Pages/Search',
  });

  const data = {
    path: path,
    template: 'src/components/Pages/Home',
    children: allPages,
    getData: async () => {
      const { allHomePages } = await client.request(getHomePagesQuery);
      let topPages = allHomePages.edges[0].node.topPages

      // If no topPages were set, then default to using old method of getting the top 4 service pages
      if (!topPages.edges.length) {
        const { allServicePages } = await client.request(topServicesQuery);
        topPages = allServicePages
      }

      let services = cleanLinks(topPages, 'service');

      // Make sure we don't have any dupes in top services
      services = services.filter(
        (service, index) =>
          index === services.findIndex(s => s.id === service.id),
      );

      const topServices = services.map(s => ({
        type: langCode || 'en',
        url: s.url,
        title: s.title,
      }));

      const allActiveEvents = await getAllEvents(client, true);

      return {
        topServices,
        image: {
          file: 'banner_image', // Previous image for reference: tomek-baginski-593896-unsplash
          title: 'Lady Bird Lake',
        },
        events: allActiveEvents.events,
      };
    },
  };

  return data;
};

export default {
  siteRoot: process.env.DEPLOY_ENV === "production" ? 'https://alpha.austin.gov' : '/',
  // basePath // Do not alter this line if you want a working PR
  basePath: process.env.BASE_PATH_PR ? process.env.BASE_PATH_PR : '/',
  stagingSiteRoot: 'https://janis-staging.herokuapp.com/',
  getSiteProps: () => ({
    title: 'City of Austin',
  }),
  getSiteData: async () => {
    // getSiteData's result is made available to the entire site via the useSiteData hook
    const data = {'navigation': {}}
    await Promise.all(SUPPORTED_LANG_CODES.map(async langCode => {
      const client = await createGraphQLClientsByLang(langCode);
      let response = await client.request(allThemesQuery);
      data['navigation'][langCode] = cleanNavigation(response, langCode)
    }))

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
        path: '404',
        template: 'src/components/Pages/404',
      },
    ];

    await Promise.all(
      SUPPORTED_LANG_CODES.map(async (langCode) => {
        const pagesData = await makeAllPages(langCode, incrementalPageId)
        routes.push(pagesData)
        if (langCode === "en") {
          // Create pages without a path prefix for default routes using English data.
          // const defaultPagesData = Object.assign({}, pagesData, {path: '/'})
          const defaultPagesData = cloneDeep(pagesData);
          defaultPagesData.path = '/'
          routes.push(defaultPagesData)
        }
      })
    );

    return routes
  },
  plugins: ['react-static-plugin-react-router', 'react-static-plugin-sitemap'],
};
