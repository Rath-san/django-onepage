const { src, dest } = require("gulp");
const sharp = require("sharp");
const through2 = require("through2");
const rename = require("gulp-rename");
const argv = require("yargs").argv;
const path = require("path");
const {
    DIRS,
    RESPONSIVE_SIZES_DESKTOP,
    RESPONSIVE_SIZES_MOBILE,
    RESPONSIVE_SIZES,
} = require("./constants");

function resizeTask(
    size,
    imgSrc = DIRS.images.src,
    imgDist = DIRS.images.dist
) {
    return src(imgSrc).pipe(
        through2.obj(async function (file, _, cb) {

            const width = size.w;
            const height = size.h ?? 860;
            // make sharp instance
            const img = sharp(file.contents);

            if (!img) return;
            // read image size
            const imgMetadata = await img.metadata();
            const imgWidth = imgMetadata.width;
            if (imgWidth >= width) {
                // do stuff
                const resizedImg = img.resize(width, height, {
                    fastShrinkOnLoad: false,
                });

                resizedImg.toFormat("jpg", {
                    quality: 75,
                });

                const generateName = (customExt) => {
                    const fileBaseName = file.basename;
                    const fileExtOriginal = file.extname;
                    const fileExt = customExt ? `.${customExt}` : file.extname;
                    const fileBaseNameWithoutExt = fileBaseName.slice(
                        0,
                        -fileExtOriginal.length
                    );
                    return `${fileBaseNameWithoutExt
                        .split(" ")
                        .join("_")}-${width}${fileExt}`;
                };

                const saveFile = (format) => {
                    const clone = resizedImg.clone();

                    if (format) {
                        clone.toFormat(format, {
                          quality: 85
                        });
                    }

                    clone.toFile(
                        path.resolve(
                            __dirname,
                            "../",
                            imgDist,
                            `${generateName(format ?? 0)}`
                        )
                    );
                };

                const formats = [null, 'webp'];
                formats.forEach((f) => {
                    saveFile(f);
                });

                // const resizedImgBuffer = await resizedImg.toBuffer();

                // file.contents = resizedImgBuffer;
            } else {
                cb();
                return;
            }

            return cb();
        })
    );
    // .pipe(rename(function(path) {
    //     path.basename = path.basename.toLowerCase()
    //     path.basename = `${path.basename.split(' ').join('_')}-${size}`
    //   })
    // )
    // // .pipe(imagemin())
    // .pipe(dest(imgDist));
}

function resizeImages(cb) {
    RESPONSIVE_SIZES.forEach((size) => {
        resizeTask(size);
    });
    cb();
}

function resizeImagesMobile(cb) {
    RESPONSIVE_SIZES_MOBILE.forEach((size) => {
        resizeTask(size, `${DIRS.images.src}/mobile/*`);
    });
    cb();
}

function resizeImagesDesktop(cb) {
    RESPONSIVE_SIZES_DESKTOP.forEach((size) => {
        resizeTask(size, `${DIRS.images.src}/desktop/*`);
    });
    cb();
}

function resizeImagesCustom(cb) {
    const sizes = JSON.parse(argv.width);
    sizes.forEach((size) => {
        resizeTask(size, `${DIRS.images.src}/custom/*`);
    });
    cb();
}

module.exports = {
    resizeImages,
    resizeImagesMobile,
    resizeImagesDesktop,
    resizeImagesCustom,
};
