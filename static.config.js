import { SUPPORTED_LANG_CODES } from 'js/i18n/constants';
import { createGraphQLClientsByLang } from 'js/helpers/fetchData';

import filesize from 'filesize';
import axios from 'axios';
import moment from 'moment-timezone';

// TODO: clean these up/remove them <-- why remove them?
import allThemesQuery from 'js/queries/allThemesQuery';
import topServicesQuery from 'js/queries/topServicesQuery';

// Shinier ✨✨ new queries!
import allPagesQuery from 'js/queries/allPagesQuery';

// Shiny ✨ new queries!
// import siteStructureQuery from 'js/queries/siteStructureQuery';
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
import getFormContainerQuery from 'js/queries/getFormContainerQuery';
import getAllGuidePagesSectionsQuery from 'js/queries/getAllGuidePagesSectionsQuery';
import getLocationPageQuery from 'js/queries/getLocationPageQuery';
import getEventPageQuery from 'js/queries/getEventPageQuery';

//todo (chia) : check if we still need all of these
import {
  cleanNavigation,
  cleanContacts,
  cleanLinks,
  cleanDepartmentDirectors,
  cleanDepartmentPageLinks,
  cleanLocationPage,
  getOfferedByFromDepartments,
  getEventPageUrl,
  formatFeesRange,
} from 'js/helpers/cleanData';

const getContextualNavData = async (
  parent_department, // id string
  parent_topic, // id string
  grandparent_topic_collection, // id string
  departments, // array of department objects {id, slug, title}
  client,
) => {
  let contextualNavData = {};

  parent_topic = "VG9waWNOb2RlOjg="
  grandparent_topic_collection = "VG9waWNDb2xsZWN0aW9uTm9kZTo3"

  // returns allTopics: topic object for specified parent_topic id {id, slug, title}
  // topicCollectionTopics: array of topic objs that are under grandparent_topic_collection
  //    including the parent_topic
  // allTopicCollections: topic_collection object for specified grandparent_topic_collection
  //   {id, slug, theme:{id, slug}}
  const { allTopics, allTopicCollections, topicCollectionTopics } =
    parent_topic && grandparent_topic_collection
      ? await client.request(getContextualNavTopicDataQuery, {
          parent_topic: parent_topic,
          grandparent_topic_collection: grandparent_topic_collection,
        })
      : {
          allTopics: null,
          allTopicCollections: null,
          topicCollectionTopics: null,
        };

  // returns department object for the specified dept id
  const { allDepartmentPages } = parent_department
    ? await client.request(getContextualNavDepartmentDataQuery, {
        parent_department: parent_department,
      })
    : { allDepartmentPages: null };

  // get parent
  console.log(allTopicCollections.edges[0].node)
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
      // url is theme/topic-collection/topic
      url: `/${allTopicCollections.edges[0].node.theme.slug}/${
        allTopicCollections.edges[0].node.slug
      }/${allTopics.edges[0].node.slug}/`,
    };
  }

  if (
    parent_department &&
    allDepartmentPages && // note, not all dept pages, the result of the query
    allDepartmentPages.edges.length
  ) {
    contextualNavData.parent = {
      id: allDepartmentPages.edges[0].node.id,
      title: allDepartmentPages.edges[0].node.title,
      url: `/${allDepartmentPages.edges[0].node.slug}/`,
    };
  }

  // get related to
  topicCollectionTopics.edges.map(edge=> console.log(edge.node.page.topicpage))
  if (
    parent_topic &&
    grandparent_topic_collection &&
    topicCollectionTopics &&
    topicCollectionTopics.edges.length &&
    allTopicCollections &&
    allTopicCollections.edges.length &&
    allTopicCollections.edges[0].node.theme
  ) {
    contextualNavData.relatedTo = topicCollectionTopics.edges
      .filter(edge => edge.node && edge.node.page.topicpage.id !== parent_topic)
      .map(edge => ({
        id: edge.node.page.topicpage.id,
        title: edge.node.page.topicpage.title,
        url: `/${allTopicCollections.edges[0].node.theme.slug}/${
          allTopicCollections.edges[0].node.slug
        }/${edge.node.page.topicpage.slug}/`,
      }));
  } else {
    contextualNavData.relatedTo = [];
    // relatedTo is empty if we are viewing page under the department
  }

  // get offered by
  contextualNavData.offeredBy = getOfferedByFromDepartments(departments);

  return contextualNavData;
};

const getAllTopicLinks = (
  allServicePageTopics,
  allInformationPageTopics,
  allOfficialDocumentPageTopics,
  allGuidePageTopics,
  allFormContainerTopics,
) => {
  /* 
    getAllTopicLinks: collects all the topic links from servicepagetopics, infopage topics
    official doc topics, guidepage topics and form container topics into one 
    array of links.
    Used in getTopicPageData for topics.otherLinks
    --> gets the pages that aren't top pages. so the other pages. 
  */
  // I don't like this but we still need to do some logic here
  // to get all the pages
  let allLinks = [];
  if (allServicePageTopics && allServicePageTopics.edges) {
    for (const edge of allServicePageTopics.edges) {
      if (edge.node) {
        if (edge.node.page.live) {
          allLinks.push(edge.node.page);
        }
      }
    }
  }

  if (allInformationPageTopics && allInformationPageTopics.edges) {
    for (const edge of allInformationPageTopics.edges) {
      if (edge.node) {
        if (edge.node.page.live) {
          allLinks.push(edge.node.page);
        }
      }
    }
  }

  if (allOfficialDocumentPageTopics && allOfficialDocumentPageTopics.edges) {
    for (const edge of allOfficialDocumentPageTopics.edges) {
      if (edge.node) {
        if (edge.node.page.live) {
          allLinks.push(edge.node.page);
        }
      }
    }
  }

  if (allGuidePageTopics && allGuidePageTopics.edges) {
    for (const edge of allGuidePageTopics.edges) {
      if (edge.node) {
        if (edge.node.page.live) {
          allLinks.push(edge.node.page);
        }
      }
    }
  }

  if (allFormContainerTopics && allFormContainerTopics.edges) {
    for (const edge of allFormContainerTopics.edges) {
      if (edge.node) {
        if (edge.node.page.live) {
          allLinks.push(edge.node.page);
        }
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
    allFormContainerTopics,
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
    // its called allTopicCollections, but its the name of the query, so if you pass in an id you dont get all
  // of them, you only get one. 
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
    allFormContainerTopics,
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
  department.topServices = cleanDepartmentPageLinks(
    department.topPages,
    department.slug,
  );
  department.relatedLinks = cleanDepartmentPageLinks(
    department.relatedPages,
    department.slug,
  );

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
    topicCollectionTopics,
  } = await client.request(getTopicCollectionPageQuery, { id: id });

  // topicCollectionTopics returns all the topics that are under that topic collection
  let topicCollection = allTopicCollections.edges[0].node;
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
      // .filter(topPageEdge => topPageEdge.node.live)
      .map(topPageEdge => ({
        pageType: topPageEdge.node.pageType,
        title: topPageEdge.node.title,
        url: `/${topicCollection.theme.slug}/${topicCollection.slug}/${
          edge.node.page.topicpage.slug
        }/${topPageEdge.node.slug}/`,
      })),
    }));
  } else {
    topicCollection.topics = []
  }

  return { tc: topicCollection };
};

const getServicePageData = async (
  id,
  parent_department,
  parent_topic,
  grandparent_topic_collection,
  client,
  pagesOfGuides,
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
    service.departments,
    client,
  );

  if (pagesOfGuides && pagesOfGuides[id]) {
    // We're checking if this id is part of guide page because it may not be published and draw an error.
    service.pageIsPartOf = pagesOfGuides[id];
  }

  return { service: service };
};

const getInformationPageData = async (
  id,
  parent_department,
  parent_topic,
  grandparent_topic_collection,
  client,
  pagesOfGuides,
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
    informationPage.departments,
    client,
  );

  if (pagesOfGuides && pagesOfGuides[id]) {
    // We're checking if this id is part of guide page because it may not be published and draw and error.
    informationPage.pageIsPartOf = pagesOfGuides[id];
  }

  // informationPage.pageIsPartOf = pagesOfGuides[id];

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
    guidePage.departments,
    client,
  );

  return { guidePage: guidePage };
};

const getFormContainerData = async (
  id,
  parent_department,
  parent_topic,
  grandparent_topic_collection,
  client,
) => {
  const { allFormContainers } = await client.request(getFormContainerQuery, {
    id: id,
  });

  let formContainer = allFormContainers.edges[0].node;

  formContainer.contextualNavData = await getContextualNavData(
    parent_department,
    parent_topic,
    grandparent_topic_collection,
    formContainer.departments,
    client,
  );

  return { formContainer: formContainer };
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
    officialDocumentPage.departments,
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

const getLocationPageData = async (id, client) => {
  const { allLocationPages } = await client.request(getLocationPageQuery, {
    id: id,
  });

  let locationPage = allLocationPages.edges[0].node;

  return { locationPage: cleanLocationPage(locationPage) };
};

const getEventPageData = async (id, client) => {
  const { allEventPages } = await client.request(getEventPageQuery, {
    id: id,
  });

  let eventPage = allEventPages.edges[0].node;

  // Fill in some contextual nav info
  eventPage.offeredBy = getOfferedByFromDepartments(eventPage.departments);

  // reverse the order of the fees
  // eventPage.fees.edges.reverse();

  return { eventPage: eventPage };
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

const buildPageAtUrl = async (pageAtUrlInfo, client, pagesOfGuides) => {
  /* 
  buildPageAtUrl takes a page information object and the language client
  returns object with page url, template and data from appropiate query
  */
  // const {
  //   url,
  //   type,
  //   id,
  //   parent_department,
  //   parent_topic,
  //   parent_topic_collection,
  //   grandparent_topic_collection,
  // } = pageAtUrlInfo;
  const {
    janisUrls,
    eventpage,
    locationpage,
    departmentpage,
    topiccollectionpage,
    janisbasepagewithtopiccollections,
    janisbasepagewithtopics,
    allDepartments,
    allEvents,
  } = pageAtUrlInfo;
  const type = 'blank';

  // If we're a department page, we need to make sure our top services/related info works
  // todo: make sure the comment above still works
  if (departmentpage) {
    return {
      // temporary until janis urls in dept page
      path: janisUrls[0] ? janisUrls[0].slice(20) : `/${departmentpage.id}`,
      template: 'src/components/Pages/Department',
      getData: () => getDepartmentPageData(departmentpage.id, client),
    }
  }

  // If we are a topic collection page, we need to use a query to get information about
  // our child topics and their top pages
  // (this might be able to move to the end with the "just run a query without extra vars" part)
  // todo: what does this comment above mean?
  if (topiccollectionpage) {
    return {
      path: janisUrls[0].slice(20),
      template: 'src/components/Pages/TopicCollection',
      getData: () => getTopicCollectionPageData(topiccollectionpage.id, client),
    }
  }

  // If we are a topic page, we need a parent topic collection id
  if (janisbasepagewithtopiccollections) {
    console.log('***** ', janisbasepagewithtopiccollections.topicpage.id)
    console.log(janisUrls[0])
    let id = janisbasepagewithtopiccollections.topicpage.id;
    // there can be more than one of these, cant there?
    let parent_topic_collection_id = janisbasepagewithtopiccollections.topicpage.topiccollections.id
    return {
      path: janisUrls[0].slice(20),
      template: 'src/components/Pages/Topic',
      getData: () => getTopicPageData(id, parent_topic_collection_id, client),
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
      // departments is an array of departments, is the first one always the parent? polyhierarchy
      let parentDeptId = guidepage.departments.length ? guidepage.departments[0].id : '';
      return {
        path: janisUrls[0].slice(20),
        template: 'src/components/Pages/Guide',
        getData: () =>
          getGuidePageData(
            guidepage.id,
            parentDeptId,
            '',
            '',
            // parent_topic,
            // grandparent_topic_collection,
            client,
          ),
        }
    }

    if (servicepage) {
       // departments is an array of departments, is the first one always the parent? polyhierarchy
      let parentDeptId = servicepage.departments.length ? servicepage.departments[0].id : '';
      return {
        path: janisUrls[0].slice(20),
        template: 'src/components/Pages/Service',
        getData: () =>
          getServicePageData(
            servicepage.id,
            parentDeptId,
            '',
            '',
            //parent_topic,
            //grandparent_topic_collection,
            client,
            pagesOfGuides.servicePage,
          ),
      };
    }

    if (informationpage) {
      let parentDeptId = informationpage.departments.length ? informationpage.departments[0].id : '';
      return {
        path: janisUrls[0].slice(20),
        template: 'src/components/Pages/Information',
        getData: () =>
          getInformationPageData(
            informationpage.id,
            parentDeptId,
            '',
            '',
            //parent_topic,
            //grandparent_topic_collection,
            client,
            pagesOfGuides.informationPage,
          ),
      };
    }

    if (officialdocumentpage) {
      let parentDeptId = officialdocumentpage.departments.length ? officialdocumentpage.departments[0].id : '';
      return {
        path: janisUrls[0].slice(20),
        template: 'src/components/Pages/OfficialDocuments/OfficialDocumentList',
        getData: () =>
          getOfficialDocumentPageData(
            officialdocumentpage.id,
            parentDeptId,
            '',
            '',
            // parent_topic,
            // grandparent_topic_collection,
            client,
          ),
      };      
    }

    if (formcontainer) {
      let parentDeptId = formcontainer.departments.length ? formcontainer.departments[0].id : '';
      return {
        path: janisUrls[0].slice(20),
        template: 'src/components/Pages/Form',
        getData: () =>
          getFormContainerData(
            formcontainer.id,
            parentDeptId,
            '',
            '',
            // parent_topic,
            // grandparent_topic_collection,
            client,
          ),
      };
    }
  }


  if (locationpage) {
    return {
      // temporary until location urls
      path: janisUrls[0] ? janisUrls[0].slice(20) : `/${locationpage.id}`,
      template: 'src/components/Pages/Location',
      getData: () => getLocationPageData(locationpage.id, client),
    }
  }

  if (eventpage) {
    return {
      // temporary until event urls
      path: janisUrls[0] ? janisUrls[0].slice(20) : `/${eventpage.id}`,
      template: 'src/components/Pages/Event',
      getData: () => getEventPageData(eventpage.id, client),
    }
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
      getData: () => getAllEvents(client, false),
          // getAllEvents takes client and boolean if we should hide the cancelled events
    };
  }
};

const getPagesOfGuidesData = async client => {
  const { allGuidePages } = await client.request(getAllGuidePagesSectionsQuery);

  const pagesOfGuidesData = {};

  allGuidePages.edges.map(guidePage => {
    if (
      guidePage.node.sections.length > 0 &&
      guidePage.node.topics.edges.length > 0
    ) {
      const url =
        '/' +
        [
          guidePage.node.topics.edges[0].node.topic.topiccollections.edges[0]
            .node.topiccollection.theme.slug,
          guidePage.node.topics.edges[0].node.topic.topiccollections.edges[0]
            .node.topiccollection.slug,
          guidePage.node.topics.edges[0].node.topic.slug,
          guidePage.node.slug,
        ].join('/');
      guidePage.node.sections.map(section => {
        // Example section object
        /*

        {
          heading: 'Learn and prepare',
          pages: [
            { servicePage: null, informationPage: [Object] },
            { servicePage: null, informationPage: [Object] },
            { servicePage: [Object], informationPage: null },
            { servicePage: [Object], informationPage: null },
            { servicePage: null, informationPage: [Object] }
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
    makeAllPages returns react-static data object with homepage and all built pages
    as children per language code
  */
  const path = `/${!!langCode ? langCode : ''}`;
  console.log(`- Building routes for ${path}...`);

  const client = createGraphQLClientsByLang(langCode);

  const siteStructure = await client.request(allPagesQuery)
  let pages = siteStructure.allPages.edges;

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

  // TODO: pages of guides data
  // const pagesOfGuidesData = await getPagesOfGuidesData(client);
  const pagesOfGuidesData = []

  // Build a page with all the departments
  pages.push({
    node: {
      allDepartments: true
    }
  });

  // and also a page with all the events
  pages.push({
    node: {
      allEvents: true
    }
  })

  const allPages = await Promise.all(
    pages.map(pageAtUrlInfo =>
      buildPageAtUrl(pageAtUrlInfo.node, client, pagesOfGuidesData),
    ),
  );

  const data = {
    path: path,
    template: 'src/components/Pages/Home',
    children: allPages,
    getData: async () => {
      const { allServicePages } = await client.request(topServicesQuery);

      let services = cleanLinks(allServicePages, 'service');

      // Make sure we don't have any dupes in top services
      // TODO: check if still needed
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
  //basePath // Do not alter this line if you want a working PR
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
