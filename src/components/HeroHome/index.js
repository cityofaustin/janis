import React from 'react';
import ResponsiveImage from 'components/ResponsiveImage';
import { FULL_WIDTH_RESPONSIVE_IMAGE_SIZES } from 'js/helpers/constants';

const HeroHome = ({ imageFilename, imageTitle, preheader }) => (
  <div className="coa-HeroHome__container">
    <ResponsiveImage filename={imageFilename} extension=".jpg" widths={FULL_WIDTH_RESPONSIVE_IMAGE_SIZES} />
    <div
      className="coa-HeroHome"
      role="img"
      aria-label={imageTitle}
      style={{
        background: 'linear-gradient(rgba(36, 11, 51, .3), rgba(36, 11, 51, .3))',
      }}
    >
      <div className="container-fluid wrapper">
        <span className="coa-HeroHome__preheader">{preheader}</span>
        <h2 className="coa-HeroHome__header">Austin, TX</h2>
      </div>
    </div>
  </div>
);

export default HeroHome;
