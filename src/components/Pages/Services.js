import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

import { services as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';

import { cleanLinks } from 'js/helpers/cleanData';

const Services = ({ allServices, intl }) => {
  //TODO: clean data where sourced
  const relatedLinks = cleanLinks(allServices, '/services');
  //TODO: should PageHeader content be served from CMS, if so remove static translations
  return (
    <div>
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader
          title={intl.formatMessage(i18n.useServices)}
          description={intl.formatMessage(i18n.servicesBodyText)}
        />
      </div>
      <div className="wrapper container-fluid">
        <TileGroup tiles={relatedLinks} tag={intl.formatMessage(i18n.service)} />
      </div>
    </div>
  );
};

export default withRouteData(injectIntl(Services));
