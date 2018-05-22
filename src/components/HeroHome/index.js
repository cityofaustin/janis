import React from 'react';

const HeroHome = ({ imageFilename, imageTitle, preheader }) => (
  <div className="coa-HeroHome-container">
    <img srcset={`${imageFilename}.width-640.jpg 640w,
                  ${imageFilename}.width-720.jpg 720w,
                  ${imageFilename}.width-750.jpg 750w,
                  ${imageFilename}.width-828.jpg 828w,
                  ${imageFilename}.width-1080.jpg 1080w,
                  ${imageFilename}.width-1440.jpg 1440w,
                  ${imageFilename}.width-2160.jpg 2160w,`} 
         src={`${imageFilename}.width-1080.jpg`} />
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
