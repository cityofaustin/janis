import { SUPPORTED_LANG_CODES } from 'js/i18n/constants';
import { createGraphQLClientsByLang } from 'js/helpers/fetchData';

// QUERIES
import allServicePagesQuery from 'js/queries/allServicePagesQuery';
import allInformationPagesQuery from 'js/queries/allInformationPagesQuery';
import allTopicsQuery from 'js/queries/allTopicsQuery';
import allTopicCollectionsQuery from 'js/queries/allTopicCollectionsQuery';
import allThemesQuery from 'js/queries/allThemesQuery';
import allDepartmentPagesQuery from 'js/queries/allDepartmentPagesQuery';
import topServicesQuery from 'js/queries/topServicesQuery';
import all311Query from 'js/queries/all311Query';

import {
  cleanLinks,
  cleanDepartments,
  cleanTopics,
  cleanTopicCollections,
  cleanThemes,
  cleanServices,
  cleanInformationPages,
  clean311,
  cleanNavigation,
} from 'js/helpers/cleanData';

const makeAllPages = async langCode => {
  const path = `/${!!langCode ? langCode : ''}`;
  console.log(`- Building routes for ${path}...`);

  const client = createGraphQLClientsByLang(langCode);

  const themeChildren = await makeThemePages(client);
  const deptChildren = await makeDepartmentPages(client);

  const data = {
    path: path,
    component: 'src/components/Pages/Home',
    children: themeChildren.concat(deptChildren),
    getData: async () => {
      const { allServicePages } = await client.request(topServicesQuery);
      let topServices = cleanLinks(allServicePages, 'service');

      // Make sure we don't have any dupes in top services
      topServices = topServices.filter(
        (service, index) =>
          index === topServices.findIndex(s => s.id === service.id),
      );

      // Quick little hack to get homepage top services
      // working with TopServices component
      for (var service of topServices) {
        service.type = !!langCode ? langCode : 'en';
      }

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

const makeThemePages = async client => {
  const { allThemes } = await client.request(allThemesQuery);
  const themes = cleanThemes(allThemes);

  const { allTopicCollections } = await client.request(
    allTopicCollectionsQuery,
  );
  const topicCollections = cleanTopicCollections(allTopicCollections);

  const { allTopics } = await client.request(allTopicsQuery);
  const topics = cleanTopics(allTopics);

  const { allInformationPages: allInformationPages } = await client.request(
    allInformationPagesQuery,
  );
  const informationPages = cleanInformationPages(allInformationPages);

  const { allServicePages: allServices } = await client.request(
    allServicePagesQuery,
  );
  const services = cleanServices(allServices);

  // Add all topic links to topic collection pages
  for (var topic of topics) {
    let matchingTopicCollectionIndex = topicCollections.findIndex(
      tc => tc.id === topic.topiccollection.id,
    );
    if (matchingTopicCollectionIndex !== -1) {
      topicCollections[matchingTopicCollectionIndex].topics.push(topic);
    }
  }

  // And now that we have all the topics on each topic collection,
  // let's update the topic collections on the topics
  for (var topic of topics) {
    let matchingTopicCollectionIndex = topicCollections.findIndex(
      tc => tc.id === topic.topiccollection.id,
    );

    if (matchingTopicCollectionIndex !== -1) {
      // Update the topicCollection on the topic
      const topicCollectionCopy = JSON.parse(
        JSON.stringify(topicCollections[matchingTopicCollectionIndex]),
      );
      topic.topiccollection = topicCollectionCopy;
    }
  }

  // Add all service page links to topic pages
  for (var service of services) {
    if (!service.topic) continue;
    service.type = 'service';

    let matchingTopicIndex = topics.findIndex(t => t.id === service.topic.id);

    if (topics[matchingTopicIndex]) {
      if (service.toplink) {
        topics[matchingTopicIndex].topLinks.push(service);
      } else {
        topics[matchingTopicIndex].otherLinks.push(service);
      }

      // Update the topic on the page
      const topicCopy = JSON.parse(JSON.stringify(topics[matchingTopicIndex]));
      service.topic = topicCopy;
    }
  }

  // Add all information page links to topic pages
  for (var page of informationPages) {
    if (!page.topic) continue;
    page.type = 'info';

    let matchingTopicIndex = topics.findIndex(t => t.id === page.topic.id);
    if (page.toplink) {
      topics[matchingTopicIndex].topLinks.push(page);
    } else {
      topics[matchingTopicIndex].otherLinks.push(page);
    }

    // Update the topic on the page
    const topicCopy = JSON.parse(JSON.stringify(topics[matchingTopicIndex]));
    page.topic = topicCopy;
  }

  const data = themes.map(theme => ({
    path: `/${theme.slug}`,
    component: 'src/components/Pages/Theme',
    getData: async () => ({
      theme,
    }),
    children: topicCollections
      .filter(tc => tc.theme != null && tc.theme.id == theme.id)
      .map(tc => ({
        path: `/${tc.slug}`,
        component: 'src/components/Pages/TopicCollection',
        getData: async () => ({
          tc,
        }),
        children: topics
          .filter(
            top =>
              top.topiccollection != null && top.topiccollection.id == tc.id,
          )
          .map(topic => ({
            path: `/${topic.slug}`,
            component: 'src/components/Pages/Topic',
            getData: async () => ({
              topic,
            }),
            children: informationPages
              .filter(i => i.topic != null && i.topic.id == topic.id)
              .map(informationPage => ({
                path: `/${informationPage.slug}`,
                component: 'src/components/Pages/Information',
                getData: async () => ({
                  informationPage,
                }),
              }))
              .concat(
                services
                  .filter(s => s.topic != null && s.topic.id == topic.id)
                  .map(service => ({
                    path: `/${service.slug}`,
                    component: 'src/components/Pages/Service',
                    getData: async () => ({
                      service,
                    }),
                  })),
              ),
          })),
      })),
  }));

  return data;
};

const makeDepartmentPages = async client => {
  const { allDepartmentPages } = await client.request(allDepartmentPagesQuery);
  const departments = cleanDepartments(allDepartmentPages);

  const { allInformationPages: allInformationPages } = await client.request(
    allInformationPagesQuery,
  );
  const informationPages = cleanInformationPages(allInformationPages);

  for (var page of informationPages) {
    for (var department of departments) {
      if (page.department !== null && page.department.id === department.id) {
        department.relatedLinks.push(page);
      }
    }
  }

  // const { allServicePages: allServices } = await client.request(
  //   allServicePagesQuery,
  // );
  // const services = cleanServices(allServices);

  const data = departments
    .map(department => ({
      path: `/${department.slug}`,
      component: 'src/components/Pages/Department',
      getData: async () => ({
        department,
      }),
      children: informationPages
        .filter(i => i.department != null && i.department.id == department.id)
        .map(informationPage => ({
          path: `/${informationPage.slug}`,
          component: 'src/components/Pages/Information',
          getData: async () => ({
            informationPage,
          }),
        })),
      // .concat(
      //   services.filter(s => s.department != null && s.department.id == department.id).map(service => ({
      //     path: `/${service.slug}`,
      //     component: 'src/components/Pages/Service',
      //     getData: async () => ({
      //       service,
      //     }),
      //   }))
      // )
    }))
    .concat([
      {
        path: '/departments',
        component: 'src/components/Pages/Departments',
        getData: async () => ({
          departments,
        }),
      },
    ]);

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
      {
        query: all311Query,
        dataKey: 'threeoneone',
        middleware: clean311,
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
  getRoutes: async () => {
    const routes = [
      {
        path: '/search',
        component: 'src/components/Pages/Search', //TODO: update search page to be conscious of all languages
      },
      {
        is404: true,
        component: 'src/components/Pages/404', //TODO: update 404 page to be conscious of all languages
      },
    ];

    const allLangs = Array.from(SUPPORTED_LANG_CODES);
    allLangs.unshift(undefined);
    const translatedRoutes = await Promise.all(
      allLangs.map(langCode => makeAllPages(langCode)),
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
};
