import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import ImageItem from 'components/ImageGallery/ImageItem';
import ImageScroller from 'components/ImageGallery/ImageScroller';

const smallScreen = 479;
const mediumScreen = 767;
const largeScreen = 1079;
const xlargeScreen = 1249;

const maxMediumScreenItems = 2;
const maxLargeScreenItems = 3;

const ImageGallery = ({ heading, subheading, images }) => (
  <div className="coa-ImageGallery__container">
    <h2>{heading}</h2>
    <p>{subheading}</p>
    <MediaQuery className="coa-ImageGallery__images" maxWidth={mediumScreen}>
      {images.map((image, key) => (
        <ImageItem image={image} imagekey={key} hidden={false} />
      ))}
    </MediaQuery>
    <MediaQuery minDeviceWidth={mediumScreen} maxWidth={largeScreen}>
      <ImageScroller images={images} maxItems={maxMediumScreenItems} />
    </MediaQuery>
    <MediaQuery minDeviceWidth={largeScreen}>
      <ImageScroller images={images} maxItems={maxLargeScreenItems} />
    </MediaQuery>
  </div>
);

ImageGallery.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
