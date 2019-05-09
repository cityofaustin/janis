import React from 'react';
import PropTypes from 'prop-types';
import path from 'path';

import ResponsiveImage from 'components/ResponsiveImage';

const DirectorHeadshot = ({ photo }) => {
  const filename = photo.filename;
  const photoExtension = path.extname(filename);
  const photoBasename = path.basename(
    filename,
    photoExtension,
  );
  const filepath = `${process.env.CMS_MEDIA}/images/${photoBasename}`;

  return (
    <div className="coa-DepartmentPage__directorcard-headshot">
      <ResponsiveImage
        className="coa-DirectorHeadshotImage"
        filename={filepath}
        defaultWidth="width-640"
        widths={[]}
        extension={photoExtension}
        aria-label={photo.title}
        altText={photo.title}
      />
    </div>
  )
};

DirectorHeadshot.propTypes = {
  photo: PropTypes.object.isRequired,
};

export default DirectorHeadshot;
