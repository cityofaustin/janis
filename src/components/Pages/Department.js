import React from 'react';
import { get } from 'lodash';
import { withRouteData } from 'react-static';
import path from 'path';

import SectionHeader from 'components/SectionHeader';
import ContactDetails from 'components/Contact/ContactDetails';
import PageBanner from 'components/PageBanner';
import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageHeader from 'components/PageHeader';

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
              <div className="coa-DepartmentPage__topServiceButton">
                File a complaint against an Austin Police Officer
              </div>
              <div className="coa-DepartmentPage__topServiceButton">
                Thank the Austin Police Department
              </div>
            </div>
        </div>
      </div>
      <div className="wrapper wrapper--sm container-fluid">
        <div className="coa-DepartmentPage__topservices--desktop">
          <div className="coa-DepartmentPage__topservices-contentcontainer--desktop">
            <h3 className="coa-DepartmentPage__topservices-header--desktop">Top Services:</h3>
            <div className="coa-DepartmentPage__topServiceButtons">
              <div className="coa-DepartmentPage__topServiceButton">
                File a complaint against an Austin Police Officer
              </div>
              <div className="coa-DepartmentPage__topServiceButton">
                Thank the Austin Police Department
              </div>
            </div>
          </div>
        </div>
        <div className="coa-SectionHeader">What we do</div>
        <p dangerouslySetInnerHTML={{ __html: whatWeDo }} />
        <div className="coa-SectionHeader">Our mission</div>
        <p>{mission}</p>
        <div className="coa-SectionHeader">Meet our {directors.length > 1 ? "directors" : "director"}</div>
        {directors.map(director => (
          <div className="wrapper wrapper--sm container-fluid">
            <p>Name: {director.name}</p>
            <p>Photo: {director.photo.filename}</p>
            <p>About: {director.about}</p>
            <p>Email: {director.email}</p>
            <p>Phone: {director.phone}</p>
          </div>
        ))}
      </div>
      {!!contacts &&
        !!contacts.length && (
          <div className="wrapper wrapper--sm container-fluid">
            <ContactDetails contact={contacts[0]} />
          </div>
        )}
    </div>
  );
};

export default withRouteData(Department);


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