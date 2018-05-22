import React from 'react';
import PropTypes from 'prop-types';

const PageBanner = ({ imagesPath, imageFilename, imageExtension, imageTitle }) => (
  <div
    className="coa-PageBanner"
    style={{
      backgroundImage: `url(${imagesPath}/${imageFilename}.width-1080${imageExtension})`,
    }}
    role="img"
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
