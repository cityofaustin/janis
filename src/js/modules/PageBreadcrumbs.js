import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import I18nNavLink from 'js/modules/I18nNavLink';

const PageBreadcrumbs = ({ intl, title, order, ...rest }) => {

  const i18nMessages = defineMessages({
    home: {
      id: 'PageBreadcrumbs.Home.text',
      defaultMessage: 'Home',
    }
  });

  const breadcrumbs = order.map(breadcrumb => ({
    className: breadcrumb,
    text: rest[breadcrumb].text,
    slug: `/${breadcrumb}s/${rest[breadcrumb].slug}`,
  }));

  breadcrumbs.unshift({
    className: 'home',
    text: intl.formatMessage(i18nMessages.home),
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

export default injectIntl(PageBreadcrumbs);
