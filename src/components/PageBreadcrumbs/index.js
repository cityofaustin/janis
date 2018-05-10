import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { navigation as i18n } from 'js/i18n/definitions';

import I18nLink from 'components/I18n/I18nLink';

const Breadcrumb = ({ breadcrumb, classNameSuffix }) => (
  <I18nLink
    className={`coa-PageBreadcrumbs__${classNameSuffix}`}
    to={
      breadcrumb.subpath
        ? `/${breadcrumb.subpath}/${breadcrumb.slug}`
        : `/${breadcrumb.slug}`
    }
  >
    {breadcrumb.text}
  </I18nLink>
);

Breadcrumb.propTypes = {
  breadcrumb: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    subpath: PropTypes.string,
    text: PropTypes.string.isRequired,
  }).isRequired,
  classNameSuffix: PropTypes.string.isRequired,
};

const PageBreadcrumbs = ({ intl, title, grandparent, parent }) => (
  <div className="wrapper container-fluid">
    <div className="coa-PageBreadcrumbs">
      <Breadcrumb
        breadcrumb={{
          text: intl.formatMessage(i18n.home),
          slug: '',
        }}
        classNameSuffix="home"
      />
      {grandparent && (
        <Breadcrumb breadcrumb={grandparent} classNameSuffix="grandparent" />
      )}
      {parent && <Breadcrumb breadcrumb={parent} classNameSuffix="parent" />}
      <span className="coa-PageBreadcrumbs__title">{title}</span>
    </div>
  </div>
);

PageBreadcrumbs.propTypes = {
  title: PropTypes.string.isRequired,
  parent: PropTypes.object,
  grandparent: PropTypes.object,
};

export default injectIntl(PageBreadcrumbs);
