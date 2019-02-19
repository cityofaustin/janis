import { SUPPORTED_LANG_CODES } from 'js/i18n/constants';
import { createGraphQLClientsByLang } from 'js/helpers/fetchData';

// QUERIES
import allServicePagesQuery from 'js/queries/allServicePagesQuery';
import allInformationPagesQuery from 'js/queries/allInformationPagesQuery';
import allProcessesQuery from 'js/queries/allProcessesQuery';
import allTopicsQuery from 'js/queries/allTopicsQuery';
import allThemesQuery from 'js/queries/allThemesQuery';
import allDepartmentPagesQuery from 'js/queries/allDepartmentPagesQuery';
import topServicesQuery from 'js/queries/topServicesQuery';
import all311Query from 'js/queries/all311Query';

import {
  cleanLinks,
  cleanDepartments,
  cleanTopics,
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

  const children = await makeChildPages(client);
  const deptChildren = await makeDepartmentPages(client);

  const data = {
    path: path,
    component: 'src/components/Pages/Home',
    children: children.concat(deptChildren),
    getData: async () => {
      const { allServicePages } = await client.request(topServicesQuery);
      const topServices = cleanLinks(allServicePages, '/services');
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

const makeChildPages = client => {
  return Promise.all([
    makeServicePages(client),
    makeInformationPages(client),
    makeProcessPages(client),
    makeTopicPages(client),
    makeThemePages(client),
  ]);
};

const makeServicePages = async client => {
  const { allServicePages: allServices } = await client.request(
    allServicePagesQuery,
  );
  const services = cleanServices(allServices);
  const data = {
    path: '/services',
    component: 'src/components/Pages/Services',
    getData: async () => ({
      services,
    }),
    children: services.map(service => ({
      path: `/${service.slug}`,
      component: 'src/components/Pages/Service',
      getData: async () => ({
        service,
      }),
    })),
  };

  return data;
};

const makeInformationPages = async client => {
  const { allInformationPages: allInformationPages } = await client.request(
    allInformationPagesQuery,
  );
  const informationPages = cleanInformationPages(allInformationPages);
  const data = {
    path: '/information',
    component: 'src/components/Pages/404',
    getData: async () => ({
      informationPages,
    }),
    children: informationPages.map(informationPage => ({
      path: `/${informationPage.slug}`,
      component: 'src/components/Pages/Information',
      getData: async () => ({
        informationPage,
      }),
    })),
  };

  return data;
};

const makeProcessPages = async client => {
  const { allProcesses } = await client.request(allProcessesQuery);
  const processes = cleanProcesses(allProcesses);

  const data = {
    path: '/processes',
    component: 'src/components/Pages/Processes',
    getData: async () => ({
      processes,
    }),
    children: processes.map(process => ({
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
  };

  return data;
};

const makeTopicPages = async client => {
  const { allTopics } = await client.request(allTopicsQuery);
  const topics = cleanTopics(allTopics);

  const data = {
    path: '/topics',
    component: 'src/components/Pages/Topics',
    getData: async () => ({
      topics,
    }),
    children: topics.map(topic => ({
      path: `/${topic.slug}`,
      component: 'src/components/Pages/Topic',
      getData: async () => ({
        topic,
      }),
    })),
  };

  return data;
};

const makeThemePages = async client => {
  const { allThemes } = await client.request(allThemesQuery);
  const themes = cleanThemes(allThemes);

  const data = {
    path: '/themes',
    component: 'src/components/Pages/Themes',
    getData: async () => ({
      themes,
    }),
    children: themes.map(theme => ({
      path: `/${theme.slug}`,
      component: 'src/components/Pages/Theme',
      getData: async () => ({
        theme,
      }),
    })),
  };

  return data;
};

const makeDepartmentPages = async client => {
  const { allDepartmentPages } = await client.request(allDepartmentPagesQuery);
  const departments = cleanDepartments(allDepartmentPages);

  const data = departments.map(department => ({
    path: `/${department.slug}`,
    component: 'src/components/Pages/Department',
    getData: async () => ({
      department,
    }),
  }));

  return data;
};

export default {
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
