const { src, dest } = require("gulp");
const sharp = require("sharp");
const through2 = require("through2");
const rename = require("gulp-rename");
const argv = require('yargs').argv;
// const imagemin = require('gulp-imagemin');
const { DIRS, RESPONSIVE_SIZES_DESKTOP, RESPONSIVE_SIZES_MOBILE } = require("./constants");

const { RESPONSIVE_SIZES } = require('./constants');

function resizeTask(size, imgSrc = DIRS.images.src, imgDist = DIRS.images.dist) {
  return src(imgSrc)
    .pipe(
      through2.obj(async function (file, _, cb) {
        // make sharp instance
        const img = sharp(file.contents);

        if (!img) return;
        // read image size
        const imgMetadata = await img.metadata();
        const imgWidth = imgMetadata.width;
        console.log(imgWidth);
        if (imgWidth >= size) {
          // do stuff
          const resizedImg = img.resize(size);
          const resizedImgBuffer = await resizedImg.toBuffer();

          file.contents = resizedImgBuffer;
        } else {
          cb()
          return;
        }

        return cb(null, file)
      })
    )
    .pipe(rename(function(path) {
        path.basename = path.basename.toLowerCase()
        path.basename = `${path.basename.split(' ').join('_')}-${size}`
      })
    )
    // .pipe(imagemin())
    .pipe(dest(imgDist));
}

function resizeImages(cb) {
  RESPONSIVE_SIZES.forEach(size => {
    resizeTask(size)
  })
  cb()
}

function resizeImagesMobile(cb) {
  RESPONSIVE_SIZES_MOBILE.forEach(size => {
    resizeTask(size, `${DIRS.images.src}/mobile/*`)
  })
  cb()
}

function resizeImagesDesktop(cb) {
  RESPONSIVE_SIZES_DESKTOP.forEach(size => {
    resizeTask(size, `${DIRS.images.src}/desktop/*`)
  })
  cb()
}

function resizeImagesCustom(cb) {
  const sizes = JSON.parse(argv.width);
  sizes.forEach(size => {
    resizeTask(size, `${DIRS.images.src}/custom/*`)
  })
  cb()
}

module.exports = {
  resizeImages,
  resizeImagesMobile,
  resizeImagesDesktop,
  resizeImagesCustom
};
