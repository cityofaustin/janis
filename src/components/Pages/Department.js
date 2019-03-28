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

const TopServiceButtons = ({ topServices, locale }) => (
  <div className="coa-DepartmentPage__topServiceButtons">
    {topServices && topServices.map(service => {
        // If our link type matches our locale, render it
        if(service.type.substr(-2) === locale) {
          return (
            <a
              href={service.value.url}
              className="coa-DepartmentPage__topServiceButton"
            >
              <div className="coa-DepartmentPage__topServiceButtonText"> 
                {service.value.title}
              </div>
              <div className="coa-DepartmentPage__topServiceButtonArrow">
                <i className="material-icons">
                  arrow_forward
                </i>
              </div>
            </a>
          );
        }
      }
    )}
  </div>
)

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
    topServices
  },
  intl,
}) => {
  const relatedLinks = get(jsonFileData, 'departmentpage.projectsRelated', []);

  return (
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
      <div className="coa-DepartmentPage__topservices--mobile">
        <div className="coa-DepartmentPage__topservices-contentcontainer--mobile">
          <h3 className="coa-DepartmentPage__topservices-header--mobile">
            {intl.formatMessage(i18n.topServices)}
          </h3>
          <TopServiceButtons topServices={topServices} locale={intl.locale} />
        </div>
      </div>
      <div className="wrapper container-fluid">
        <div className="coa-DepartmentPage__topservices--desktop">
          <div className="coa-DepartmentPage__topservices-contentcontainer--desktop">
            <h3 className="coa-DepartmentPage__topservices-header--desktop">
              {intl.formatMessage(i18n.topServices)}
            </h3>
            <TopServiceButtons topServices={topServices} locale={intl.locale} />
          </div>
        </div>
      </div>
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
              {!!contacts &&
                !!contacts.length && <ContactDetails contact={contacts[0]} />}
            </div>
            <h2 className="coa-SectionHeader">
              {directors.length > 1
                ? intl.formatMessage(i18n.meetDirectors)
                : intl.formatMessage(i18n.meetDirector)}
            </h2>
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
                      {intl.formatMessage(i18n.directorTitle)}
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
            {!!contacts &&
              !!contacts.length && <ContactDetails contact={contacts[0]} />}
          </div>
        </div>
      </div>
    </div>
  );
};

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
