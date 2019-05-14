import React, { Fragment } from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import path from 'path';

import { misc as i18n2, services as i18n3 } from 'js/i18n/definitions';

import PageBanner from 'components/PageBanner';
import PageHeader from 'components/PageHeader';
import Steps from 'components/Steps';
import HtmlFromAdmin from 'components/HtmlFromAdmin';
import ApplicationBlock from 'components/ApplicationBlock';
import ContactDetails from 'components/Contact/ContactDetails';
import SectionHeader from 'components/SectionHeader';
import TileGroup from 'components/Tiles/TileGroup';
import ContextualNav from '../PageSections/ContextualNav';
import RelatedToMobile from '../PageSections/ContextualNav/RelatedToMobile';

const Service = ({
  service: {
    image,
    text: title,
    slug,
    topic,
    theme,
    steps,
    dynamicContent,
    additionalContent,
    contacts,
    related,
  },
  intl,
}) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
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
      <ContextualNav
        topic={topic}
        topiccollection={topic && topic.topiccollection}
        theme={theme}
      />
      <PageHeader contentType={'service'}>{title}</PageHeader>
      <div className="wrapper container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-8">
            {steps && !!steps.length ? (
              //just 1 step? don't display steps header or steps in list (ul)
              steps.length === 1 ? (
                <Steps steps={steps} />
              ) : (
                <Fragment>
                  <SectionHeader>
                    {intl.formatMessage(i18n2.steps)}
                  </SectionHeader>
                  <Steps steps={steps} />
                </Fragment>
              )
            ) : null}

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
            <RelatedToMobile
              topic={topic}
              topiccollection={topic && topic.topiccollection}
              theme={theme}
            />
            {!!contacts &&
              !!contacts.length && <ContactDetails contact={contacts[0]} />}
          </div>
        </div>
      </div>
      {/*}
      <TileGroup
        text={intl.formatMessage(i18n3.checkOutRelatedServices)}
        tiles={related}
        tag={intl.formatMessage(i18n3.service)}
      />
      */}
    </div>
  </div>
);

export default withRouteData(injectIntl(Service));
