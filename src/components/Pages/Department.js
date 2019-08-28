import React from 'react';
import { get } from 'lodash';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import path from 'path';
import Parser from 'html-react-parser';

import { departmentPage as i18n } from 'js/i18n/definitions';

import SectionHeader from 'components/SectionHeader';
import ContactDetails from 'components/Contact/ContactDetails';
import PageBanner from 'components/PageBanner';
import DirectorHeadshot from 'components/DirectorHeadshot';
import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageHeader from 'components/PageHeader';
import WorkInProgress from 'components/WorkInProgress';

//rmv
import { misc as i18n2, services as i18n3 } from 'js/i18n/definitions';
import TopServices from 'components/Tiles/TopServices';

const cleanDepartmentTopServiceLink = topService => {
  const page =
    topService.servicePage ||
    topService.guidePage ||
    topService.informationPage;

  if (page) {
    // If we have a topic let's make our URL from it
    if (page.topics && page.topics.edges.length) {
      const topic = page.topics.edges[0].node.topic;

      if (
        topic &&
        topic.topiccollections &&
        topic.topiccollections.edges.length
      ) {
        const tc = topic.topiccollections.edges[0].node.topiccollection;

        return {
          title: page.title,
          url: `/${tc.theme.slug}/${tc.slug}/${topic.slug}/${page.slug}`,
          type: 'en',
        };
      }
    }

    // If we have a department let's make our URL from it
    if (page.relatedDepartments && page.relatedDepartments.edges.length) {
      const dept = page.relatedDepartments.edges[0].node.relatedDepartment;

      return {
        title: page.title,
        url: `/${dept.slug}/${page.slug}`,
        type: 'en',
      };
    }
  }
};

const cleanDepartmentTopServices = topServicePages => {
  if (!topServicePages || !topServicePages.edges) return null;

  return topServicePages.edges
    .map(({ node: topService }) => {
      let cleaned = cleanDepartmentTopServiceLink(topService);

      return cleaned;
    })
    .filter(x => typeof x !== 'undefined');
};

const Department = ({
  department: {
    title,
    mission,
    contacts,
    image,
    directors,
    whatWeDo,
    socialMedia,
    jobListings,
    topServices,
    relatedLinks,
  },
  intl,
}) => {
  const topBlargs = cleanDepartmentTopServices(topServices);

  const TopServicesRelatedContent = () =>
    // if we render both TopServices and Related, wrap them in a div
    topBlargs.length > 0 && !!relatedLinks.length ? (
      <div className="coa-TopServicesRelatedContent">
        <TopServices
          title={intl.formatMessage(i18n.topServices)}
          tiles={topBlargs}
          locale={intl.locale}
          extraClasses="coa-TopServicesDepartment"
        />
        <RelatedContent />
      </div>
    ) : topBlargs.length > 0 ? (
      <TopServices
        title={intl.formatMessage(i18n.topServices)}
        tiles={topBlargs}
        locale={intl.locale}
        extraClasses="coa-TopServicesDepartment"
      />
    ) : !!relatedLinks.length ? (
      <RelatedContent />
    ) : null;

  const RelatedContent = () => (
    <div className="coa-DepartmentPage__related-container">
      <h2 className="coa-DepartmentPage__related-title">
        {intl.formatMessage(i18n2.relatedInfo)}
      </h2>
      <ul className="coa-DepartmentPage__related-list">
        {relatedLinks.map((l, index) => (
          <li key={index} className="coa-DepartmentPage__related-item">
            <a href={l.url} className="coa-DepartmentPage__related-link">
              {l.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {image && (
        <PageBanner
          extraClasses="coa-PageBannerCoverDepartment"
          imagesPath={`${process.env.CMS_MEDIA}/images`}
          imageFilename={path.basename(
            image.filename,
            path.extname(image.filename),
          )}
          imageExtension={path.extname(image.filename).substring(1)}
          imageTitle={image.title}
          headerText={title}
        />
      )}

      <TopServicesRelatedContent />

      <div className="coa-Page__all-of-the-content">
        <div className="coa-Page__main-content">
          <div className="wrapper wrapper--sm container-fluid">
            <h2 className="coa-SectionHeader">
              {intl.formatMessage(i18n.whatWeDo)}
            </h2>
            <p>{Parser(whatWeDo)}</p>
            <h2 className="coa-SectionHeader">
              {intl.formatMessage(i18n.mission)}
            </h2>
            <p>{mission}</p>
            <div className="coa-Page__contacts-mobile">
              {!!contacts && !!contacts.length && (
                <ContactDetails contact={contacts[0]} />
              )}
            </div>
            {directors.length > 0 && (
              <h2 className="coa-SectionHeader">
                {directors.length > 1
                  ? intl.formatMessage(i18n.meetDirectors)
                  : intl.formatMessage(i18n.meetDirector)}
              </h2>
            )}
            {directors.map(director => (
              <div>
                <div className="coa-DepartmentPage__directorcard">
                  {director.photo && (
                    <DirectorHeadshot photo={director.photo} />
                  )}

                  <div className="coa-DepartmentPage__directorcard-info">
                    <h3 className="coa-DepartmentPage__directorcard-name">
                      {director.name}
                    </h3>
                    <div className="coa-DepartmentPage__directorcard-title">
                      {director.title}
                    </div>
                    <div className="coa-DepartmentPage__directorcard-coamaybe">
                      {intl.formatMessage(i18n.coa)}
                    </div>
                  </div>
                </div>
                <p className="coa-DepartmentPage__directorAbout">
                  {director.about}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="coa-Page__side-content">
          <div className="coa-DepartmentPage__contacts-desktop">
            {!!contacts && !!contacts.length && (
              <ContactDetails contact={contacts[0]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouteData(injectIntl(Department));
