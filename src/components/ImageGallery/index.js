import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveImage from 'components/ResponsiveImage';
import { IMAGE_GALLERY_RESPONSIVE_IMAGE_SIZES } from 'js/helpers/constants';

const ImageGallery = ({ heading, subheading, images }) => (
  <div className="coa-ImageGallery__container">
    <h2>{heading}</h2>
    <p>{subheading}</p>
    <div className="coa-ImageGallery__images">
      {images.length > 3 && <div>LEFT</div>}
      {images.map((image, key) => (
        <div className="coa-ImageGallery__imageitem">
          <ResponsiveImage
            key={key}
            filename={image.filename}
            extension={image.extension}
            widths={IMAGE_GALLERY_RESPONSIVE_IMAGE_SIZES}
          />
          <div className="coa-ImageGallery__imageitem-description">
            <p>{image.description}</p>
          </div>
        </div>
      ))}
      {images.length > 3 && <div>RIGHT</div>}
    </div>
  </div>
);

ImageGallery.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
