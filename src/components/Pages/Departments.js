import React from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { services as i18n } from 'js/i18n/definitions';

import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageHeader from 'components/PageHeader';
import SectionHeader from 'components/SectionHeader';
import TileGroup from 'components/Tiles/TileGroup';

const Departments = ({ departments }) => {
  const departmentLinks = departments.map(d => ({
    url: `/${d.slug}`,
    text: d.title,
  }));

  return (
    <div>
      <Head>
        <title>Departments</title>
      </Head>
      <PageHeader contentType={'information'}>Departments</PageHeader>
      <div className="wrapper container-fluid">
        <TileGroup tiles={departmentLinks} />
      </div>
    </div>
  );
};

export default withRouteData(injectIntl(Departments));
