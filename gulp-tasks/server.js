const browserSync = require("browser-sync").create();
const { STATICS, proxy } = require('./constants');

function browserSyncTask(cb) {
    browserSync.init({
        notify: false,
        open: false,
        serveStatic: STATICS,
        proxy,
    });
    cb();
}

function browsersyncReload(cb) {
    browserSync.reload();
    cb();
}

module.exports = {
  browserSyncTask,
  browsersyncReload,
  browserSync
}