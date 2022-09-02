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
const IMAGE_QUALITY = 50;

const CONFIGS = [
    // {
    //     directory: "_team_photo",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_MOBILE,
    //         ...[
    //             {w: 2200},
    //             {w: 1600},
    //             {w: 1200},
    //         ]
    //     ]
    // },
    // {
    //     directory: "_team_us",
    //     sizes: RESPONSIVE_SIZES
    // },
    // {
    //     directory: "_work_left",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_MOBILE,
    //         ...[
    //             {w: 1100},
    //         ]
    //     ]
    // },
    // {
    //     directory: "_work_right",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_MOBILE,
    //         ...[
    //             {w: 2100},
    //             {w: 1700},
    //             {w: 1300}
    //         ]
    //     ]
    // },
    // {
    //     directory: "_apple",
    //     sizes: [
    //         ...RESPONSIVE_SIZES_MOBILE,
    //         ...[
    //             {w: 2000},
    //             {w: 1600},
    //             {w: 1200}
    //         ]
    //     ]
    // },
    {
        directory: "_footer_bg",
        sizes: RESPONSIVE_SIZES.map(e => ({...e, h: 1000}))
    },
    // {
    //     directory: "_person",
    //     sizes: [
    //         {w: 420},
    //         {w: 840},
    //     ]
    // },
    // {
    //     directory: "_test",
    //     sizes: [
    //         {w: 420},
    //         {w: 840}
    //     ]
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
