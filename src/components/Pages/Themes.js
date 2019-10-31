import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

import { themes as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';

const Themes = ({ themes, intl }) => (
  <div>
    <div className="wrapper wrapper--sm container-fluid">
      <PageHeader>All Themes</PageHeader>
    </div>
    <div className="wrapper container-fluid">
      <TileGroup tiles={themes} tag={intl.formatMessage(i18n.theme)} />
    </div>
  </div>
);

export default withRouteData(injectIntl(Themes));
