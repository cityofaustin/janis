import React from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import ContextualNav from 'components/PageSections/ContextualNav';

import GuideSection from 'components/Pages/Guide/GuideSection';
import GuideBannerImage from 'components/Pages/Guide/GuideBannerImage';
import PhonesList from 'components/Contact/Phones';
import Email from 'components/Contact/Email';

// TODO: make this not break with broken data

const Guide = ({
  guidePage: {
    id,
    title,
    description,
    slug,
    topic,
    topics,
    theme,
    department,
    relatedDepartments,
    sections,
    image,
    contacts,
  },
  intl,
}) => {
  let contact = null;
  if (contacts && contacts.edges && contacts.edges.length) {
    contact = contacts.edges[0].node.contact;
  }

  debugger;

  return (
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
        relatedDepartments={relatedDepartments}
      />
      <div>
        <div className="wrapper container-fluid">
          <GuideBannerImage image={image} />
        </div>
        <div className="coa-GuidePage-header--container">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="coa-Page__all-of-the-content">
          <div className="wrapper container-fluid">
            <div className="row">
              <div className="coa-GuidePage__nav-sidebar col-md-4">
                Coming Soon
              </div>
              <div className="coa-GuidePage__main-content col-xs-12 col-md-8">
                <h1>Contact Information</h1>
                <div className="coa-GuidePage__contact-block row">
                  <div className="coa-GuidePage__contact-block-name col-md-6">
                    <h2>{contact.name}</h2>
                  </div>
                  <div className="coa-GuidePage__contact-block-info col-md-6">
                    <div className="coa-GuidePage__contact-block-phone">
                      <PhonesList phoneNumbers={contact.phoneNumber} />
                    </div>
                    <div className="coa-GuidePage__contact-block-email">
                      <Email email={contact.email} />
                    </div>
                  </div>
                </div>
                {sections.map((section, index) => (
                  <GuideSection section={section} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouteData(injectIntl(Guide));
