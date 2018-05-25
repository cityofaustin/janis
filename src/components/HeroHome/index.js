import React from 'react';
import ResponsiveImage from 'components/ResponsiveImage';

const HeroHome = ({ imageFilename, imageTitle, preheader }) => (
  <div className="coa-HeroHome__container">
    <ResponsiveImage filename={imageFilename}/>
    <div
      className="coa-HeroHome"
      role="img"
      aria-label={imageTitle}
      style={{
        background: 'linear-gradient(rgba(36, 11, 51, .3), rgba(36, 11, 51, .3))',
      }}
    >
      <div className="container-fluid wrapper">
        <span className="coa-HeroHome-preheader">{preheader}</span>
        <h2 className="coa-HeroHome-header">Austin, TX</h2>
      </div>
    </div>
  </div>
);

export default HeroHome;
