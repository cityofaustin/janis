import React, { Component } from 'react';

class Hero extends Component {

  render() {
    const { image } = this.props;
    const heroImageSrc = image ?`http://localhost:8000/media/${image.file}` : '';

    const HeroImageStyles = {
      backgroundImage: `url(${heroImageSrc})`,
    }

    return (
      <div
        className="coa-Hero--image"
        style={HeroImageStyles}
        role="img"
        aria-label={image && image.title}
      ></div>
    );
  }

}

export default Hero;
