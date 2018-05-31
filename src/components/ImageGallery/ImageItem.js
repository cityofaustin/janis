import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveImage from 'components/ResponsiveImage';
import { IMAGE_GALLERY_RESPONSIVE_IMAGE_SIZES } from 'js/helpers/constants';

const ImageItem = ({ image, imagekey, hidden }) => (
  <div className={`coa-ImageGallery__imageitem${hidden ? '--hidden' : ''}`}>
    <ResponsiveImage
      key={imagekey}
      filename={image.filename}
      extension={image.extension}
      widths={IMAGE_GALLERY_RESPONSIVE_IMAGE_SIZES}
    />
    <div className="coa-ImageGallery__imageitem-description">
      <p>{image.description}</p>
    </div>
  </div>
);

ImageItem.propTypes = {
  image: PropTypes.object.isRequired,
  imagekey: PropTypes.number.isRequired,
  hidden: PropTypes.bool.isRequired,
};

export default ImageItem;
