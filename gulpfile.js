const { watch, series } = require("gulp");
const {
  resizeImages,
  resizeImagesDesktop,
  resizeImagesMobile,
  resizeImagesCustom,
} = require("./gulp-tasks/image-resize");
const scssTask = require("./gulp-tasks/styles");
const jsTask = require("./gulp-tasks/scripts");
const {
  browsersyncReload,
  browserSyncTask,
} = require("./gulp-tasks/server");

const { DIRS } = require("./gulp-tasks/constants");

function watchTask() {
  watch(DIRS.templates, browsersyncReload);
  watch(DIRS.styles.src, scssTask);
  watch(DIRS.scripts.src, series(jsTask, browsersyncReload));
}

module.exports = {
  resize: resizeImages,
  resizeMobile: resizeImagesMobile,
  resizeDesktop: resizeImagesDesktop,
  resizeCustom: resizeImagesCustom,
  dev: series(
    scssTask,
    jsTask,
    browserSyncTask,
    watchTask
  ),
};
