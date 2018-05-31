import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageItem from 'components/ImageGallery/ImageItem';

class ImageScroller extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { images, maxItems } = this.props;

    return (
      <div className="coa-ImageGallery__scroller">
        {images.length > maxItems && (
          <div className="coa-ImageGallery__scroller-nav">{'<'}</div>
        )}
        <div className="coa-ImageGallery__images">
          {images.map((image, key) => (
            <ImageItem image={image} imagekey={key} hidden={false} />
          ))}
        </div>
        {images.length > maxItems && (
          <div className="coa-ImageGallery__scroller-nav">></div>
        )}
      </div>
    );
  }
}

ImageScroller.propTypes = {
  images: PropTypes.array.isRequired,
  maxItems: PropTypes.number.isRequired,
};

export default ImageScroller;
