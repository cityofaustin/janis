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
import allOfficialDocumentPagesQuery from 'js/queries/allOfficialDocumentPagesQuery';
import allGuidePagesQuery from 'js/queries/allGuidePagesQuery';

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
  cleanOfficialDocumentPages,
  cleanGuidePages,
} from 'js/helpers/cleanData';

const isRelatedDepartment = (page, departmentId) => {
  const relatedDepartments = page.relatedDepartments.edges;
  for (let department in relatedDepartments) {
    if (department.id == departmentId) {
      return true;
    }
  }
  return false;
};

const makeAllPages = async langCode => {
  const path = `/${!!langCode ? langCode : ''}`;
  console.log(`- Building routes for ${path}...`);

  const client = createGraphQLClientsByLang(langCode);

  const themeChildren = await makeThemePages(client);
  const deptChildren = await makeDepartmentPages(client, langCode);

  const data = {
    path: path,
    component: 'src/components/Pages/Home',
    children: themeChildren.concat(deptChildren),
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

  const {
    allOfficialDocumentPages: allOfficialDocumentPages,
  } = await client.request(allOfficialDocumentPagesQuery);
  const officialDocumentPages = cleanOfficialDocumentPages(
    allOfficialDocumentPages,
  );

  const { allGuidePages: allGuidePages } = await client.request(
    allGuidePagesQuery,
  );
  const guidePages = cleanGuidePages(allGuidePages);

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

  // Add all official document page links to topic pages
  for (let page of officialDocumentPages) {
    if (!page.topic) continue;
    page.type = 'official-document';

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

  // Add all guide page links to topic pages
  for (let page of guidePages) {
    if (!page.topic) continue;
    page.type = 'guide';

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
              )
              .concat(
                officialDocumentPages
                  .filter(d => d.topic != null && d.topic.id == topic.id)
                  .map(officialDocumentPage => ({
                    path: `/${officialDocumentPage.slug}`,
                    component: 'src/components/Pages/OfficialDocumentList',
                    getData: async () => ({
                      officialDocumentPage,
                    }),
                  })),
              )
              .concat(
                guidePages
                  .filter(d => d.topic != null && d.topic.id == topic.id)
                  .map(guidePage => ({
                    path: `/${guidePage.slug}`,
                    component: 'src/components/Pages/Guide',
                    getData: async () => ({
                      guidePage,
                    }),
                  })),
              ),
          })),
      })),
  }));

  return data;
};

const makeDepartmentPages = async (client, langCode) => {
  const { allDepartmentPages } = await client.request(allDepartmentPagesQuery);
  const departments = cleanDepartments(allDepartmentPages, langCode);

  const { allInformationPages: allInformationPages } = await client.request(
    allInformationPagesQuery,
  );
  const informationPages = cleanInformationPages(allInformationPages);

  // Add all information page links to department pages
  // copying the pattern from topics, may not need to do all this copying
  for (var infoPage of informationPages) {
    if (!infoPage.department) continue;

    infoPage.type = 'info';

    let matchingDepartmentIndex = departments.findIndex(
      d => d.id === infoPage.department.id,
    );

    if (departments[matchingDepartmentIndex]) {
      // Only add the related link if it's not a top service
      if (
        !departments[matchingDepartmentIndex].topServiceIds.includes(
          infoPage.id,
        )
      ) {
        departments[matchingDepartmentIndex].relatedLinks.push(infoPage);
      }

      // Update the department on the page
      const departmentCopy = JSON.parse(
        JSON.stringify(departments[matchingDepartmentIndex]),
      );
      infoPage.department = departmentCopy;
    }
  }

  const { allServicePages: allServices } = await client.request(
    allServicePagesQuery,
  );
  const services = cleanServices(allServices);

  // Add all service page links to department pages
  // copying the pattern from topics, may not need to do all this copying
  for (var service of services) {
    if (!service.department) continue;
    service.type = 'service';

    let matchingDepartmentIndex = departments.findIndex(
      d => d.id === service.department.id,
    );

    if (departments[matchingDepartmentIndex]) {
      // Only add the related link if it's not a top service
      if (
        !departments[matchingDepartmentIndex].topServiceIds.includes(service.id)
      ) {
        departments[matchingDepartmentIndex].relatedLinks.push(service);
      }

      // Update the department on the page
      const departmentCopy = JSON.parse(
        JSON.stringify(departments[matchingDepartmentIndex]),
      );
      service.department = departmentCopy;
    }
  }

  const {
    allOfficialDocumentPages: allOfficialDocumentPages,
  } = await client.request(allOfficialDocumentPagesQuery);
  const officialDocumentPages = await cleanOfficialDocumentPages(
    allOfficialDocumentPages,
  );

  // Add all official document page links to department pages
  for (let page of officialDocumentPages) {
    if (!page.department) continue;
    page.type = 'official-document';

    let matchingDepartmentIndex = departments.findIndex(
      d => d.id === page.department.id,
    );

    if (departments[matchingDepartmentIndex]) {
      // Only add the related link if it's not a top service
      if (
        !departments[matchingDepartmentIndex].topServiceIds.includes(page.id)
      ) {
        departments[matchingDepartmentIndex].relatedLinks.push(page);
      }

      // Update the department on the page
      const departmentCopy = JSON.parse(
        JSON.stringify(departments[matchingDepartmentIndex]),
      );
      page.department = departmentCopy;
    }
  }

  const { allGuidePages: allGuidePages } = await client.request(
    allGuidePagesQuery,
  );
  const guidePages = cleanGuidePages(allGuidePages);

  // Add all guide page links to department pages
  for (let page of guidePages) {
    if (!page.department) continue;
    page.type = 'guide';

    let matchingDepartmentIndex = departments.findIndex(
      d => d.id === page.department.id,
    );

    if (departments[matchingDepartmentIndex]) {
      if (
        !departments[matchingDepartmentIndex].topServiceIds.includes(page.id)
      ) {
        departments[matchingDepartmentIndex].relatedLinks.push(page);
      }

      // Update the department on the page
      const departmentCopy = JSON.parse(
        JSON.stringify(departments[matchingDepartmentIndex]),
      );
      page.department = departmentCopy;
    }
  }

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
        }))
        .concat(
          services
            .filter(
              s => s.department != null && s.department.id == department.id,
            )
            .map(service => ({
              path: `/${service.slug}`,
              component: 'src/components/Pages/Service',
              getData: async () => ({
                service,
              }),
            })),
        )
        .concat(
          officialDocumentPages
            .filter(
              d => d.department != null && d.department.id == department.id,
            )
            .map(officialDocumentPage => ({
              path: `/${officialDocumentPage.slug}`,
              component: 'src/components/Pages/OfficialDocumentList',
              getData: async () => ({
                officialDocumentPage,
              }),
            })),
        )
        .concat(
          guidePages
            .filter(
              p => p.department != null && p.department.id == department.id,
            )
            .map(guidePage => ({
              path: `/${guidePage.slug}`,
              component: 'src/components/Pages/Guide',
              getData: async () => ({
                guidePage,
              }),
            })),
        ),
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
