import React from 'react';
import { get } from 'lodash';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';
import path from 'path';
import Parser from 'html-react-parser';

import { departmentPage as i18n } from 'js/i18n/definitions';

import SectionHeader from 'components/SectionHeader';
import ContactDetails from 'components/Contact/ContactDetails';
import PageBanner from 'components/PageBanner';
import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageHeader from 'components/PageHeader';
import WorkInProgress from 'components/WorkInProgress';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';

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
  },
  intl,
}) => {
  const relatedLinks = get(jsonFileData, 'departmentpage.projectsRelated', []);

  return (
    <div>
      {image && (
        <PageBanner
          imagesPath={`${process.env.CMS_MEDIA}/images`}
          imageFilename={path.basename(
            image.filename,
            path.extname(image.filename),
          )}
          imageExtension={path.extname(image.filename)}
          imageTitle={image.title}
          headerText={title}
        />
      )}
      <div className="coa-DepartmentPage__topservices--mobile">
        <div className="coa-DepartmentPage__topservices-contentcontainer--mobile">
          <h3 className="coa-DepartmentPage__topservices-header--mobile">Top Services</h3>
            <div className="coa-DepartmentPage__topServiceButtons">
              <a href={intl.formatMessage(i18n.complaintFormUrl)} className="coa-DepartmentPage__topServiceButton">
                {intl.formatMessage(i18n.complaintFormButtonText)}
                <i class="material-icons coa-DepartmentPage__topServiceButtonArrow">arrow_forward</i>
              </a>
              <a href={intl.formatMessage(i18n.thankFormUrl)} className="coa-DepartmentPage__topServiceButton">
                {intl.formatMessage(i18n.thankFormButtonText)}
                <i class="material-icons coa-DepartmentPage__topServiceButtonArrow">arrow_forward</i>
              </a>
            </div>
        </div>
      </div>
      <div className="coa-DepartmentPage__all-of-the-content">
        <div className="coa-DepartmentPage__main-content">
          <div className="wrapper wrapper--sm container-fluid">
          <div className="coa-DepartmentPage__topservices--desktop">
            <div className="coa-DepartmentPage__topservices-contentcontainer--desktop">
              <h3 className="coa-DepartmentPage__topservices-header--desktop">Top Services:</h3>
              <div className="coa-DepartmentPage__topServiceButtons">
                <a href={intl.formatMessage(i18n.complaintFormUrl)} className="coa-DepartmentPage__topServiceButton">
                  {intl.formatMessage(i18n.complaintFormButtonText)}
                  <i class="material-icons coa-DepartmentPage__topServiceButtonArrow">arrow_forward</i>
                </a>
                <a href={intl.formatMessage(i18n.thankFormUrl)} className="coa-DepartmentPage__topServiceButton">
                  {intl.formatMessage(i18n.thankFormButtonText)}
                  <i class="material-icons coa-DepartmentPage__topServiceButtonArrow">arrow_forward</i>
                </a>
              </div>
            </div>
          </div>
          <div className="coa-SectionHeader">What we do</div>
          <p>{Parser(whatWeDo)}</p>
          <div className="coa-SectionHeader">Our mission</div>
          <p>{mission}</p>
          <div className="coa-DepartmentPage__contacts-mobile">
            {!!contacts &&
              !!contacts.length && (
                <ContactDetails contact={contacts[0]} />
            )}
          </div>
          <div className="coa-SectionHeader">Meet our {directors.length > 1 ? "directors" : "director"}</div>
          {directors.map(director => (
            <div>
              <div className="coa-DepartmentPage__directorcard">
                <div className="coa-DepartmentPage__directorcard-headshot">
                <img src={`${process.env.CMS_MEDIA}/images/Farah-2.original.jpg`}></img>
                </div>
                <div className="coa-DepartmentPage__directorcard-info">
                  <div className="coa-DepartmentPage__directorcard-name">{director.name}</div>
                  <div className="coa-DepartmentPage__directorcard-title">Director, Office of Police Oversight</div>
                  <div className="coa-DepartmentPage__directorcard-coamaybe">City of Austin</div>
                </div>
              </div>
              <p>{director.about}</p>
            </div>
          ))}
          </div>
        </div>
        <div className="coa-DepartmentPage__side-content">
          <div className="coa-DepartmentPage__contacts-desktop">
            {!!contacts &&
              !!contacts.length && (
                <ContactDetails contact={contacts[0]} />
            )}
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
