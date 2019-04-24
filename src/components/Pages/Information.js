import React, { Fragment } from 'react';
import { withRouteData, Head } from 'react-static';
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
import ContextualNav from 'components/PageSections/ContextualNav';

const InformationPage = ({
  informationPage: {
    text: title,
    slug,
    topic,
    topics,
    theme,
    department,
    toplink,
    description,
    options,
    additionalContent,
    image,
    contacts,
  },
  intl,
}) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <ContextualNav
      topic={topic}
      topics={topics}
      topiccollection={topic && topic.topiccollection}
      theme={theme}
      department={department}
    />
    {image && (
      <PageBanner
        imagesPath={`${process.env.CMS_MEDIA}/images`}
        imageFilename={path.basename(
          image.filename,
          path.extname(image.filename),
        )}
        imageExtension={path.extname(image.filename).substring(1)}
        imageTitle={image.title}
      />
    )}
    <div>
      <PageHeader contentType={'information'} description={description}>
        {title}
      </PageHeader>
      <div className="wrapper container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-8">
            {options.map((option, index) => (
              <HtmlFromAdmin title={''} content={option.value} />
            ))}
            {additionalContent && (
              <HtmlFromAdmin title={' '} content={additionalContent} />
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withRouteData(injectIntl(InformationPage));
