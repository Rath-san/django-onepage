const { watch, series } = require("gulp");
const {
    resizeImages,
    resizeImagesCustom,
} = require("./gulp-tasks/image-resize");
const { resizeVideos } = require("./gulp-tasks/video-resize");
const scssTask = require("./gulp-tasks/styles");
const { jsTask, jsConcat } = require("./gulp-tasks/scripts");
const { browsersyncReload, browserSyncTask } = require("./gulp-tasks/server");

const { hashTask } = require("./gulp-tasks/hash-file");

const { DIRS } = require("./gulp-tasks/constants");

function watchTask() {
    watch(DIRS.templates, browsersyncReload);
    watch(DIRS.styles.src, series(scssTask, hashTask));
    watch(DIRS.scripts.src, series(jsTask, browsersyncReload, hashTask));
}

module.exports = {
    resizeImage: resizeImages,
    resizeVideo: resizeVideos,
    resizeCustom: resizeImagesCustom,
    dev: series(
        scssTask,
        // jsConcat,
        jsTask,
        browserSyncTask,
        watchTask
    ),
    concat: series(jsTask, hashTask),
};
