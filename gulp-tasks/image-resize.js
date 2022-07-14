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

const CONFIGS = [
    // {
    //     directory: "_top",
    //     sizes: [
    //         ...[1280, 1920, 2560, 3000].map((size) => ({ w: size, h: 960 })),
    //         ...[640, 960].map((size) => ({ w: size, h: 560 })),
    //     ],
    //     quality: 85,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_promo",
    //     sizes: [
    //         ...RESPONSIVE_SIZES,
    //         // ...RESPONSIVE_SIZES_MOBILE.map((size) => ({ ...size, h: 560 }))
    //     ],
    //     quality: 95,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_slides",
    //     sizes: [640, 960, 1280, 1800].map((size) => ({ w: size })),
    //     quality: 85,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_slides_mobile",
    //     sizes: [600, 1200].map((size) => ({ w: size })),
    //     quality: 75,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_mix",
    //     sizes: [1280, 1920, 2560].map((size) => ({ w: size, h: 1250})),
    //     quality: 75,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_mix_mobile",
    //     sizes: [640, 960, 1280, 1920].map((size) => ({ w: size, h: 860 })),
    //     quality: 75,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_prev_ins",
    //     sizes: [350, 700, 1400].map((size) => ({ w: size })),
    //     quality: 90,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_wide",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_DESKTOP.map((size) => ({ ...size, h: 960 })),
    //         ...RESPONSIVE_SIZES_MOBILE.map((size) => ({ ...size, h: 560 }))
    //     ],
    //     quality: 75,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_spices",
    //     sizes: [...[ 640, 960, 1280, 1920, 2560 ].map((size) => ({ w: size, hmin: 960}))],
    //     quality: 90,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_logo",
    //     sizes: [312, 624].map((s) => ({
    //         w: s,
    //     })),
    //     quality: 100,
    //     targetFormat: ["png", "webp"],
    //     // outputOptions: {
    //     //     mozjpeg: true,
    //     // },
    // },
    // {
    //     directory: "_spice_text_1",
    //     sizes: [400, 800].map((s) => ({ w: s })),
    //     quality: 90,
    //     targetFormat: ["png", "webp"],
    // },
    // {
    //     directory: "_spice_text_2",
    //     sizes: [400, 800].map((s) => ({ w: s })),
    //     quality: 90,
    //     targetFormat: ["png", "webp"],
    // },
    // {
    //     directory: "_watch_tutorial",
    //     sizes: [320, 640].map((s) => ({ w: s })),
    //     quality: 90,
    //     targetFormat: ["png", "webp"],
    // },
    // {
    //     directory: "_icon",
    //     sizes: [330, 156].map((s) => ({
    //         w: s,
    //     })),
    //     quality: 100,
    //     targetFormat: ["png", "webp"],
    //     // outputOptions: {
    //     //     mozjpeg: true,
    //     // },
    // },
    // {
    //     directory: "_footer",
    //     sizes: [
    //         ...[640, 960, 1280, 1920, 2560].map((size) => ({
    //             w: size,
    //             h: 1280,
    //         })),
    //     ],
    //     quality: 80,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_simple",
    //     sizes: [
    //         ...[1280, 1920, 2560].map((size) => ({
    //             w: size,
    //             h: 1250,
    //         })),
    //         ...[640, 960].map((size) => ({
    //             w: size,
    //             h: 800,
    //         })),
    //     ],
    //     quality: 80,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_tech",
    //     sizes: [
    //         ...[640, 960, 1280, 1920, 2560].map((size) => ({
    //             w: size,
    //             h: 1280,
    //         })),
    //     ],
    //     quality: 80,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    {
        directory: "_trailer",
        sizes: [
            ...[640, 960, 1280, 1920, 2560].map((size) => ({
                w: size,
                hmin: 600
            })),
        ],
        quality: 99,
        targetFormat: ["jpg"],
        outputOptions: {
            mozjpeg: true,
        },
    },
];

const PAGE_NAME = "transition";

function resizeTask(
    managedFormats = ["jpg", "jpeg", "png"],
    imgDist = `src/plugins/${PAGE_NAME}/_images/otp/`
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
                (format) =>
                    `src/plugins/${PAGE_NAME}/_images/${directory}/*.${format}`
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
                                    let cloneResized = clone.resize(
                                        width,
                                        height,
                                        {}
                                    );
                                    if (heightMin) {
                                        const { info } =
                                            await cloneResized.toBuffer({
                                                resolveWithObject: true,
                                            });

                                        // console.log(cloneResized);
                                        if (info?.height < heightMin) {
                                            cloneResized = clone.resize(
                                                width,
                                                heightMin,
                                                {}
                                            );
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
