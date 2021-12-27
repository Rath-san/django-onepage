const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const { browserSync } = require("./server");

const { DIRS } = require("./constants");

function scssTask() {
    return (
        src("src/scss/*.scss")
            // .pipe(aliases({
            //     "~": "node_modules/"
            // }))
            .pipe(
                sass({
                    includePaths: ["node_modules"],
                })
            )
            .pipe(postcss([cssnano()]))
            .pipe(dest(DIRS.dist))
            .pipe(browserSync.stream())
    );
}

module.exports = scssTask;
