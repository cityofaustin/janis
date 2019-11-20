import React from 'react';

import ResponsiveImage from 'components/ResponsiveImage';
import { FULL_WIDTH_RESPONSIVE_IMAGE_SIZES } from 'js/helpers/constants';
import getImageData from 'components/ResponsiveImage/getImageData';

const LocationPageBlock = ({title, content}) => (
  <div className="coa-LocationPage__sub-section-block">
    <div className="coa-LocationPage__sub-section-block-title">
      {title}
    </div>
    <div className="coa-LocationPage__sub-section-block-contents">
      {content}
    </div>
  </div>
);

const LocationPageContact = ({phone, email}) => {
  return (
    <div className="coa-LocationPage__sub-section">
      <h2 className="coa-LocationPage__sub-section-title">
        Contact
      </h2>
      <div className="coa-LocationPage__sub-section-block-container">
        <LocationPageBlock
          title="Phone"
          content={`${phone.name}: ${phone.value}`}
        />
        <LocationPageBlock
          title="Email Address"
          content={email.value}
        />
      </div>
    </div>
  );
}

const LocationPageAddress = ({title, address}) => {
  const {street, city, state, zip} = address;
  const AddressText = (
    <div>
      <span className="coa-LocationPage__address-line">{street}</span>
      <span className="coa-LocationPage__address-line">
        {city}, {state} {zip}
      </span>
    </div>
  );

  return (
    <LocationPageBlock
      title={title}
      content={AddressText}
    />
  )
}

const LocationPageLocation = ({location, image}) => {
  const imageData = (image) ? getImageData(image) : null;
  console.log("imageData", imageData)

  return (
    <div className="coa-LocationPage__sub-section">
      <h2 className="coa-LocationPage__sub-section-title">
        Location
      </h2>
      <div className="coa-LocationPage__sub-section-block-container">
        <LocationPageAddress
          title="Physical Address"
          address={location["Physical address"]}
        />
        <LocationPageAddress
          title="Mailing Address"
          address={location["Mailing address"]}
        />
      </div>
      {imageData && (
        <ResponsiveImage
          className="coa-LocationPage__location-image"
          filename={imageData.imageFilename}
          defaultWidth="width-828"
          widths={FULL_WIDTH_RESPONSIVE_IMAGE_SIZES}
          extension={imageData.imageExtension}
          aria-label={imageData.imageTitle}
          altText={imageData.imageTitle}
        />
      )}
    </div>
  );
}

const LocationPageFacilityHours = ({hours}) => {
  const HoursText = (
    <table className="coa-LocationPage__hours-table">
      {Object.keys(hours).map(day => (
        <tr>
          <td className="coa-LocationPage__hours-table-td">{day}</td>
          <td className="coa-LocationPage__hours-table-td">{hours[day]}</td>
        </tr>
      ))}
    </table>
  );

  return (
    <div className="coa-LocationPage__sub-section">
      <h2 className="coa-LocationPage__sub-section-title">
        Facility Hours
      </h2>
      <div className="coa-LocationPage__sub-section-block-container">
        <LocationPageBlock
          title="Standard hours"
          content={HoursText}
        />
      </div>
    </div>
  );
}

const LocationPageInfo = ({phone, email, location, image, hours}) => (
  <div className="coa-LocationPage__section">
    <LocationPageContact
      phone={phone}
      email={email}
    />
    <LocationPageLocation
      location={location}
      image={image}
    />
    <LocationPageFacilityHours
      hours={hours}
    />
  </div>
);

export default LocationPageInfo;
