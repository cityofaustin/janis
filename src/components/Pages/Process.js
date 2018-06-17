import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

import { processes as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';

const Process = ({ process: { text: title, processSteps }, intl }) => (
  <div>
    <div className="wrapper wrapper--sm container-fluid">
      <PageHeader title={title} />
    </div>
    <div className="wrapper container-fluid">
      <TileGroup tiles={processSteps} tag={intl.formatMessage(i18n.process)} />
    </div>
  </div>
);

export default withRouteData(injectIntl(Process));
