import React from 'react';
import path from 'path';

import ResponsiveImage from 'components/ResponsiveImage';
import { FULL_WIDTH_RESPONSIVE_IMAGE_SIZES } from 'js/helpers/constants';

const GuideBannerImage = ({ image }) => {
  const imagesPath = `${process.env.CMS_MEDIA}/images`;
  const imageFilename = path.basename(
    image.filename,
    path.extname(image.filename),
  );
  const imageExtension = path.extname(image.filename).substring(1);
  const imageTitle = image.title;

  return (
    <div className="coa-GuidePageBannerContainer">
      <ResponsiveImage
        className="coa-GuidePageBannerImage"
        filename={`${imagesPath}/${imageFilename}`}
        defaultWidth="width-1080"
        widths={FULL_WIDTH_RESPONSIVE_IMAGE_SIZES}
        extension={imageExtension}
        aria-label={imageTitle}
        altText={imageTitle}
      />
    </div>
  );
};

export default GuideBannerImage;
