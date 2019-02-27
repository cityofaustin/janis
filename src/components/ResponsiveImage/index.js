import React from 'react';
import PropTypes from 'prop-types';

const ResponsiveImage = ({ filename, extension, widths, altText, ...rest }) => {
  const sources = widths.map(w => `${filename}.width-${w}${extension} ${w}w`).toString();

  return (
    <img srcSet={sources} 
         src={`${filename}.width-1080${extension}`} 
         alt={altText}
         {...rest} />
  );
};

ResponsiveImage.propTypes = {
  filename: PropTypes.string.isRequired,
  extension: PropTypes.string.isRequired,
  widths: PropTypes.array.isRequired,
  altText: PropTypes.string.isRequired
};

export default ResponsiveImage;
