import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import path from 'path';

import ResponsiveImage from 'components/ResponsiveImage';
import { FULL_WIDTH_RESPONSIVE_IMAGE_SIZES } from 'js/helpers/constants';
import { isMobileQuery } from 'js/helpers/reactMediaQueries';

import guidePagePlacholder from 'images/guide_page_placeholder.png';

// headerText: optional String, if you want to embed headerText within the banner image
// mobileOptimized: optional Boolean, set to "true" if you don't want to render banner images on mobile
function PageBanner({ image, headerText, mobileOptimized }){
  const isMobile = isMobileQuery();
  const imagesPath = `${process.env.CMS_MEDIA}/images`;
  // const imagesPath = `images`;
  // image.filename = "guide_page_placeholder.6f970d80.png"
  const imageFilename = path.basename(
    image.filename,
    path.extname(image.filename),
  );
  const imageExtension = path.extname(image.filename).substring(1);
  const imageTitle = image.title;

  // console.log("image :", image)
  // imageFilename = "guide_page_placeholder.png"
  console.log("\n imagesPath:", imagesPath)
  console.log(" image.filename :", image.filename)
  console.log(" imageFilename:", imageFilename)
  console.log(" imageExtension:", imageExtension)
  console.log(" imageTitle :", imageTitle)
  console.log(" guidePagePlacholder:", guidePagePlacholder)

  return (
    <div className={classNames("coa-PageBanner__container", {
      "coa-PageBanner__container-mobile-optimized": isMobile && mobileOptimized,
    })}>
      {(!isMobile || !mobileOptimized) && (
        <ResponsiveImage
          className="coa-PageBanner__image"
          filename={`${imagesPath}/${imageFilename}`}
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
      {/* <div className="">
        <img src={ guidePagePlacholder }  />
      </div> */}
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
