const { watch, series } = require("gulp");
const {
  resizeImages,
  resizeImagesCustom,
} = require("./gulp-tasks/image-resize");
const scssTask = require("./gulp-tasks/styles");
const jsTask = require("./gulp-tasks/scripts");
const {
  browsersyncReload,
  browserSyncTask,
} = require("./gulp-tasks/server");

const { hashTask } = require('./gulp-tasks/hash-file');

const { DIRS } = require("./gulp-tasks/constants");

function watchTask() {
  watch(DIRS.templates, browsersyncReload);
  watch(DIRS.styles.src, series(scssTask, hashTask));
  watch(DIRS.scripts.src, series(jsTask, browsersyncReload, hashTask));
}

module.exports = {
  resize: resizeImages,
  resizeCustom: resizeImagesCustom,
  dev: series(
    scssTask,
    jsTask,
    browserSyncTask,
    watchTask,
  ),
};
