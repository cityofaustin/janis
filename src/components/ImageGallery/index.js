import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import ResponsiveImage from 'components/ResponsiveImage';
import { IMAGE_GALLERY_RESPONSIVE_IMAGE_SIZES } from 'js/helpers/constants';

const smallScreen = 479;
const mediumScreen = 767;
const largeScreen = 1079;
const xlargeScreen = 1249;

const maxMediumScreenItems = 2;
const maxLargeScreenItems = 3;

const ImageItem = ({ image, imagekey }) => (
  <div className="coa-ImageGallery__imageitem">
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

const ImageGallery = ({ heading, subheading, images }) => (
  <div className="coa-ImageGallery__container">
    <h2>{heading}</h2>
    <p>{subheading}</p>
    <div className="coa-ImageGallery__images">
      <MediaQuery maxWidth={mediumScreen}>
        {images.map((image, key) => <ImageItem image={image} imagekey={key} />)}
      </MediaQuery>
      <MediaQuery minDeviceWidth={mediumScreen} maxWidth={largeScreen}>
        {images.length <= maxMediumScreenItems &&
          images.map((image, key) => (
            <ImageItem image={image} imagekey={key} />
          ))}
      </MediaQuery>
      <MediaQuery minDeviceWidth={largeScreen}>
        {images.length <= maxLargeScreenItems &&
          images.map((image, key) => (
            <ImageItem image={image} imagekey={key} />
          ))}
      </MediaQuery>
    </div>
  </div>
);

ImageGallery.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
