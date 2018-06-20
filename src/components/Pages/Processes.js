import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

import { processes as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';

const Processes = ({ processes, intl }) => (
  <div>
    <div className="wrapper wrapper--sm container-fluid">
      <PageHeader description="The City of Austin provides hundreds of services to people. This is a short list of processes that will grow over time.">
        Use City of Austin Processes
      </PageHeader>
    </div>
    <div className="wrapper container-fluid">
      <TileGroup tiles={processes} tag={intl.formatMessage(i18n.process)} />
    </div>
  </div>
);

export default withRouteData(injectIntl(Processes));
