import React from 'react';
import PropTypes from 'prop-types';

const HeroHome = ({ imageUrl, imageTitle, preheader }) => (
  <div
    className="coa-HeroHome"
    style={{
      backgroundImage: `
        linear-gradient(rgba(36, 11, 51, .3), rgba(36, 11, 51, .3)),
        url(${imageUrl})
      `,
      backgroundSize: 'cover',
      backgroundPosition: '50%',
    }}
    role="img"
    aria-label={imageTitle}
  >
    <div className="container-fluid wrapper">
      <span className="coa-HeroHome-preheader">{preheader}</span>
      <h2 className="coa-HeroHome-header">Austin, TX</h2>
    </div>
  </div>
);

HeroHome.propTypes = {
  imageTitle: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  preheader: PropTypes.string.isRequired,
};

export default HeroHome;
