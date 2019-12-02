import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import path from 'path';

import ResponsiveImage from 'components/ResponsiveImage';
import { FULL_WIDTH_RESPONSIVE_IMAGE_SIZES } from 'js/helpers/constants';
import { useMobileQuery } from 'js/helpers/reactMediaQueries';
import getImageData from 'components/ResponsiveImage/getImageData';

// headerText: optional String, if you want to embed headerText within the banner image
// mobileOptimized: optional Boolean, set to "true" if you don't want to render banner images on mobile
function PageBanner({ image, headerText, mobileOptimized }){
  const isMobile = useMobileQuery();
  const { imageFilename, imageExtension, imageTitle } = getImageData(image);

  return (
    <div className={classNames("coa-PageBanner__container", {
      "coa-PageBanner__container-mobile-optimized": isMobile && mobileOptimized,
    })}>
      {(!isMobile || !mobileOptimized) && (
        <ResponsiveImage
          className="coa-PageBanner__image"
          filename={imageFilename}
          defaultWidth="width-1080"
          widths={FULL_WIDTH_RESPONSIVE_IMAGE_SIZES}
          extension={imageExtension}
          aria-label={imageTitle}
          altText={imageTitle}
        />
      )}
      {headerText && (
        <div
          className="coa-PageBanner__header"
          role="img"
          aria-label={imageTitle}
        >
          <h1>{headerText}</h1>
        </div>
      )}
    </div>
  );
}

PageBanner.propTypes = {
  image: {
    filename: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  },
  headerText: PropTypes.string,
  mobileOptimized: PropTypes.bool,
};

export default PageBanner;
