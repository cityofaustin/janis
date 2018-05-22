import React from 'react';
import PropTypes from 'prop-types';

const PageBanner = ({ imagesPath, imageFilename, imageExtension, imageTitle }) => (
  <img
    className="coa-PageBanner"
    srcset={`${imagesPath}/${imageFilename}.width-640${imageExtension} 640w,
             ${imagesPath}/${imageFilename}.width-720${imageExtension} 720w,
             ${imagesPath}/${imageFilename}.width-750${imageExtension} 750w,
             ${imagesPath}/${imageFilename}.width-828${imageExtension} 828w,
             ${imagesPath}/${imageFilename}.width-1080${imageExtension} 1080w,
             ${imagesPath}/${imageFilename}.width-1440${imageExtension} 1440w,
             ${imagesPath}/${imageFilename}.width-2160${imageExtension} 2160w,`}
    src={`${imagesPath}/${imageFilename}.width-1080${imageExtension}`}
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
