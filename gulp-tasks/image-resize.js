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

const FORMATS = ["jpg", "webp"];
const IMAGE_QUALITY = 25;

const CONFIGS = [
    // {
    //     type: "mobile",
    //     directory: "_mobile",
    //     sizes: RESPONSIVE_SIZES_MOBILE,
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
    //         ...RESPONSIVE_SIZES_MOBILE.map((size) => ({ ...size, h: 400 })),
    //         ...RESPONSIVE_SIZES_DESKTOP
    //     ],
    // },
    // {
    //     directory: "_custom",
    //     sizes: [{w: 2332}],
    //     targetFormat: ["png", "webp"]
    // },
    // {
    //     directory: "_custom2",
    //     sizes: [{w: 760}],
    //     targetFormat: ["jpg", "webp"]
    // },
    // {
    //     directory: "_custom3",
    //     sizes: [{w: 600}],
    //     targetFormat: ["jpg", "webp"]
    // },
    // {
    //     directory: "_custom4",
    //     sizes: RESPONSIVE_SIZES
    // },
    // {
    //     directory: "_custom5",
    //     sizes: [{w: 640}],
    //     targetFormat: ["png", "webp"]
    // },
    {
        directory: "_custom6",
        sizes: [{w: 512}, {w: 360}],
        targetFormat: ["jpg", "webp"]
    },
    // {
    //     directory: "_prevs",
    //     sizes: [{w: 640}],
    //     targetFormat: ["jpg"]
    // },
    // {
    //     directory: "_slider_small",
    //     sizes: [{w: 1060}],
    // },
    // {
    //     directory: "_slider_small2",
    //     sizes: [{w: 1400}],
    // },
    // {
    //     directory: "_slider_small3",
    //     sizes: [{w: 1080}],
    // }
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
                                imageClone.flatten({ background: { r: 255, g: 255, b: 255 } })
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
