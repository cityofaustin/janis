import { SUPPORTED_LANG_CODES } from 'js/i18n/constants';
import { createGraphQLClientsByLang } from 'js/helpers/fetchData';

// QUERIES
import allServicePagesQuery from 'js/queries/allServicePagesQuery';
import allInformationPagesQuery from 'js/queries/allInformationPagesQuery';
import allProcessesQuery from 'js/queries/allProcessesQuery';
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
  cleanProcesses,
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
      const topServices = cleanLinks(allServicePages, 'service');
      return {
        topServices,
        image: {
          file: 'lady-bird-lake',
          title: 'Lady Bird Lake walking trail',
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

  const { allProcesses } = await client.request(allProcessesQuery);
  const processes = cleanProcesses(allProcesses);

  const data = themes.map(theme => ({
    path: `/${theme.slug}`,
    component: 'src/components/Pages/Theme',
    getData: async () => ({
      theme,
    }),
    children: topics
      .filter(top => top.theme != null && top.theme.id == theme.id)
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
            processes
              .filter(p => p.topic != null && p.topic.id == topic.id)
              .map(process => ({
                path: `/${process.slug}`,
                component: 'src/components/Pages/Process',
                getData: async () => ({
                  process,
                }),
                children: process.processSteps.map(processStep => ({
                  path: `/${processStep.slug}`,
                  component: 'src/components/Pages/ProcessStep',
                  getData: async () => ({
                    processStep,
                  }),
                })),
              })),
          ),
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

  // const { allServicePages: allServices } = await client.request(
  //   allServicePagesQuery,
  // );
  // const services = cleanServices(allServices);

  const { allProcesses } = await client.request(allProcessesQuery);
  const processes = cleanProcesses(allProcesses);

  const data = departments.map(department => ({
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
      // .concat(
      //   services.filter(s => s.department != null && s.department.id == department.id).map(service => ({
      //     path: `/${service.slug}`,
      //     component: 'src/components/Pages/Service',
      //     getData: async () => ({
      //       service,
      //     }),
      //   }))
      // )
      .concat(
        processes
          .filter(p => p.department != null && p.department.id == department.id)
          .map(process => ({
            path: `/${process.slug}`,
            component: 'src/components/Pages/Process',
            getData: async () => ({
              process,
            }),
            children: process.processSteps.map(processStep => ({
              path: `/${processStep.slug}`,
              component: 'src/components/Pages/ProcessStep',
              getData: async () => ({
                processStep,
              }),
            })),
          })),
      ),
  }));

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
          ? queries[queryIndex].middleware(response)
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
