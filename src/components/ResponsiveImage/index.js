import React from 'react';
import PropTypes from 'prop-types';

const ResponsiveImage = ({ filename }) => (
  <img srcset={`${filename}.width-640.jpg 640w,
                ${filename}.width-720.jpg 720w,
                ${filename}.width-750.jpg 750w,
                ${filename}.width-828.jpg 828w,
                ${filename}.width-1080.jpg 1080w,
                ${filename}.width-1440.jpg 1440w,
                ${filename}.width-2160.jpg 2160w,`} 
          src={`${filename}.width-1080.jpg`} />
);

ResponsiveImage.propTypes = {
  filename: PropTypes.string.isRequired,
};

export default ResponsiveImage;
