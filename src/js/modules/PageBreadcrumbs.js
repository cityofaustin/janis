import React from 'react';
import I18nNavLink from 'js/modules/I18nNavLink';

const PageBreadcrumbs = ({ title, order, ...rest }) => {

  const breadcrumbs = order.map(breadcrumb => ({
    className: breadcrumb,
    text: rest[breadcrumb].text,
    slug: `/${breadcrumb}s/${rest[breadcrumb].id}`,
  }));

  breadcrumbs.unshift({
    className: 'home',
    text: 'Home',
    slug: '/',
  });

  const JSX = breadcrumbs.map((breadcrumb, index) =>
    <I18nNavLink
      key={index}
      className={`coa-PageBreadcrumbs__${breadcrumb.className}`}
      to={breadcrumb.slug}
    >
      {breadcrumb.text}
    </I18nNavLink>
  );

  return (
    <div className="wrapper container-fluid">
      <div className="coa-PageBreadcrumbs">
        {JSX}
        <span className="coa-PageBreadcrumbs__title">{title}</span>
      </div>
    </div>
  );
}

export default PageBreadcrumbs;
