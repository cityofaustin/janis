import React from 'react';
import { withRouteData } from 'react-static';
import { defineMessages, injectIntl } from 'react-intl';

import PageHeader from 'components/PageHeader/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';
import ThreeOneOne from 'components/PageSections/ThreeOneOne/ThreeOneOne';

import { cleanLinks } from 'js/helpers/cleanData';

const i18nMessages = defineMessages({
  servicesPageTitle: {
    id: 'Services.title',
    defaultMessage: 'Use City of Austin Services',
  },
  servicePageDescription: {
    id: 'Services.description',
    defaultMessage: 'The City of Austin provides hundreds of services to people. This is a short list of services that will grow over time.',
  }
})

const Services = ({ allServices, intl }) => {
  //TODO: clean data where sourced
  const relatedLinks = cleanLinks(allServices, '/services');

  return (
    <div>
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader
          title={intl.formatMessage(i18nMessages.servicesPageTitle)}
          description={intl.formatMessage(i18nMessages.servicePageDescription)}
        />
      </div>
      <div className="wrapper container-fluid">
        <TileGroup tiles={relatedLinks} tag="service" />
      </div>
    </div>
  )
}

export default withRouteData(injectIntl(Services))
