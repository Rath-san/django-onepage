const { src /*dest*/ } = require("gulp");
const sharp = require("sharp");
const through2 = require("through2");
const argv = require("yargs").argv;
const path = require("path");
const {
    DIRS,
    RESPONSIVE_SIZES_DESKTOP,
    RESPONSIVE_SIZES_MOBILE,
    RESPONSIVE_SIZES,
} = require("./constants");

const FORMATS = ["jpg"];
const IMAGE_QUALITY = 90;

const CONFIGS = [
    // {
    //     directory: '_basic',
    //     sizes: [
    //         {w: 500},
    //         {w: 250}
    //     ],
    // }
    // {
    //     directory: '_footer',
    //     sizes: [
    //         ...RESPONSIVE_SIZES_MOBILE,
    //         ...RESPONSIVE_SIZES_DESKTOP
    //     ],
    // },

    {
        directory: '_mobile',
        sizes: RESPONSIVE_SIZES_MOBILE
    }

    // {
    //     directory: "_head",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_MOBILE,
    //         ...RESPONSIVE_SIZES_DESKTOP
    //     ]
    // },
    // {
    //     type: 'desktop',
    //     directory: "_desktop",
    //     sizes: RESPONSIVE_SIZES_DESKTOP,
    // },
    // {
    //     directory: "_all",
    //     sizes: RESPONSIVE_SIZES.map((size) => ({ ...size, h: 860 })),
    // },
    // {
    //     directory: "_slider",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_MOBILE.map((size) => ({ ...size, h: 300 })),
    //         ...RESPONSIVE_SIZES_DESKTOP
    //     ],
    // },
    // {
    //     directory: '_fcp',
    //     sizes: [
    //         {w: 152}
    //     ]
    // },
    // {
    //     directory: '_imac',
    //     sizes: [
    //         {w: 1540},
    //         {w: 770},
    //         {w: 385}
    //     ]
    // }

    // {
    //     directory: "_phones",
    //     sizes: [
    //         {w: 400},
    //     ],
    // },
    // {
    //     directory: "_show",
    //     sizes: [
    //         {w: 2000},
    //         {w: 1500},
    //         {w: 1000},
    //         {w: 500}
    //     ],
    // },
    // {
    //     directory: "_top",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_DESKTOP.map(size => ({...size, h: 860 })),
    //     ],
    // },

    // {
    //     directory: "_s7",
    //     sizes: [
    //         {w: 1200},
    //         {w: 600}
    //     ],
    // },
    // {
    //     directory: "_s6",
    //     sizes: [
    //         {w: 1150},
    //         {w: 575}
    //     ],
    // },
    // {
    //     directory: "_s5",
    //     sizes: [
    //         {w: 1000},
    //         {w: 500}
    //     ],
    // },
    // {
    //     directory: "_s4",
    //     sizes: [
    //         {w: 1200},
    //         {w: 600}
    //     ],
    // },

    // {
    //     directory: "_s3",
    //     sizes: [
    //         {w: 1000},
    //         {w: 500}
    //     ],
    // },
    // {
    //     directory: "_s2",
    //     sizes: [
    //         {w: 1200},
    //         {w: 600}
    //     ],
    // },
    // {
    //     directory: "_prev",
    //     sizes: [
    //         {w: 640},
    //         // {w: 320}
    //     ],
    // },
    // {
    //     directory: "_bg",
    //     sizes: [
    //         {w: 640},
    //         // {w: 320}
    //     ],
    // },
    



];

function resizeTask(
    managedFormats = ["jpg", "png"],
    imgDist = "src/_images/otp/"
) {
    CONFIGS.forEach(({ directory, sizes, type, quality = IMAGE_QUALITY, targetFormat = FORMATS }) => {
        const fileSrcs = managedFormats.map(
            (format) => `src/_images/${directory}/*.${format}`
        );
        return src(fileSrcs).pipe(
            through2.obj(async function (file, _, cb) {
                const [name] = file.basename.split("-");

                // make sharp instance
                const img = sharp(file.contents);

                if (!img) return;

                // read image size
                const { width: imgWidth } = await img.metadata();

                // do stuff
                sizes.forEach((size) => {
                    const width = size.w;
                    const height = size.h;

                    const generateName = (customExt) => {
                        const fileExt = customExt
                            ? `.${customExt}`
                            : file.extname;

                        const mobileDesktopAll = type
                            ? type === "mobile"
                                ? "m_"
                                : "d_"
                            : "";

                        const fName = name.split(".")[0];

                        return `${fName
                            .split(" ")
                            .join(
                                "_"
                            )}-${mobileDesktopAll}${width}${fileExt}`;
                    };

                    if (imgWidth >= width) {
                        // maintain high quality
                        img.toFormat("png", {
                            quality: 100,
                        });

                        const saveFile = async (format = file.extname) => {
                            const imageClone = img.clone();

                            if (format === 'jpg' || format === 'jpeg') {
                                imageClone.flatten({ background: { r: 0, g: 0, b: 0 } })
                            }

                            imageClone.resize(width, height, {});
                            imageClone.toFormat(format, {
                                quality,
                            });

                            await imageClone.toFile(
                                path.resolve(
                                    __dirname,
                                    "../",
                                    imgDist,
                                    `${generateName(format ?? 0)}`
                                )
                            );
                        };

                        targetFormat.forEach((format) => saveFile(format));
                    }
                });

                return cb();
            })
        );
    });
}

function resizeImages(cb) {
    resizeTask();
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
    resizeImagesCustom,
};
