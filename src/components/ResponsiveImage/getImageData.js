import path from 'path';

/**
  From a Joplin image object, returns:
    imageFilename: full CMS_MEDIA path to image
    imageExtension: image file extension (jpg)
    imageTitle: altText for the image
**/
const getImageData = (image) => {
  const imageBasename = path.basename(
    image.filename,
    path.extname(image.filename),
  );
  const imageFilename = `${process.env.CMS_MEDIA}/images/${imageBasename}`
  const imageExtension = path.extname(image.filename).substring(1);
  const imageTitle = image.title;
  return {
    imageFilename,
    imageExtension,
    imageTitle
  }
}

export default getImageData;
