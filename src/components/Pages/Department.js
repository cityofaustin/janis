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

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';

//rmv
import { misc as i18n2, services as i18n3 } from 'js/i18n/definitions';
import TopServices from 'components/Tiles/TopServices';

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
        headerText={title}
      />
    )}
    <TopServices
      title={intl.formatMessage(i18n.topServices)}
      tiles={topServices}
      locale={intl.locale}
    />
    {!!relatedLinks.length && (
      <div className="coa-DepartmentPage__related-container">
        <h2 className="coa-SectionHeader">Related content</h2>
        {relatedLinks.map(l => (
          <div>
            <a href={l.url}>{l.text}</a>
          </div>
        ))}
      </div>
    )}
    <div className="coa-DepartmentPage__all-of-the-content">
      <div className="coa-DepartmentPage__main-content">
        <div className="wrapper wrapper--sm container-fluid">
          <h2 className="coa-SectionHeader">
            {intl.formatMessage(i18n.whatWeDo)}
          </h2>
          <p>{Parser(whatWeDo)}</p>
          <h2 className="coa-SectionHeader">
            {intl.formatMessage(i18n.mission)}
          </h2>
          <p>{mission}</p>
          <div className="coa-DepartmentPage__contacts-mobile">
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
                {director.photo && <DirectorHeadshot photo={director.photo} />}

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
      <div className="coa-DepartmentPage__side-content">
        <div className="coa-DepartmentPage__contacts-desktop">
          {!!contacts && !!contacts.length && (
            <ContactDetails contact={contacts[0]} />
          )}
        </div>
      </div>
    </div>
  </div>
);

export default withRouteData(injectIntl(Department));

/*
Taking these out instead of doing actual conditional stuff because we don't need them for OPO

        <h3>Social Media URLs</h3>
        {socialMedia.map(smlink => (
          <div className="wrapper wrapper--sm container-fluid">
            <p>URL: {smlink.value}</p>
          </div>
        ))}
        <p>Job Listing link: {jobListings}</p>
*/
