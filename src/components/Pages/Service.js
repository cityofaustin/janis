import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';
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

const Service = ({
  service: {
    image,
    text: title,
    slug,
    topic,
    topic: { theme },
    steps,
    dynamicContent,
    additionalContent,
    contacts,
    related,
  },
  intl,
}) => (
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

      {!!contacts &&
        !!contacts.length && <ContactDetails contact={contacts[0]} />}
    </div>

    <div className="wrapper container-fluid">
      <TileGroup
        text={intl.formatMessage(i18n3.checkOutRelatedServices)}
        tiles={related}
        tag={intl.formatMessage(i18n3.service)}
      />
    </div>
  </div>
);

export default withRouteData(injectIntl(Service));
