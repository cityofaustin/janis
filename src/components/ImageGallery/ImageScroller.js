import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageItem from 'components/ImageGallery/ImageItem';

class ImageScroller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleKeys: [...Array(props.maxItems).keys()],
    };
  }

  onNavLeft = () => {
    const newVisibleKeys = this.state.visibleKeys;
    const newImageKey = newVisibleKeys[0] - 1;

    newVisibleKeys.pop();
    newVisibleKeys.unshift(newImageKey);

    this.setState({ visibleKeys: newVisibleKeys });
  };

  onNavRight = () => {
    const newVisibleKeys = this.state.visibleKeys;
    const newImageKey = newVisibleKeys[this.props.maxItems - 1] + 1;

    newVisibleKeys.shift();
    newVisibleKeys.push(newImageKey);

    this.setState({ visibleKeys: newVisibleKeys });
  };

  render() {
    const { images, maxItems } = this.props;
    const { visibleKeys } = this.state;

    // Make sure we don't do any scrolling logic stuff it we don't need to
    if (images.length <= maxItems)
      return (
        <div className="coa-ImageGallery__images">
          {images.map((image, key) => (
            <ImageItem image={image} imagekey={key} hidden={false} />
          ))}
        </div>
      );

    return (
      <div className="coa-ImageGallery__scroller">
        {!visibleKeys.includes(0) && (
          <div
            className="coa-ImageGallery__scroller-nav"
            onClick={this.onNavLeft}
          >
            {'<'}
          </div>
        )}
        <div className="coa-ImageGallery__images">
          {images.map((image, key) => (
            <ImageItem
              image={image}
              imagekey={key}
              hidden={!visibleKeys.includes(key)}
            />
          ))}
        </div>
        {!visibleKeys.includes(images.length - 1) && (
          <div
            className="coa-ImageGallery__scroller-nav"
            onClick={this.onNavRight}
          >
            >
          </div>
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
