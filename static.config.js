
import { request } from 'graphql-request';

// QUERIES
import allServicePagesQuery from 'js/queries/allServicePagesQuery';
import servicePageQuery from 'js/queries/servicePageQuery';
import allTopicPagesQuery from 'js/queries/allTopicPagesQuery';
import topicPageQuery from 'js/queries/topicPageQuery';
import departmentPageQuery from 'js/queries/departmentPageQuery';
import { SUPPORTED_LANGUAGES } from 'js/constants/languages';

const { CMS_API } = process.env;

export default {
  getSiteProps: () => ({
    title: 'City of Austin',
  }),
  getRoutes: async () => {

    const { allServicePages } = await request(
      CMS_API,
      allServicePagesQuery
    )

    const { allTopics } = await request(
      CMS_API,
      allTopicPagesQuery
    )

    const { allDepartments } = await request(
      CMS_API,
      departmentPageQuery
    )

    const allPages = [
      {
        path: '/services',
        component: 'src/js/pages/Services',
        getProps: () => ({
          allServicePages,
        }),
        children: allServicePages.edges.map(service => ({
          path: `/${service.node.slug}`,
          component: 'src/js/pages/Service',
          getProps: async () => {
            const { servicePage } = await request(
              CMS_API,
              servicePageQuery,
              { slug: service.node.slug }
            );
            return { servicePage };
          },
        })),
      },
      {
        path: '/topics',
        component: 'src/js/pages/Topics',
        getProps: () => ({
          allTopics,
        }),
        children: allTopics.edges.map(topic => ({
          path: `/${topic.node.id}`,
          component: 'src/js/pages/Topic',
          getProps: async () => {
            const { allTopics } = await request(
              CMS_API,
              topicPageQuery,
              { id: topic.node.id },
            );
            return allTopics.edges[0].node;
          }
        }))
      },
      {
        path: '/departments',
        component: 'src/js/pages/Departments',
        getProps: () => ({
          allDepartments
        }),
        children: allDepartments.edges.map(dept => ({
          path: `${dept.node.id}`,
          component: 'src/js/pages/Department',
          getProps: async () => {
            const { allDepartments } = await request(
              CMS_API,
              departmentPageQuery,
              { id: dept.node.id },
            );
            const departmentData = allDepartments.edges[0]
            return departmentData;
          }
        }))
      },
      {
        path: '/search',
        component: 'src/js/pages/Search',
      },
    ]

    const allPagesWithLangCode = [];

    SUPPORTED_LANGUAGES.map((lang) => {
      allPagesWithLangCode.push({
        path: `/${lang.code}`,
        component: 'src/js/pages/Home',
        children: allPages,
      });
    });

    return [
      {
        path: '/',
        component: 'src/js/pages/Home',
      },
      ...allPagesWithLangCode,
      ...allPages,
      {
        is404: true,
        component: 'src/js/pages/404',
      },
    ]
  },
}
