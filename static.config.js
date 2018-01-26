import axios from 'axios'

export default {
  getSiteProps: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return [
      {
        path: '/',
        component: 'src/js/pages/Home',
      },
      {
        path: '/services',
        component: 'src/js/pages/Services',
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
        component: 'src/containers/404',
      },
    ]
  },
}
