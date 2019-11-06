import React, { Fragment } from 'react';
import { useRouteData, Head } from 'react-static';
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

const Service = ({ service, intl }) => {
  const {
    service: {
      image,
      title,
      slug,
      steps,
      additionalContent,
      contacts,
      related,
      shortDescription,
      relatedDepartments,
      coaGlobal,
      contextualNavData,
    },
    // not the biggest fan of this logic but
    // it gets previews working with hooks
  } = service ? { service } : useRouteData();

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {image && <PageBanner image={image} />}
      <div>
        {!coaGlobal && (
          <ContextualNav
            parent={contextualNavData.parent}
            relatedTo={contextualNavData.relatedTo}
            offeredBy={contextualNavData.offeredBy}
          />
        )}
        <PageHeader contentType={'service'} description={shortDescription}>
          {title}
        </PageHeader>
        <div className="coa-Page__all-of-the-content">
          <div className="coa-Page__main-content">
            <div className="wrapper container-fluid">
              <div className="row">
                <div className="col-xs-12 col-md-10">
                  {(steps && !!steps.length) && (
                    //just 1 step? don't display steps in list (ul)
                    steps.length === 1 ? (
                      <Steps steps={steps} />
                    ) : (
                      <Fragment>
                        <Steps steps={steps} />
                      </Fragment>
                    )
                  )}

                  {additionalContent && (
                    <HtmlFromAdmin
                      content={additionalContent}
                    />
                  )}
                  <div className="coa-Page__contacts-mobile">
                    {!!contacts && !!contacts.length && (
                      <ContactDetails contacts={contacts} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="coa-Page__side-content">
            <div className="coa-ServicePage__contacts-desktop">
              {!!contacts && !!contacts.length && (
                <ContactDetails contacts={contacts} />
              )}
            </div>
          </div>
        </div>
        <RelatedToMobile
          relatedTo={contextualNavData.relatedTo}
          offeredBy={contextualNavData.offeredBy}
        />
      </div>
    </div>
  );
};

export default injectIntl(Service);
