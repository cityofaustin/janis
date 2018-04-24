import React from 'react';
import { storiesOf } from '@storybook/react';

import PageBreadcrumbs from 'components/PageBreadcrumbs/PageBreadcrumbs';

const grandparent = {
  slug: "grandparent",
  text: "Grandparent Theme",
  subpath: "themes"
}

const parent = {
  slug: "parent",
  text: "Parent Topic",
  subpath: "topics"
}

storiesOf('PageBreadcrumbs', module)
  .add('PageBreadcrumbs', () => (
    <div className="wrapper container-fluid">
      <PageBreadcrumbs
        grandparent={grandparent}
        parent={parent}
        title="Current page"
      />
    </div>
  ))
