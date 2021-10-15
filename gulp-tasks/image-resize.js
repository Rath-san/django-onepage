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

const BREAKPOINTS = {
    mobile: "m",
    desktop: "d",
};

/*
    ex
    * desktop only with constant height
        'mbundle_footer-d_2560x860.jpg'
    * mobile only with proportional height
        'mbundle_footer-m_2560.jpg'
    * with constant height on all breakpoints
        'mbundle_footer-2560.jpg'
*/

function resizeTask(
    size,
    imgSrc = [DIRS.images.src, "src/_images/*.png"],
    imgDist = DIRS.images.dist
) {
    return src(imgSrc).pipe(
        through2.obj(async function (file, _, cb) {
            const [name, meta] = file.basename.split("-");

            // if m | d perform resizing acording to mobile or desktop only
            const bpExec = /(d|m)_/gi.exec(meta);
            const breakpoint = bpExec ? bpExec[1] : undefined;
            const isMobileOnly = breakpoint === BREAKPOINTS.mobile;

            const activeBreakpoints = 
            !breakpoint
                ? RESPONSIVE_SIZES
                : isMobileOnly
                    ? RESPONSIVE_SIZES_MOBILE
                    : RESPONSIVE_SIZES_DESKTOP;

            // if hasHeight resize acordingly
            const hExec = /x(.+)\./gi.exec(meta);
            const height = hExec ? Number(hExec[1]) : undefined;
            // make sharp instance
            const img = sharp(file.contents);

            if (!img) return;
            // read image size
            const imgMetadata = await img.metadata();
            const imgWidth = imgMetadata.width;

            // do stuff
            activeBreakpoints.forEach((size) => {
                const width = size.w;
                const generateName = (customExt) => {

                    const fileExt = customExt
                        ? `.${customExt}`
                        : file.extname;
    
                    return `${name
                        .split(" ")
                        .join("_")}-${!breakpoint ? '' : isMobileOnly ? 'm_' : 'd_'}${width}${fileExt}`;
                };


                if (imgWidth >= width) {
                    const resizedImg = img.resize(width, height, {
                        // fastShrinkOnLoad: false,
                    });

                    resizedImg.toFormat("png", {
                        quality: 100,
                    });

                    const saveFile = async (format) => {
                        const clone = resizedImg.clone();

                        if (format) {
                            clone.toFormat(format, {
                                quality: 50,
                            });
                        }

                        await clone.toFile(
                            path.resolve(
                                __dirname,
                                "../",
                                imgDist,
                                `${generateName(format ?? 0)}`
                            )
                        );
                    };

                    const FORMATS = [null, "webp"];
                    FORMATS.forEach((f) => {
                        saveFile(f);
                    });
                }
            });

            return cb();
        })
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
