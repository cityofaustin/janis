import React from 'react';
import { withRouteData } from 'react-static';
import { defineMessages, injectIntl } from 'react-intl';
import { cleanContacts, cleanRelatedServiceLinks } from 'js/helpers/cleanData';

import PageBanner from 'js/modules/PageBanner';
import ContentItems from 'js/page_sections/ContentItems';
import Contact from 'js/page_sections/Contact';
import RelatedLinks from 'js/page_sections/RelatedLinks';
import Service311 from 'js/page_sections/Service311';
import HtmlFromAdmin from 'js/modules/HtmlFromAdmin';
import I18nLink from 'js/modules/I18nLink';

import jsonFileData from '__tmpdata/services';

const i18nMessages = defineMessages({
  serviceRelatedlinksSectionheader: {
    id: 'Service.RelatedLinks.SectionHeader',
    defaultMessage: 'Check out related city services',
  }
});

const Service = ({ service }) => {
  const { topic={}, image, title, steps, extraContent, contacts, related } = service;
  const { services311 } = jsonFileData;
  const cleanedContacts = cleanContacts(contacts);
  const cleanedRelated = cleanRelatedServiceLinks(related);

  return (
    <div>
      <PageBanner image={image} />

              { topic.id && (
                <I18nLink className="coa-main__breadcrumb"
                  to={`/topics/${topic.id}`}>
                  {topic.name}
                </I18nLink>
              )}

              <h2 className="coa-main__title">{title}</h2>

              { steps && (
                <div className="coa-main__steps">
                  <HtmlFromAdmin content={steps} />
                </div>
              )}

            <ContentItems contentItems={extraContent} />

            <Contact contacts={contacts} />

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
