import React from 'react';
import PropTypes from 'prop-types';
import objectFitImages from 'object-fit-images';

const ResponsiveImage = ({
  filename,
  extension,
  widths,
  defaultWidth,
  altText,
  ...rest
}) => {
  const sources = widths
    .map(w => `${filename}.width-${w}.${extension} ${w}w`)
    .toString();
  // fallbackSrc is for browsers that don't support srcSet
  const fallbackSrc = `${filename}.${defaultWidth}.${extension}`;

  objectFitImages();

  return <img srcSet={sources} src={fallbackSrc} alt={altText} {...rest} />;
};

ResponsiveImage.propTypes = {
  filename: PropTypes.string.isRequired,
  extension: PropTypes.string.isRequired,
  widths: PropTypes.array.isRequired,
  altText: PropTypes.string.isRequired,
  defaultWidth: PropTypes.string.isRequired,
};

export default ResponsiveImage;
