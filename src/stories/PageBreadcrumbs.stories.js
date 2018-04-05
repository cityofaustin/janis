import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';



import PageBreadcrumbs from 'js/modules/PageBreadcrumbs';

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
  .addDecorator(checkA11y)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('PageBreadcrumbs', () => (
    <IntlProvider locale="en">
      <div className="wrapper container-fluid">
        <PageBreadcrumbs
          grandparent={grandparent}
          parent={parent}
          title="Current page"
        />
      </div>
    </IntlProvider>
  ))
