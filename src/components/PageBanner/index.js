import React from 'react';
import PropTypes from 'prop-types';

const PageBanner = ({ imageUrl, imageTitle }) => (
  <div
    className="coa-PageBanner"
    style={{
      backgroundImage: `url(${imageUrl})`,
    }}
    role="img"
    aria-label={imageTitle}
  />
);

PageBanner.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageTitle: PropTypes.string.isRequired,
};

export default PageBanner;
