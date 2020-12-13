import React from 'react';
import { get } from 'lodash';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import path from 'path';
import Parser from 'html-react-parser';

import { departmentPage as i18n, misc as i18n2, services as i18n3 } from 'js/i18n/definitions';

import SectionHeader from 'components/SectionHeader';
import ContactDetails from 'components/Contact/ContactDetails';
import PageBanner from 'components/PageBanner';
import DirectorHeadshot from 'components/DirectorHeadshot';
import PageHeader from 'components/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';
import TalkToComponent from 'components/TawkTo';

const Department = ({ department, intl }) => {
  const {
    department: {
      title,
      mission,
      contact,
      image,
      directors,
      whatWeDo,
      socialMedia,
      jobListings,
      topServices,
      relatedLinks,
      news,
      slug,
    },
  } = department ? { department } : useRouteData();

  const RelatedContent = () => (
    <div className="coa-DepartmentPage__related-container">
      <h2 className="coa-DepartmentPage__related-title">
        {intl.formatMessage(i18n2.relatedInfo)}
      </h2>
      <ul className="coa-DepartmentPage__related-list">
        {relatedLinks.map((l, index) => (
          <li key={index}>
            <a href={l.url} className="coa-DepartmentPage__related-link">
              {l.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  const TopServicesRelatedContent = () =>
    // if we render both TopServices and Related, wrap them in a div
    topServices.length > 0 && !!relatedLinks.length ? (
      <div className="coa-TopServicesRelatedContent">
        <div className="coa-DepartmentPageTopServices">
          <TileGroup
            title={intl.formatMessage(i18n.topServices)}
            tiles={topServices}
          />
        </div>
        <RelatedContent />
      </div>
    ) : topServices.length > 0 ? (
      <div className="coa-DepartmentPageTopServices">
        <TileGroup
          title={intl.formatMessage(i18n.topServices)}
          tiles={topServices}
        />
      </div>
    ) : !!relatedLinks.length ? (
      <RelatedContent />
    ) : null;

  const isMuniCourt = title === 'Municipal Court' || title === 'Corte Municipal';

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {image && (
        <PageBanner image={image} headerText={title} mobileOptimized={true} />
      )}
      <TopServicesRelatedContent />
      <div className="coa-Page__all-of-the-content">
        <div className="coa-Page__main-content">
          <div className="wrapper wrapper--sm container-fluid">
            {!!news && !!news.length && (
              <>
                <h2 className="coa-SectionHeader">
                  {intl.formatMessage(i18n.news)}
                </h2>
                {news.map(newsItem => (
                  <>
                    <div className="coa-DepartmentPage__news-date">
                      {newsItem.newsDate}
                    </div>
                    <div className="coa-DepartmentPage__news-link">
                      <a href={`/${intl.locale}${newsItem.url}`}>
                        {newsItem.title}
                      </a>
                    </div>
                  </>
                ))}
                <div className="coa-DepartmentPage__news-more-link">
                  <a href={`/${intl.locale}/${slug}/news/`}>
                    <i class="material-icons">arrow_forward</i>
                    {intl.formatMessage(i18n.moreDeptNews, {
                      department: title,
                    })}
                  </a>
                </div>
              </>
            )}
            <h2 className="coa-SectionHeader">
              {intl.formatMessage(i18n.whatWeDo)}
            </h2>
            <p>{Parser(whatWeDo)}</p>
            <h2 className="coa-SectionHeader">
              {intl.formatMessage(i18n.mission)}
            </h2>
            <p>{mission}</p>
            <div className="coa-Page__contacts-mobile">
              {!!contact && <ContactDetails contact={contact} />}
            </div>
            {directors.length > 0 && (
              <h2 className="coa-SectionHeader">
                {intl.formatMessage(i18n.meetDirector)}
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
            {!!contact && <ContactDetails contact={contact} />}
          </div>
        </div>
      </div>
      {isMuniCourt && <TalkToComponent />}
    </div>
  );
};

export default injectIntl(Department);
