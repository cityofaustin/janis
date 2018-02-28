
import { GraphQLClient } from 'graphql-request';

// QUERIES
import allServicePagesQuery from 'js/queries/allServicePagesQuery';
import allTopicPagesQuery from 'js/queries/allTopicPagesQuery';
import allDepartmentPagesQuery from 'js/queries/allDepartmentPagesQuery';
import topServicesQuery from 'js/queries/topServicesQuery';
import { SUPPORTED_LANGUAGES } from 'js/constants/languages';

const { CMS_API } = process.env;

export default {
  getSiteProps: () => ({
    title: 'City of Austin',
  }),
  getRoutes: async () => {
    // In order to pass new headers, we have to reintantiate a new
    // GraphQLClient constructor.
    // https://github.com/graphcool/graphql-request/issues/33
    const createGraphQLClientsByLang = async (lang) => {
      return new GraphQLClient(CMS_API, {
        headers: { 'Accept-Language': lang }
      })
    }

    // TODO: There's a bunch of redundant code that could be cleaned up by
    // looping through the SUPPORTED_LANGUAGES.
    const enGraphQLClient = await createGraphQLClientsByLang('en');
    const esGraphQLClient = await createGraphQLClientsByLang('es');
    const viGraphQLClient = await createGraphQLClientsByLang('vi');
    const arGraphQLClient = await createGraphQLClientsByLang('ar');

    const { allServicePages } = await enGraphQLClient.request(allServicePagesQuery)
    const { allTopics } = await enGraphQLClient.request(allTopicPagesQuery)
    const { allDepartments } = await enGraphQLClient.request(allDepartmentPagesQuery)
    const { allServicePages: topServices } = await enGraphQLClient.request(topServicesQuery)

    const { allServicePages: allServicePages_es } = await esGraphQLClient.request(allServicePagesQuery)
    const { allTopics: allTopics_es } = await esGraphQLClient.request(allTopicPagesQuery)
    const { allDepartments: allDepartments_es } = await esGraphQLClient.request(allDepartmentPagesQuery)
    const { allServicePages: topServices_es } = await esGraphQLClient.request(topServicesQuery)

    const { allServicePages: allServicePages_vi } = await viGraphQLClient.request(allServicePagesQuery)
    const { allTopics: allTopics_vi } = await viGraphQLClient.request(allTopicPagesQuery)
    const { allDepartments: allDepartments_vi } = await viGraphQLClient.request(allDepartmentPagesQuery)
    const { allServicePages: topServices_vi } = await viGraphQLClient.request(topServicesQuery)

    const { allServicePages: allServicePages_ar } = await arGraphQLClient.request(allServicePagesQuery)
    const { allTopics: allTopics_ar } = await arGraphQLClient.request(allTopicPagesQuery)
    const { allDepartments: allDepartments_ar } = await arGraphQLClient.request(allDepartmentPagesQuery)
    const { allServicePages: topServices_ar } = await arGraphQLClient.request(topServicesQuery)

    const serviceQueries = {
      en: allServicePages,
      es: allServicePages_es,
      vi: allServicePages_vi,
      ar: allServicePages_ar,
    }

    const topicQueries = {
      en: allTopics,
      es: allTopics_es,
      vi: allTopics_vi,
      ar: allTopics_ar,
    }

    const departmentQueries = {
      en: allDepartments,
      es: allDepartments_es,
      vi: allDepartments_vi,
      ar: allDepartments_ar,
    }

    const allPages = (langCode = 'en') => {
      return [{
        path: '/services',
        component: 'src/js/pages/Services',
        getData: async () => ({
          allServices: serviceQueries[langCode],
          langCode: langCode,
        }),
        children: serviceQueries[langCode].edges.map(({node: service}) => ({
          path: `/${service.slug}`,
          component: 'src/js/pages/Service',
          getData: async () => ({
            service: service,
            langCode: langCode,
          }),
        })),
      },
      {
        path: '/topics',
        component: 'src/js/pages/Topics',
        getData: async () => ({
          allTopics: topicQueries[langCode],
          langCode: langCode,
        }),
        children: topicQueries[langCode].edges.map(({node:topic}) => ({
          path: `/${topic.id}`,
          component: 'src/js/pages/Topic',
          getData: async () => ({
            topic: topic,
            langCode: langCode,
          })
        }))
      },
      {
        path: '/departments',
        component: 'src/js/pages/Departments',
        getData: async () => ({
          allDepartments: departmentQueries[langCode],
          langCode: langCode,
        }),
        children: departmentQueries[langCode].edges.map(({node:department}) => ({
          path: `${department.id}`,
          component: 'src/js/pages/Department',
          getData: async () => ({
            department: department,
            langCode: langCode,
          })
        }))
      },
      {
        path: '/search',
        component: 'src/js/pages/Search',
        getData: async () => ({
          langCode: "en", //TODO: update search page to be conscious of all languages
        })
      },
    ]}


    return [
      ...allPages(),
      {
        path: '/',
        component: 'src/js/pages/Home',
        getData: async () => ({
          langCode: "en",
          topServices,
        }),
      },
      {
        path: `/en`,
        component: 'src/js/pages/Home',
        children: allPages('en'),
        getData: async () => ({
          langCode: "en",
          topServices,
        }),
      },
      {
        path: `/es`,
        component: 'src/js/pages/Home',
        children: allPages('es'),
        getData: async () => ({
          langCode: "es",
          topServices: topServices_es,
        }),
      },
      {
        path: `/vi`,
        component: 'src/js/pages/Home',
        children: allPages('vi'),
        getData: async () => ({
          langCode: "vi",
          topServices: topServices_vi,
        }),
      },
      {
        path: `/ar`,
        component: 'src/js/pages/Home',
        children: allPages('ar'),
        getData: async () => ({
          langCode: "ar",
          topServices: topServices_ar,
        }),
      },
      {
        is404: true,
        component: 'src/js/pages/404', //TODO: update 404 page to be conscious of all languages
      },
    ]
  },
}
