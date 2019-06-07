import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveImage from 'components/ResponsiveImage';
import { FULL_WIDTH_RESPONSIVE_IMAGE_SIZES } from 'js/helpers/constants';

const PageBanner = ({ imagesPath, imageFilename, imageExtension, imageTitle, headerText, extraClasses }) => (
  <div className="coa-PageBanner__container">
    <ResponsiveImage
      className="coa-PageBannerImage"
      filename={`${imagesPath}/${imageFilename}`}
      defaultWidth="width-1080"
      widths={FULL_WIDTH_RESPONSIVE_IMAGE_SIZES}
      extension={imageExtension}
      aria-label={imageTitle}
      altText={imageTitle}
    />
    <div
      className={`coa-PageBannerCover ${extraClasses ? extraClasses : ''}`}
      role="img"
      aria-label={imageTitle}
    >
      <div className="container-fluid wrapper">
        <h1>{headerText}</h1>
      </div>
    </div>
  </div>
);

PageBanner.propTypes = {
  imagesPath: PropTypes.string.isRequired,
  imageFilename: PropTypes.string.isRequired,
  imageExtension: PropTypes.string.isRequired,
  imageTitle: PropTypes.string.isRequired,
};

export default PageBanner;
