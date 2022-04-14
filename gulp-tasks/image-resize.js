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

// 640,820,1024

const CONFIGS = [
    // {
    //     directory: "_head",
    //     targetFormat: ["jpg", "webp"],
    //     quality: 50,
    //     sizes: [
    //         ...RESPONSIVE_SIZES.map((e) => ({ ...e, h: 800 })),
    //     ],
    // },
    // {
    //     directory: "_big-slider",
    //     targetFormat: ["jpg", "webp"],
    //     quality: 50,
    //     sizes: RESPONSIVE_SIZES_DESKTOP,
    // },
     {
        directory: "_mobile",
        targetFormat: ["jpg", "webp"],
        quality: 70,
        sizes: [
            {w: 1024},
            {w: 820},
            {w: 640}
        ],
    },
    // {
    //     directory: "_footer",
    //     targetFormat: ["jpg", "webp"],
    //     quality: 70,
    //     sizes: [
    //         ...RESPONSIVE_SIZES_DESKTOP,
    //         ...RESPONSIVE_SIZES_MOBILE.map((e) => ({ ...e, h: 600 })),
    //     ],
    // },
    // {
    //     directory: "_abstract",
    //     targetFormat: ["jpg", "webp"],
    //     quality: 90,
    //     sizes: [{ w: 320 }, { w: 640 }],
    // },
    // {
    //     directory: "_prevs-after",
    //     targetFormat: ["jpg", "webp"],
    //     quality: 50,
    //     sizes: [
    //         ...RESPONSIVE_SIZES_DESKTOP,
    //         ...RESPONSIVE_SIZES_MOBILE.map((e) => ({ ...e, h: 600 })),
    //     ],
    // },
    // {
    //     directory: "_head-mobile",
    //     sizes: [
    //         {w: 640},
    //         {w: 820},
    //         {w: 1024}
    //     ],
    // },
    // {
    //     directory: "_footer-mobile",
    //     sizes: [
    //         {w: 640},
    //         {w: 820},
    //         {w: 1024}
    //     ],
    // },
    // {
    //     directory: "_abstract",
    //     sizes: [{ w: 320 }, { w: 640 }, { w: 1200 }],
    // },
    // {
    //     directory: "_prevs-bg",
    //     targetFormat: ["jpg", "webp"],
    //     quality: 50,
    //     sizes: [{ w: 480 }, { w: 640 }, { w: 1240 }],
    // },
    // {
    //     directory: "_prevs-after",
    //     targetFormat: ["jpg", "webp"],
    //     quality: 50,_
    //     sizes: [
    //         ...RESPONSIVE_SIZES_DESKTOP,
    //         ...RESPONSIVE_SIZES_MOBILE.map((e) => ({ ...e, h: 600 })),
    //     ],
    // },
    // {
    //     directory: "_prevs-after-mobile",
    //     sizes: [
    //         {w: 640},
    //         {w: 820},
    //         {w: 1024}
    //     ],
    // },
    {
        directory: "_logo",
        targetFormat: ["png", "webp"],
        sizes: [{ w: 510 }, { w: 800 }],
    },
    // {
    //     directory: "_prevs",
    //     sizes: [{ w: 480 }, { w: 640 }],
    // },
];

function resizeTask(
    managedFormats = ["jpg", "png"],
    imgDist = "src/_images/otp/"
) {
    CONFIGS.forEach(
        ({
            directory,
            sizes,
            type,
            quality = IMAGE_QUALITY,
            targetFormat = FORMATS,
        }) => {
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

                                // if (format === "jpg" || format === "jpeg") {
                                //     imageClone.flatten({
                                //         background: { r: 0, g: 0, b: 0 },
                                //     });
                                // }

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
