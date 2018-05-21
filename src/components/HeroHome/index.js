import React from 'react';

const HeroHome = ({ imageFilename, imageTitle, preheader }) => (
  <div className="coa-HeroHome-container">
    <img src={`${imageFilename}.original.jpg`} 
         srcset={`${imageFilename}.width-320.jpg 320w,
                  ${imageFilename}.width-375.jpg 375w,
                  ${imageFilename}.width-414.jpg 414w,
                  ${imageFilename}.original.jpg 800w,`}
         sizes="(max-width: 320px) 320px,
                (max-width: 375px) 375px,
                (max-width: 414px) 414px,
                800px"/>
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
