import React from 'react';
import PropTypes from 'prop-types';
import objectFitImages from 'object-fit-images';

import guidePagePlacholder from 'images/guide_page_placeholder.png';


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

  console.log("\n\n")
  console.log("sources :", sources)
  console.log("fallbackSrc :", fallbackSrc)

  // return <img srcSet={sources} src={fallbackSrc} alt={altText} {...rest} />;
  // return <img src={guidePagePlacholder} alt={intl.formatMessage(i18n.citySeal)} />

  return <img src={guidePagePlacholder} alt="Guide Page Placeholder Image"
    style={{ maxWidth: 1160, margin: "auto"}}
  />

};

ResponsiveImage.propTypes = {
  filename: PropTypes.string.isRequired,
  extension: PropTypes.string.isRequired,
  widths: PropTypes.array.isRequired,
  altText: PropTypes.string.isRequired,
  defaultWidth: PropTypes.string.isRequired,
};

export default ResponsiveImage;
