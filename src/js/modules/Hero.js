import React from 'react';

const Hero = ({ image, callout }) => {

  if (image) {
    return (
      <div
        className="coa-Hero"
        style={{
          backgroundImage: `url(${process.env.CMS_MEDIA}/${image.file})`
        }}
        role="img"
        aria-label={image.title}
      >
        { callout && <h2 className="coa-Hero__callout">{callout}</h2> }
      </div>
    );
  }

  return (
    <div className="coa-Hero">
      { callout && <h2 className="coa-Hero__callout">{callout}</h2> }
    </div>
  );
}

export default Hero;
