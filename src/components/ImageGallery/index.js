import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveImage from 'components/ResponsiveImage';
import { IMAGE_GALLERY_RESPONSIVE_IMAGE_SIZES } from 'js/helpers/constants';

const ImageGallery = ({ images }) => (
  <div className="coa-ImageGallery">
    {images.map(image => (
      <ResponsiveImage
        filename={image.filename}
        extension={image.extension}
        widths={IMAGE_GALLERY_RESPONSIVE_IMAGE_SIZES}
      />
    ))}
  </div>
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
