import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

import { topics as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';
import FormFeedback from 'components/FormFeedback';

const Topics = ({ topics, intl }) => (
  <div>
    <div className="wrapper wrapper--sm container-fluid">
      <PageHeader title={'All Topics'} />
    </div>
    <div className="wrapper container-fluid">
      <TileGroup tiles={topics} tag={intl.formatMessage(i18n.topic)} />
    </div>
    <div className="wrapper wrapper--sm container-fluid">
      <FormFeedback />
    </div>
  </div>
);

export default withRouteData(injectIntl(Topics));
