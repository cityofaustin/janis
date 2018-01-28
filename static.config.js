
import { request } from 'graphql-request';

import allServicePagesQuery from 'js/queries/allServicePagesQuery';
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
        })
      },
      {
        path: '/service/:slug',
        component: 'src/js/pages/Service',
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
      // {
      //   path: '/blog',
      //   component: 'src/containers/Blog',
      //   getProps: () => ({
      //     posts,
      //   }),
      //   children: posts.map(post => ({
      //     path: `/post/${post.id}`,
      //     component: 'src/containers/Post',
      //     getProps: () => ({
      //       post,
      //     }),
      //   })),
      // },
      {
        is404: true,
        component: 'src/js/pages/404',
      },
    ]
  },
}
