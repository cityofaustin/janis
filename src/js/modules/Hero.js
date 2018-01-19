import React, { Component } from 'react';

class Hero extends Component {

  render() {
    const { image, callout, home } = this.props;
    const heroImageSrc = image ?`http://localhost:8000/media/${image.file}` : '';

    const HeroImageStyles = {
      backgroundImage: `url(${heroImageSrc})`,
    }

    if (image) {
      return (
        <div
          className="coa-Hero--image"
          style={HeroImageStyles}
          role="img"
          aria-label={image && image.title}
        ></div>
      )
    } else if (callout) {
      return (
        <div className={`coa-Hero coa-Hero__callout ${home ? 'coa-Hero__callout--home': ''}`}>
          <h2>{callout}</h2>
          {this.props.children}
        </div>
      )
    } else return '';
  }

}

export default Hero;
