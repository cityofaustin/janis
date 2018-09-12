import formConfig from './config/form';
import Form from './Form.jsx';

import FormPage from 'us-forms-system/lib/js/containers/FormPage';
import ReviewPage from 'us-forms-system/lib/js/review/ReviewPage';

import {
  createFormPageList,
  createPageList,
} from 'us-forms-system/lib/js/helpers';

export function makeRoutes(withRouter) {
  const formPages = createFormPageList(formConfig);
  const pageList = createPageList(formConfig, formPages);
  let routes = formPages.map(page => {
    return {
      path: page.path,
      component: withRouter(page.component || FormPage),
      pageConfig: page,
      pageList,
      urlPrefix: formConfig.urlPrefix,
    };
  });
  if (formConfig.introduction) {
    routes = [
      {
        path: 'introduction',
        component: withRouter(formConfig.introduction),
        formConfig,
        pageList,
      },
    ].concat(routes);
  }

  routes = routes.concat([
    {
      path: 'review-and-submit',
      formConfig,
      component: withRouter(ReviewPage),
      pageList,
    },
    {
      path: 'confirmation',
      component: formConfig.confirmation, //withRouter
    },
    {
      path: '*',
      onEnter: (nextState, replace) => replace(formConfig.urlPrefix || '/'),
    },
  ]);

  return {
    path: '/',
    component: Form,
    indexRoute: {
      onEnter: (nextState, replace) =>
        replace(formConfig.urlPrefix + routes[0].path),
    },
    childRoutes: routes,
  };
}
