import React from 'react';

import PageBreadcrumbs from 'components/PageBreadcrumbs';

const grandparent = {
  slug: 'grandparent',
  text: 'Grandparent Theme',
  subpath: 'themes',
};

const parent = {
  slug: 'parent',
  text: 'Parent Topic',
  subpath: 'topics',
};

export default {
  title: 'PageBreadcrumbs',
};

export const pageBreadcrumbs = () => (
  <div className="wrapper container-fluid">
    <PageBreadcrumbs grandparent={grandparent} parent={parent} title="Current page" />
  </div>
);

pageBreadcrumbs.story = {
  name: 'PageBreadcrumbs',
};
