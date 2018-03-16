import React from 'react';
import GlobalSearch from 'js/modules/GlobalSearch';

const HeroHome = ({image, children}) => (
  <div
    className="coa-Hero coa-Hero--home"
    style={{
      backgroundImage: `
        linear-gradient(rgba(36, 11, 51, .3), rgba(36, 11, 51, .3)),
        url(${process.env.CMS_MEDIA}/${image.file})
      `,
      backgroundSize: 'cover',
      backgroundPosition: '50%',
    }}
    role="img"
    aria-label={image.title}
  >
    {children}
  </div>
);

export default HeroHome;
