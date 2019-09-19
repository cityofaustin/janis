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
import ContextualNav from 'components/PageSections/ContextualNav';
import RelatedToMobile from '../PageSections/ContextualNav/RelatedToMobile';

const InformationPage = ({
  informationPage: {
    text: title,
    slug,
    topic,
    topics,
    theme,
    department,
    relatedDepartments,
    toplink,
    description,
    options,
    additionalContent,
    image,
    contacts,
    coaGlobal,
  },
  intl,
}) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    {!coaGlobal && (
      <ContextualNav
        topic={topic}
        topics={topics}
        topiccollection={topic && topic.topiccollection}
        theme={theme}
        department={department}
        relatedDepartments={relatedDepartments}
      />
    )}
    {image && <PageBanner image={image} />}
    <div>
      <PageHeader contentType={'information'} description={description}>
        {title}
      </PageHeader>
      <div className="coa-Page__all-of-the-content">
        <div className="coa-Page__main-content">
          <div className="wrapper container-fluid">
            <div className="row">
              <div className="col-xs-12 col-md-8">
                {options.map((option, index) => (
                  <HtmlFromAdmin title={''} content={option.value} />
                ))}
                {additionalContent && (
                  <HtmlFromAdmin title={' '} content={additionalContent} />
                )}
                <div className="coa-Page__contacts-mobile">
                  {!!contacts && !!contacts.length && (
                    <ContactDetails contact={contacts[0]} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="coa-Page__side-content">
          <div className="coa-ServicePage__contacts-desktop">
            {!!contacts && !!contacts.length && (
              <ContactDetails contact={contacts[0]} />
            )}
          </div>
        </div>
      </div>
      {!coaGlobal && (
        <RelatedToMobile
          topic={topic}
          topiccollection={topic && topic.topiccollection}
          theme={theme}
          department={department}
        />
      )}
    </div>
  </div>
);

export default withRouteData(injectIntl(InformationPage));
