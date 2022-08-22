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
    //         ...RESPONSIVE_SIZES_DESKTOP.map((size) => ({ w: size.w })),
    //         ...RESPONSIVE_SIZES_MOBILE.map((size) => ({ w: size.w, h: 640 })),
    //     ],
    //     quality: 75,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_top/mobile",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_MOBILE.map((size) => ({ w: size.w })),
    //     ],
    //     quality: 75,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_video",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_DESKTOP.map((size) => ({ w: size.w })),
    //         ...RESPONSIVE_SIZES_MOBILE.map((size) => ({ w: size.w, h: 740 })),
    //     ],
    //     quality: 90,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_top_v",
    //     sizes: [
    //         ...[300, 560].map((size) => ({ w: size })),
    //     ],
    //     quality: 85,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_phone",
    //     sizes: [
    //         ...[250, 500].map((size) => ({ w: size })),
    //     ],
    //     quality: 85,
    //     targetFormat: ["png"],
    //     // outputOptions: {
    //     //     mozjpeg: true,
    //     // },
    // },
    // {
    //     directory: "_icons",
    //     sizes: [
    //         ...[256].map((size) => ({ w: size })),
    //     ],
    //     quality: 85,
    //     targetFormat: ["png"],
    //     // outputOptions: {
    //     //     mozjpeg: true,
    //     // },
    // },

    // {
    //     directory: "_man",
    //     sizes: [
    //         ...[200].map((size) => ({ w: size })),
    //     ],
    //     quality: 85,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_box",
    //     sizes: [
    //         ...[512, 256].map((size) => ({ w: size })),
    //     ],
    //     quality: 90,
    //     targetFormat: ["webp", "png"],
    //     // outputOptions: {
    //     //     mozjpeg: true,
    //     // },
    // },

    // {
    //     directory: "_mobile/s2",
    //     sizes: [
    //         ...[1024, 960, 640].map((size) => ({ w: size })),
    //     ],
    //     quality: 90,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_promo",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_DESKTOP,
    //         ...RESPONSIVE_SIZES_MOBILE.map((size) => ({ ...size, h: 500 })),
    //     ],
    //     quality: 90,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_quote",
    //     sizes: [600, 300].map((size) => ({ w: size })),
    //     quality: 90,
    //     targetFormat: ["png"],
    //     // outputOptions: {
    //     //     mozjpeg: true,
    //     // },
    // },
    // {
    //     directory: "_slider_1/bg",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_DESKTOP.map((size) => ({ w: size.w })),
    //         ...RESPONSIVE_SIZES_MOBILE.map((size) => ({ w: size.w, h: 640 })),
    //     ],
    //     quality: 90,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_slider_1/title",
    //     sizes: [1000, 640, 320].map((size) => ({ w: size })),
    //     quality: 90,
    //     targetFormat: ["webp", "png"],
    //     // outputOptions: {
    //     //     mozjpeg: true,
    //     // },
    // },

    //  {
    //     directory: "_boxy/box",
    //     sizes: [256, 512].map((size) => ({ w: size })),
    //     quality: 90,
    //     targetFormat: ["webp", "png"],
    //     // outputOptions: {
    //     //     mozjpeg: true,
    //     // },
    // },
    // {
    //     directory: "_static/guy",
    //     sizes: [900, 640, 320].map((size) => ({ w: size })),
    //     quality: 90,
    //     targetFormat: ["webp", "png"],
    //     // outputOptions: {
    //     //     mozjpeg: true,
    //     // },
    // },

    // {
    //     directory: "_deco",
    //     sizes: [640].map((size) => ({ w: size })),
    //     quality: 90,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_static/bg",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_DESKTOP.map((size) => ({ w: size.w })),
    //         ...RESPONSIVE_SIZES_MOBILE.map((size) => ({ w: size.w, h: 640 })),
    //     ],
    //     quality: 90,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_tech-spec/bg",
    //     sizes: RESPONSIVE_SIZES.map((size) => ({ w: size.w })),
    //     quality: 90,
    //     targetFormat: ["jpg"],
    //     // outputOptions: {
    //     //     mozjpeg: true,
    //     // },
    // },

    // {
    //     directory: "_tech-spec",
    //     sizes: [940, 640, 320].map((size) => ({ w: size })),
    //     quality: 90,
    //     targetFormat: ["webp", "png"],
    //     // outputOptions: {
    //     //     mozjpeg: true,
    //     // },
    // },

    // {
    //     directory: "_boxy/bg",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_DESKTOP.map((size) => ({ w: size.w })),
    //         ...RESPONSIVE_SIZES_MOBILE.map((size) => ({ w: size.w, h: 640 })),
    //     ],
    //     quality: 90,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_static/mask",
    //     sizes: [1280, 960, 640].map((size) => ({ w: size })),
    //     quality: 90,
    //     targetFormat: ["png", "webp"],
    // },
    // {
    //     directory: "_static/ui",
    //     sizes: [1500, 1280, 960, 640].map((size) => ({ w: size })),
    //     quality: 90,
    //     targetFormat: ["png", "webp"],
    // },

    // {
    //     directory: "_posters/big",
    //     sizes: [1280, 960, 640].map((size) => ({ w: size })),
    //     quality: 90,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_posters/st",
    //     sizes: [900, 640, 320].map((size) => ({ w: size })),
    //     quality: 50,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    {
        directory: "_boxy/icon",
        sizes: [256, 125].map((size) => ({ w: size })),
        quality: 90,
        targetFormat: ["webp", "png"],
        // outputOptions: {
        //     mozjpeg: true,
        // },
    },
    // {
    //     directory: "_slider_steps",
    //     sizes: [1920, 1280, 960, 640].map((size) => ({ w: size })),
    //     quality: 85,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_slider_1/bg",
    //     sizes: [2560, 1920, 1500, 1280, 960, 640].map((size) => ({ w: size })),
    //     quality: 90,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_slider_1/detail",
    //     sizes: [1600, 1280, 960, 640].map((size) => ({ w: size })),
    //     quality: 85,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_slider_2",
    //     sizes: [2560, 1920, 1280, 960, 640].map((size) => ({ w: size })),
    //     quality: 45,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
    // {
    //     directory: "_slider_2/detail",
    //     sizes: [1000, 640].map((size) => ({ w: size })),
    //     quality: 85,
    //     targetFormat: ["png"],
    //     // outputOptions: {
    //     //     mozjpeg: true,
    //     // },
    // },

    // {
    //     directory: "_slider_2",
    //     sizes: [1280, 960, 640].map((size) => ({ w: size })),
    //     quality: 85,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_suggested",
    //     sizes: [640, 960, 1280, 1920].map((size) => ({ w: size })),
    //     quality: 85,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_suggested_sq",
    //     sizes: [640, 800].map((size) => ({ w: size })),
    //     quality: 85,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_suggested_deco",
    //     sizes: [640, 960, 1000].map((size) => ({ w: size })),
    //     quality: 85,
    //     targetFormat: ["png"],
    //     // outputOptions: {
    //     //     mozjpeg: true,
    //     // },
    // },
    // {
    //     directory: "_footer",
    //     sizes: [
    //         ...[640, 960, 1280, 1920, 2560].map((size) => ({
    //             w: size,
    //         })),
    //     ],
    //     quality: 75,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },

    // {
    //     directory: "_footer_woman",
    //     sizes: [
    //         ...[1000, 640].map((size) => ({
    //             w: size,
    //         })),
    //     ],
    //     quality: 85,
    //     targetFormat: ["jpg"],
    //     outputOptions: {
    //         mozjpeg: true,
    //     },
    // },
];

const PAGE_NAME = "mfreezeframe";

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
                    console.log(name);

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

                            [...new Set([...targetFormat])].forEach(
                                (format) => {
                                    console.log("save:", format);
                                    saveFile(format);
                                }
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
