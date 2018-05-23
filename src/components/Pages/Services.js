import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

import { services as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';
import FormFeedback from 'components/FormFeedback';

import { cleanLinks } from 'js/helpers/cleanData';

const Services = ({ allServices, intl }) => {
  //TODO: clean data where sourced
  const relatedLinks = cleanLinks(allServices, '/services');

  return (
    <div>
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader
          title="Use City of Austin Services"
          description="The City of Austin provides hundreds of services to people. This is a short list of services that will grow over time."
        />
      </div>
      <div className="wrapper container-fluid">
        <TileGroup
          tiles={relatedLinks}
          tag={intl.formatMessage(i18n.service)}
        />
      </div>
      <div className="wrapper wrapper--sm container-fluid">
        <FormFeedback />
      </div>
    </div>
  );
};

export default withRouteData(injectIntl(Services));
