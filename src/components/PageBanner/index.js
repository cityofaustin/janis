import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveImage from 'components/ResponsiveImage';
import { FULL_WIDTH_RESPONSIVE_IMAGE_SIZES } from 'js/helpers/constants';

const PageBanner = ({ imagesPath, imageFilename, imageExtension, imageTitle }) => (
  <ResponsiveImage
    className="coa-PageBanner"
    filename={`${imagesPath}/${imageFilename}`}
    widths={FULL_WIDTH_RESPONSIVE_IMAGE_SIZES}
    extension={imageExtension}
    aria-label={imageTitle}
  />
);

PageBanner.propTypes = {
  imagesPath: PropTypes.string.isRequired,
  imageFilename: PropTypes.string.isRequired,
  imageExtension: PropTypes.string.isRequired,
  imageTitle: PropTypes.string.isRequired,
};

export default PageBanner;
