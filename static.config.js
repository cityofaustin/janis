
import { request } from 'graphql-request';

// QUERIES
import allServicePagesQuery from 'js/queries/allServicePagesQuery';
import servicePageQuery from 'js/queries/servicePageQuery';
import allTopicPagesQuery from 'js/queries/allTopicPagesQuery';
import topicPageQuery from 'js/queries/topicPageQuery';

// TODO: clean this up so its defined as an env var
const CMS_API = `http://${process.env.API_URL}:8000/api/graphql/`;

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


    return [
      {
        path: '/',
        component: 'src/js/pages/Home',
      },
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
        path: '/department/:id',
        component: 'src/js/pages/Department',
      },
      {
        path: '/search',
        component: 'src/js/pages/Search',
      },
      {
        is404: true,
        component: 'src/js/pages/404',
      },
    ]
  },
}
