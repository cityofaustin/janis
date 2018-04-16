import React from 'react';
import { withRouteData } from 'react-static';
import { defineMessages, injectIntl } from 'react-intl';
import { get } from 'lodash';

import PageHeader from 'js/modules/PageHeader';
import TileGroup from 'js/modules/TileGroup';
import ThreeOneOne from 'js/page_sections/ThreeOneOne';

import { cleanServiceLinks } from 'js/helpers/cleanData';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';
const services311 = get(jsonFileData, "services311", null);

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
  const relatedLinks = cleanServiceLinks(allServices)

  return (
    <div>
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader
          title={intl.formatMessage(i18nMessages.servicesPageTitle)}
          description={intl.formatMessage(i18nMessages.servicePageDescription)}
        />
      </div>
      <div className="wrapper container-fluid">
        <TileGroup tiles={relatedLinks} />
      </div>
      <ThreeOneOne services311={services311} />
    </div>
  )
}

export default withRouteData(injectIntl(Services))
