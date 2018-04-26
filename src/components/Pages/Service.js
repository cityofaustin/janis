import React from 'react';
import { withRouteData } from 'react-static';
import { defineMessages, injectIntl } from 'react-intl';
import { findKey } from 'lodash';

import PageBanner from 'components/PageBanner';
import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageHeader from 'components/PageHeader';
import Steps from 'components/Steps';
import HtmlFromAdmin from 'components/HtmlFromAdmin';
import ApplicationBlock from 'components/ApplicationBlock';
import ContactDetails from 'components/Contact/ContactDetails';
import SectionHeader from 'components/SectionHeader';
import TileGroup from 'components/Tiles/TileGroup';
import FormFeedback from 'components/FormFeedback';

import { cleanContacts, cleanRelatedServiceLinks } from 'js/helpers/cleanData';

const i18nMessages = defineMessages({
  serviceRelatedlinksSectionheader: {
    id: 'Service.RelatedLinks.SectionHeader',
    defaultMessage: 'Check out related services',
  },
  serviceRelatedlinksTag: {
    id: 'Service.RelatedLinks.Tag',
    defaultMessage: 'Service',
  },
  htmlFromAdminSectionTitle: {
    id: 'HtmlFromAdmin.SectionTitle',
    defaultMessage: 'What else do I need to know?',
  },
});

const Service = ({ service, intl }) => {
  const {
    image,
    title,
    slug,
    topic,
    topic: { theme },
    steps,
    dynamicContent,
    additionalContent,
    contacts,
    related,
  } = service;

  //TODO: clean data where sourced
  const contact = cleanContacts(contacts)[0];
  const cleanedRelated = cleanRelatedServiceLinks(related);

  //TODO: mapblock data should include contact data when sent via joplin
  const tempkey = findKey(dynamicContent, { type: 'map_block' });
  if (tempkey) dynamicContent[tempkey].value['contact'] = contact;

  return (
    <div>
      <PageBanner
        imageUrl={`${process.env.CMS_MEDIA}/${image.file}`}
        imageTitle={image.title}
      />
      <PageBreadcrumbs
        grandparent={{ ...theme, subpath: 'themes' }}
        parent={{ ...topic, subpath: 'topics' }}
        title={title}
      />
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader title={title} />

        {steps && <Steps stepsAsHtmlFromAdmin={steps} />}

        {!!dynamicContent &&
          dynamicContent.map(content => (
            <ApplicationBlock key={content.id} content={content} />
          ))}

        {additionalContent && (
          <HtmlFromAdmin
            title={intl.formatMessage(i18nMessages.htmlFromAdminSectionTitle)}
            content={additionalContent}
          />
        )}

        {contact && <ContactDetails contact={contact} />}
      </div>

      <div className="wrapper container-fluid">
        <TileGroup
          title={intl.formatMessage(
            i18nMessages.serviceRelatedlinksSectionheader
          )}
          tiles={cleanedRelated}
          tag={intl.formatMessage(i18nMessages.serviceRelatedlinksTag)}
        />
      </div>

      <div className="wrapper wrapper--sm container-fluid">
        <FormFeedback />
      </div>
    </div>
  );
};

export default withRouteData(injectIntl(Service));
