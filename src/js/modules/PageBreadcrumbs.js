import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import I18nLink from 'js/modules/I18nLink';

const Breadcrumb = ({ breadcrumb, classNameSuffix }) => (
  <I18nLink
    className={`coa-PageBreadcrumbs__${classNameSuffix}`}
    to={breadcrumb.subpath ?
      `/${breadcrumb.subpath}/${breadcrumb.slug}` :
      `/${breadcrumb.slug}`
    }
  >
    {breadcrumb.text}
  </I18nLink>
);

const PageBreadcrumbs = ({ intl, title, grandparent, parent }) => {

  const i18nMessages = defineMessages({
    home: {
      id: 'PageBreadcrumbs.Home.text',
      defaultMessage: 'Home',
    }
  });

  const home = ({
    text: intl.formatMessage(i18nMessages.home),
    slug: '',
  });

  return (
    <div className="wrapper container-fluid">
      <div className="coa-PageBreadcrumbs">
        <Breadcrumb breadcrumb={home} classNameSuffix="home" />
        { grandparent && <Breadcrumb breadcrumb={grandparent} classNameSuffix="grandparent" />}
        { parent && <Breadcrumb breadcrumb={parent} classNameSuffix="parent" />}
        <span className="coa-PageBreadcrumbs__title">{title}</span>
      </div>
    </div>
  );
}

export default injectIntl(PageBreadcrumbs);
