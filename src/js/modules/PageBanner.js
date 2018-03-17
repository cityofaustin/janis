import React from 'react';

const PageBanner = ({ image }) => {
  if(!image) return;

  return (
    <div
      className="coa-PageBanner"
      style={{
        backgroundImage: `url(${process.env.CMS_MEDIA}/${image.file})`
      }}
      role="img"
      aria-label={image.title}
    />
  );
}

export default PageBanner;
