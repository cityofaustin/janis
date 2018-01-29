
import { request } from 'graphql-request';

// QUERIES
import allServicePagesQuery from 'js/queries/allServicePagesQuery';
import servicePageQuery from 'js/queries/servicePageQuery';

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
          getProps: async ({route, dev}) => {
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
        path: '/topic/:id',
        component: 'src/js/pages/Topic',
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
