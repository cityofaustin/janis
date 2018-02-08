import React, { Component } from 'react';

class Hero extends Component {

  render() {
    const { image, callout, home } = this.props;
    const heroImageSrc = image && home ?
      image.file :
      image ? `${process.env.CMS_MEDIA}/${image.file}` : '';

    const HeroImageStyles = {
      background: `
        linear-gradient(rgba(36, 11, 51, .3), rgba(36, 11, 51, .3)),
        url(${heroImageSrc})
      `,
      backgroundSize: 'cover',
      backgroundPosition: '50%',
    }

    if (home) {
      return (
        <div className="coa-Hero__overlay">
          <div
            className="coa-Hero--image coa-Hero__home"
            style={HeroImageStyles}
            role="img"
            aria-label={image.title}
          >
            <div className="wrapper">
              <h2>{callout}</h2>
              {this.props.children}
            </div>
          </div>
        </div>
      )
    } else if (image) {
      return (
        <div
          className="coa-Hero--image"
          style={HeroImageStyles}
          role="img"
          aria-label={image.title}
        ></div>
      )
    } else if (callout) {
      return (
        <div className="coa-Hero coa-Hero__callout">
          <div className="wrapper">
            <h2>{callout}</h2>
            {this.props.children}
          </div>
        </div>
      )
    } else return '';
  }

}

export default Hero;
