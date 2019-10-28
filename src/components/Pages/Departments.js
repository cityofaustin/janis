import React from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { services as i18n, departments as i18n2 } from 'js/i18n/definitions';

import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageHeader from 'components/PageHeader';
import SectionHeader from 'components/SectionHeader';
import TileGroup from 'components/Tiles/TileGroup';

const Departments = ({ departments, intl }) => (
  <div>
    <Head>
      <title>Departments</title>
    </Head>
    <PageHeader>{intl.formatMessage(i18n2.departments)}</PageHeader>
    <div className="wrapper container-fluid">
      <TileGroup tiles={departments} />
    </div>
  </div>
);

export default withRouteData(injectIntl(Departments));
