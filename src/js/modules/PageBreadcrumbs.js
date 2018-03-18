import React from 'react';
import I18nNavLink from 'js/modules/I18nNavLink';

const PageBreadcrumbs = ({ breadcrumbs=[] }) => {
  breadcrumbs.unshift({
    title: 'Home',
    slug: '/',
  });

  const JSX = breadcrumbs.map(breadcrumb =>
    <I18nNavLink
      to={breadcrumb.slug}>
      {breadcrumb.title}
    </I18nNavLink>
  );

  return (
    <div className="coa-PageBreadcrumbs wrapper">{JSX}</div>
  );
}

export default PageBreadcrumbs;
