const { src /*dest*/ } = require("gulp");
const through2 = require("through2");
const {resolve} = require("path");
const pathToFfmpeg = require('ffmpeg-static');

const shell = require('any-shell-escape')
const {exec} = require('child_process')

const FORMATS = ["mp4"];
const VIDEO_QUALITY = 28; // this is not deterministic lower = uglier

const CONFIGS = [
    // {
    //     directory: "_prevs",
    // },
    // {
    //     directory: "_promo",
    // },
    {
        directory: 'filmlook'
    }
];

function resizeTask(
    managedFormats = ["mov", "mp4"],
    videoDist = "src/_videos/otp/"
) {
    CONFIGS.forEach(({ directory }) => {
        const fileSrcs = managedFormats.map(
            (format) => `src/_videos/${directory}/*.${format}`
        );

        return src(fileSrcs).pipe(
            through2.obj(async function (file, _, cb) {
                const convert = shell([
                    pathToFfmpeg, '-y', '-v', 'error',
                    '-i', file.path,
                    '-c:v', 'libx264',

                    // '-c:v', 'libvpx',

                    '-crf', VIDEO_QUALITY,
                    '-profile:v', 'high',
                    '-pix_fmt', 'yuv420p',
                    '-color_primaries', 1,
                    '-color_trc', 1,
                    '-colorspace', 1,
                    '-an',
                    resolve(videoDist, `${file.basename}`)
                    ])

                exec(convert, (err) => {
                    if (err) {
                        console.error(err)
                        process.exit(1)
                    } else {
                        console.info('done!')
                    }
                })

                return cb();
            })
        );
    });
}

function resizeVideos(cb) {
    resizeTask();
    cb();
}

module.exports = {
    resizeVideos,
};
