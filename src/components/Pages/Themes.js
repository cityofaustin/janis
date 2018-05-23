import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

import { themes as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';
import FormFeedback from 'components/FormFeedback';
import { cleanLinks } from 'js/helpers/cleanData';

const Themes = ({ allThemes, intl }) => {
  const links = cleanLinks(allThemes, '/themes');

  return (
    <div>
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader title={'All Themes'} />
      </div>
      <div className="wrapper container-fluid">
        <TileGroup tiles={links} tag={intl.formatMessage(i18n.theme)} />
      </div>
      <div className="wrapper wrapper--sm container-fluid">
        <FormFeedback />
      </div>
    </div>
  );
};

export default withRouteData(injectIntl(Themes));
