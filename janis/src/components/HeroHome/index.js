import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveImage from 'components/ResponsiveImage';
import { FULL_WIDTH_RESPONSIVE_IMAGE_SIZES } from 'js/helpers/constants';

const HeroHome = ({ imageFilename, imageTitle, preheader }) => (
  <div className="coa-HeroHome__container">
    <ResponsiveImage
      filename={imageFilename}
      defaultWidth="width-1080"
      extension="jpg"
      widths={FULL_WIDTH_RESPONSIVE_IMAGE_SIZES}
      altText={imageTitle}
    />
    <div className="coa-HeroHome" role="img" aria-label={imageTitle}>
      <div className="container-fluid wrapper">
        <span className="coa-HeroHome__preheader">{preheader}</span>
        <h2 className="coa-HeroHome__header">Austin, Texas</h2>
      </div>
    </div>
  </div>
);

HeroHome.propTypes = {
  imageTitle: PropTypes.string.isRequired,
  imageFilename: PropTypes.string.isRequired,
  preheader: PropTypes.string.isRequired,
};

export default HeroHome;
