const { src, dest } = require("gulp");
const hash = require("gulp-hash");
const path = require("path");

const { DIRS } = require("./constants");

function hashTask(cb) {
    return src(["dist/scripts.js", "dist/styles.css"])
        .pipe(
            hash({
                hashLength: 4,
            })
        )
        .pipe(dest(DIRS.dist))
        .pipe(
            hash.manifest("dist/assets.json", {
                // Generate the manifest file
                deleteOld: true,
                sourceDir: path.resolve(__dirname, '../dist'),
            })
        )
        .pipe(dest("."));
}

module.exports = { hashTask };
