import React, { Component } from 'react';

class Hero extends Component {

  render() {
    const { image, callout, home } = this.props;
    const heroImageSrc = image ?`${process.env.REACT_APP_CMS_ASSETS}/${image.file}` : '';

    const HeroImageStyles = {
      backgroundImage: `url(${heroImageSrc})`,
    }

    if (image) {
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
        <div className={`coa-Hero ${home ? 'coa-Hero__home': 'coa-Hero__callout'}`}>
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
