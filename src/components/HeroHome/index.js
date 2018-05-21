import React from 'react';

const HeroHome = ({ imageUrl, imageTitle, preheader }) => (
  <div className="coa-HeroHome-container">
    <img src={imageUrl} />
    <div
      className="coa-HeroHome"
      role="img"
      aria-label={imageTitle}
    >
      <div className="container-fluid wrapper">
        <span className="coa-HeroHome-preheader">{preheader}</span>
        <h2 className="coa-HeroHome-header">Austin, TX</h2>
      </div>
    </div>
  </div>
);

export default HeroHome;
