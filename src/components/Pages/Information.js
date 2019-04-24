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
    topiccollection,
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
      topiccollection={topiccollection}
      theme={theme}
      department={department}
    />
    {/*<div className="coa_InformationPage__back-to-dept">
        <div className="wrapper container-fluid">
          <a href={intl.formatMessage(i18n2.opoDeptUrl)}>
            <i className="material-icons coa_InformationPage__arrow">
              arrow_back
            </i>
            <span>{intl.formatMessage(i18n2.opoName)}</span>
          </a>
        </div>
      </div>*/}
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
    {/* to likely replace with microsite breadcrumb <PageBreadcrumbs
      grandparent={{ ...theme, subpath: 'themes' }}
      parent={{ ...topic, subpath: 'topics' }}
      title={title}
    /> */}
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
