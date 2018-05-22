import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';
import { findKey } from 'lodash';
import path from 'path';

import { misc as i18n2, services as i18n3 } from 'js/i18n/definitions';

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
        imagesPath={`${process.env.CMS_MEDIA}/images`}
        imageFilename={path.basename(image.filename, path.extname(image.filename))}
        imageExtension={path.extname(image.filename)}
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
            title={intl.formatMessage(i18n2.whatElse)}
            content={additionalContent}
          />
        )}

        {contact && <ContactDetails contact={contact} />}
      </div>

      <div className="wrapper container-fluid">
        <TileGroup
          title={intl.formatMessage(i18n3.checkOutRelatedServices)}
          tiles={cleanedRelated}
          tag={intl.formatMessage(i18n3.service)}
        />
      </div>

      <div className="wrapper wrapper--sm container-fluid">
        <FormFeedback />
      </div>
    </div>
  );
};

export default withRouteData(injectIntl(Service));
