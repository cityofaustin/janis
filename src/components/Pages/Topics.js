import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

import { topics as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';

const Topics = ({ topics, intl }) => (
  <div>
    <div className="wrapper wrapper--sm container-fluid">
      <PageHeader>All Topics</PageHeader>
    </div>
    <div className="wrapper container-fluid">
      <TileGroup tiles={topics} tag={intl.formatMessage(i18n.topic)} />
    </div>
  </div>
);

export default withRouteData(injectIntl(Topics));
