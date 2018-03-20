import React from 'react';
import I18nNavLink from 'js/modules/I18nNavLink';

const PageBreadcrumbs = (props) => {

  const { title, order, ...rest } = props;

  const breadcrumbs = order.map(breadcrumb => ({
    className: breadcrumb,
    title: rest[breadcrumb].title,
    slug: rest[breadcrumb].slug,
  }));

  breadcrumbs.unshift({
    className: 'home',
    title: 'Home',
    slug: '/',
  });

  const JSX = breadcrumbs.map((breadcrumb, index) =>
    <I18nNavLink
      key={index}
      className={`coa-PageBreadcrumbs__${breadcrumb.className}`}
      to={breadcrumb.slug}
    >
      {breadcrumb.title}
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
