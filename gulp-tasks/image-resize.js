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

640,820,1024

const CONFIGS = [
    // {
    //     directory: "_bg",
    //     sizes: [
    //         {w: 2560}
    //     ],
    //     quality: 50,
    //     targetFormat: ["jpg"],
    // },
    {
        directory: "_gradient",
        sizes: [
            {w: 2560}
        ],
        quality: 50,
        targetFormat: ["jpg"],
        outputOptions: {
            mozjpeg: true
        }
    },
    // {
    //     directory: "_presets",
    //     sizes: [
    //         {w: 399},
    //     ],
    //     quality: 75,
    //     targetFormat: ["jpg"],
    // },
    // {
    //     directory: "_tuts",
    //     sizes: [
    //         {w: 1000},
    //         {w: 500},
    //         {w: 250},
    //     ],
    //     quality: 75,
    //     targetFormat: ["jpg"],
    // },
    // {
    //     directory: "_palette",
    //     sizes: [
    //         {w: 1200},
    //         {w: 600},
    //         {w: 300},
    //     ],
    //     quality: 75,
    //     targetFormat: ["png", "webp"],
    // },
    // {
    //     directory: "_ui",
    //     sizes: [
    //         {w: 2000},
    //         {w: 1000},
    //         {w: 500},
    //     ],
    //     quality: 75,
    //     targetFormat: ["png", "webp"],
    // },
    // {
    //     directory: "_head",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_DESKTOP,
    //         ...RESPONSIVE_SIZES_MOBILE.map((e) => ({ ...e, h: 600 })),
    //     ],
    // },
];

function resizeTask(
    managedFormats = ["jpg", "jpeg", "png"],
    imgDist = "src/_images/otp/"
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
                                    ...outputOptions
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
