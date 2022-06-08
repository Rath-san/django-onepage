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
const IMAGE_QUALITY = 50;

// 640, 820, 1024;

const CONFIGS = [
    // {
    //     directory: '_footer',
    //     targetFormat: ["jpg"],
    //     quality: 50,
    //     sizes: [
    //         ...RESPONSIVE_SIZES_DESKTOP.map((size) => ({ ...size, h: 860 })),
    //         ...RESPONSIVE_SIZES_MOBILE.map((size) => ({ ...size, h: 740 })),
    //     ],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: '_top',
    //     targetFormat: ["jpg"],
    //     quality: 50,
    //     sizes: [
    //         ...RESPONSIVE_SIZES_DESKTOP.map((size) => ({ ...size, h: 860 })),
    //         {w: 640, h: 860},
    //         {w: 960, h: 690}
    //     ],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: '_prevs',
    //     targetFormat: ["jpg"],
    //     quality: 90,
    //     sizes: [
    //         {w: 825},
    //         {w: 410}

    //     ],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: '_mobile',
    //     targetFormat: ["jpg"],
    //     quality: 75,
    //     sizes: [
    //         {w: 1024},
    //         {w: 960},
    //         {w: 640}
    //     ],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: '_prev',
    //     targetFormat: ["jpg"],
    //     quality: 90,
    //     sizes: [
    //         ...RESPONSIVE_SIZES.map((size) => ({ ...size, h: 860 })),
    //     ],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    {
        directory: '_wide',
        targetFormat: ["jpg"],
        quality: 50,
        sizes: [
            ...RESPONSIVE_SIZES_DESKTOP.map((size) => ({ ...size })),
            ...RESPONSIVE_SIZES_MOBILE.map((size) => ({ ...size, hmin:400 }))
        ],
        outputOptions: {
            mozjpeg: true,
        },
    },
    // {
    //     directory: '_slider',
    //     targetFormat: ["jpg"],
    //     quality: 50,
    //     sizes: [
    //         ...RESPONSIVE_SIZES_DESKTOP.map((size) => ({ ...size })),
    //         ...RESPONSIVE_SIZES_MOBILE.map((size) => ({ ...size, hmin:400 }))
    //     ],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_deco_comp",
    //     sizes: [
    //         {w: 1080},
    //         {w: 540},
    //         {w: 270}
    //     ],
    //     quality: 75,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: '_end',
    //     targetFormat: ["jpg"],
    //     quality: 75,
    //     sizes: [
    //         {w: 900},
    //         {w: 450},
    //         {w: 225}
    //     ],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: '_scribble',
    //     targetFormat: ["jpg"],
    //     quality: 75,
    //     sizes: [
    //         {w: 2100},
    //         {w: 1050},
    //         {w: 525},
    //         {w: 260},
    //     ],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_box",
    //     targetFormat: ["webp", "png"],
    //     quality: 75,
    //     sizes: [{ w: 256 }, { w: 512 }],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
];

function resizeTask(
    managedFormats = ["jpg", "jpeg", "png"],
    imgDist = "src/mtransition_noise/_images/otp/",
    imgInput = "src/mtransition_noise/_images/",
) {
    CONFIGS.forEach(
        ({
            directory,
            sizes,
            type,
            quality = IMAGE_QUALITY,
            outputOptions = {},
            targetFormat = FORMATS,
        }) => {
            const fileSrcs = managedFormats.map(
                (format) => `${imgInput}${directory}/*.${format}`
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
                        const heightMin = size.hmin;

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
                                const imageClone = await (async () => {
                                    // minheight
                                    const clone = img.clone();
                                    let cloneResized = clone.resize(width, height, {});
                                    if (heightMin) {
                                        const {info} = await cloneResized.toBuffer({ resolveWithObject: true })

                                        // console.log(cloneResized);
                                        if (info?.height < heightMin) {
                                            cloneResized = clone.resize(width, heightMin, {})
                                        }
                                    }
                                    return cloneResized;
                                })();

                                // if (format === "jpg" || format === "jpeg") {
                                //     imageClone.flatten({
                                //         background: { r: 0, g: 0, b: 0 },
                                //     });
                                // }

                                imageClone.toFormat(format, {
                                    quality,
                                    ...outputOptions,
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

                            [...new Set([...targetFormat])].forEach((format) =>
                                saveFile(format)
                            );
                        }
                    });

                    return cb();
                })
            );
        }
    );
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
