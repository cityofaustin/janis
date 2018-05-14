import { GraphQLClient } from 'graphql-request';
import { SUPPORTED_LANG_CODES } from 'js/i18n/constants';

// QUERIES
import allServicePagesQuery from 'js/queries/allServicePagesQuery';
import allTopicPagesQuery from 'js/queries/allTopicPagesQuery';
import allThemesQuery from 'js/queries/allThemesQuery';
import allDepartmentPagesQuery from 'js/queries/allDepartmentPagesQuery';
import topServicesQuery from 'js/queries/topServicesQuery';
import all311Query from 'js/queries/all311Query';

import { clean311 } from 'js/helpers/cleanData';

const createGraphQLClientsByLang = lang => {
  const { CMS_API } = process.env;

  return new GraphQLClient(CMS_API, {
    headers: { 'Accept-Language': lang },
  });
};

const makeAllPages = async langCode => {
  const path = `/${!!langCode ? langCode : ''}`;
  console.log(`- Building routes for ${path}...`);

  const client = createGraphQLClientsByLang(langCode);

  const data = {
    path: path,
    component: 'src/components/Pages/Home',
    children: await makeChildPages(client),
    getData: async () => {
      const { allServicePages: topServices } = await client.request(
        topServicesQuery,
      );
      return {
        topServices,
        image: {
          file: 'original_images/lady-bird-lake.jpg',
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
    makeTopicPages(client),
    makeThemePages(client),
    makeDepartmentPages(client),
  ]);
};

const makeServicePages = async client => {
  const { allServicePages: allServices } = await client.request(
    allServicePagesQuery,
  );

  const data = {
    path: '/services',
    component: 'src/components/Pages/Services',
    getData: async () => ({
      allServices,
    }),
    children: allServices.edges.map(({ node: service }) => ({
      path: `/${service.slug}`,
      component: 'src/components/Pages/Service',
      getData: async () => ({
        service,
      }),
    })),
  };

  return data;
};

const makeTopicPages = async client => {
  const { allTopics } = await client.request(allTopicPagesQuery);

  const data = {
    path: '/topics',
    component: 'src/components/Pages/Topics',
    getData: async () => ({
      allTopics,
    }),
    children: allTopics.edges.map(({ node: topic }) => ({
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

  const data = {
    path: '/themes',
    component: 'src/components/Pages/Themes',
    getData: async () => ({
      allThemes,
    }),
    children: allThemes.edges.map(({ node: theme }) => ({
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
  const { allDepartments } = await client.request(allDepartmentPagesQuery);

  const data = {
    path: '/departments',
    component: 'src/components/Pages/Departments',
    getData: async () => ({
      allDepartments,
    }),
    children: allDepartments.edges.map(({ node: department }) => ({
      path: `${department.id}`,
      component: 'src/components/Pages/Department',
      getData: async () => ({
        department,
      }),
    })),
  };

  return data;
};

export default {
  getSiteProps: () => ({
    title: 'City of Austin',
  }),
  getSiteData: async () => {
    const queries = [
      { query: allThemesQuery, dataKey: 'navigation' },
      { query: all311Query, dataKey: 'threeoneone', middleware: clean311 },
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
      {
        path: '/forms/foster-pet',
        component: 'src/components/Forms/FosterPetForm',
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
