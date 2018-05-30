import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveImage from 'components/ResponsiveImage';
import { IMAGE_GALLERY_RESPONSIVE_IMAGE_SIZES } from 'js/helpers/constants';

const ImageGallery = ({ heading, subheading, images }) => (
  <div className="coa-ImageGallery__container">
    <h1>{heading}</h1>
    <p>{subheading}</p>
    <div className="coa-ImageGallery__images">
      {images.map((image, key) => (
        <div className="coa-ImageGallery__imageitem">
          <ResponsiveImage
            key={key}
            filename={image.filename}
            extension={image.extension}
            widths={IMAGE_GALLERY_RESPONSIVE_IMAGE_SIZES}
          />
          <p>{image.description}</p>
        </div>
      ))}
    </div>
  </div>
);

ImageGallery.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
