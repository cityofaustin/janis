import React from 'react';
import { withRouteData } from 'react-static';
import { defineMessages, injectIntl } from 'react-intl';

import PageBanner from 'js/modules/PageBanner';
import PageBreadcrumbs from 'js/modules/PageBreadcrumbs';
import PageHeader from 'js/modules/PageHeader';
import Steps from 'js/modules/Steps';
import HtmlFromAdmin from 'js/modules/HtmlFromAdmin';
import ApplicationBlock from 'js/modules/ApplicationBlock';
import ContactDetails from 'js/modules/ContactDetails';
import SectionHeader from 'js/modules/SectionHeader';
import TileGroup from 'js/modules/TileGroup';

import ThreeOneOne from 'js/page_sections/ThreeOneOne';

import { cleanContacts, cleanRelatedServiceLinks } from 'js/helpers/cleanData';
import jsonFileData from '__tmpdata/pages';

const i18nMessages = defineMessages({
  serviceRelatedlinksSectionheader: {
    id: 'Service.RelatedLinks.SectionHeader',
    defaultMessage: 'Check out related services',
  },
  serviceRelatedlinksTag: {
    id: 'Service.RelatedLinks.Tag',
    defaultMessage: 'Service',
  }
});

const Service = ({ service, intl }) => {
  const {
    image, title, slug, topic, steps, dynamicContent, additionalContent,
    contacts, related
  } = service;

  const { theme } = topic;

  //TODO: data below should be sourced as above
  const { services311 } = jsonFileData;

  //TODO: clean data where sourced
  const contact = cleanContacts(contacts)[0];
  const cleanedRelated = cleanRelatedServiceLinks(related);

  return (
    <div>
      <PageBanner image={image} />
      <PageBreadcrumbs
        grandparent={{...theme, subpath: 'themes'}}
        parent={{...topic, subpath: 'topics'}}
        title={title}
      />
      <div className="wrapper wrapper--sm container-fluid">

        <PageHeader title={title} />

        { steps && <Steps steps={steps} /> }

        { !!dynamicContent && (
          dynamicContent.map(content =>
            <ApplicationBlock key={content.id} content={content} />
          )
        )}

        { additionalContent && <HtmlFromAdmin content={additionalContent} /> }

        { contact && <ContactDetails contact={contact} /> }

      </div>

      <div className="wrapper container-fluid">
        <SectionHeader title={intl.formatMessage(i18nMessages.serviceRelatedlinksSectionheader)} />
        <TileGroup tiles={cleanedRelated} tag={intl.formatMessage(i18nMessages.serviceRelatedlinksTag)} />
      </div>

      <ThreeOneOne services311={services311} />

    </div>
  )
}

export default withRouteData(injectIntl(Service));
