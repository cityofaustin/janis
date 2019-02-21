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
        />
      )}
      <PageBreadcrumbs title={title} />
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader>{title}</PageHeader>
      </div>
      <div className="wrapper wrapper--sm container-fluid">
        <p>Mission: {mission}</p>
        <p>What we do: {whatWeDo}</p>
        <h3>Directors:</h3>
        {directors.map(director => (
          <div className="wrapper wrapper--sm container-fluid">
            <p>Name: {director.name}</p>
            <p>Photo: {director.photo.filename}</p>
            <p>About: {director.about}</p>
            <p>Email: {director.email}</p>
            <p>Phone: {director.phone}</p>
          </div>
        ))}
        <h3>Social Media URLs</h3>
        {socialMedia.map(smlink => (
          <div className="wrapper wrapper--sm container-fluid">
            <p>URL: {smlink.value}</p>
          </div>
        ))}
        <p>Job Listing link: {jobListings}</p>
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
