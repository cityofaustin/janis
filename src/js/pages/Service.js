import React from 'react';
import { withRouteData } from 'react-static';
import { defineMessages, injectIntl } from 'react-intl';
import { cleanContacts, cleanRelatedServiceLinks } from 'js/helpers/cleanData';

import PageBanner from 'js/modules/PageBanner';
import PageBreadcrumbs from 'js/modules/PageBreadcrumbs';
import PageHeader from 'js/modules/PageHeader';
import Steps from 'js/modules/Steps';
import HtmlFromAdmin from 'js/modules/HtmlFromAdmin';
import ApplicationBlock from 'js/modules/ApplicationBlock';
import ContactDetails from 'js/modules/ContactDetails';

import RelatedLinks from 'js/page_sections/RelatedLinks';
import Service311 from 'js/page_sections/Service311';

import jsonFileData from '__tmpdata/pages';

const i18nMessages = defineMessages({
  serviceRelatedlinksSectionheader: {
    id: 'Service.RelatedLinks.SectionHeader',
    defaultMessage: 'Check out related city services',
  }
});

const Service = ({ service }) => {
  const { image, title, slug, steps, dynamicContent, additionalContent, contacts, related } = service;

  //TODO: data below should be sourced as above
  const { servicepage, services311 } = jsonFileData;
  const { theme, topic } = servicepage;

  //TODO: clean data where sourced
  const contact = cleanContacts(contacts)[0];
  const cleanedRelated = cleanRelatedServiceLinks(related);

  return (
    <div>
      <PageBanner image={image} />
      <PageBreadcrumbs title={title} order={['theme', 'topic']} theme={theme} topic={topic} />
      <div className="wrapper wrapper--sm container-fluid">

        <PageHeader title={title} />

        { steps && <Steps steps={steps} /> }

        { (dynamicContent && dynamicContent.length) && (
          dynamicContent.map((content) => (
            <ApplicationBlock key={content.id} type={content.type} data={content.value} />
          ))
        )}

        { additionalContent && <HtmlFromAdmin key={additionalContent.id} content={additionalContent.value} /> }

        { contact &&<ContactDetails contact={contact} /> }

      </div>



      <RelatedLinks
        relatedLinks={cleanedRelated}
        sectionStyle="primary"
        sectionTitle="Check out related city services"
        sectionText={null}
      />

      <Service311 services311={services311} />

    </div>
  )
}

export default withRouteData(Service);
