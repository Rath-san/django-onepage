const { dest } = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const rollup = require("@rollup/stream");
const hash = require('rollup-plugin-hash');
const { terser } = require("rollup-plugin-terser");

// Add support for require() syntax
const commonjs = require("@rollup/plugin-commonjs");
// Add support for importing from node_modules folder like import x from 'module-name'
const { nodeResolve } = require("@rollup/plugin-node-resolve");

const { DIRS } = require("./constants");

let cache;

function jsTask() {
    return (
        rollup({
            // Point to the entry file
            input: `src/scripts/scripts.js`,

            // Apply plugins
            plugins: [commonjs(), nodeResolve(), terser()],

            // Use cache for better performance
            cache,

            // Note: these options are placed at the root level in older versions of Rollup
            output: {
                // Output bundle is intended for use in browsers
                // (iife = "Immediately Invoked Function Expression")
                format: "iife",

                // Show source code when debugging in browser
                sourcemap: true,
            },
        })
            .on("bundle", function (bundle) {
                // Update cache data after every bundle is created
                cache = bundle;
            })
            // Name of the output file.
            .pipe(source("scripts.js"))
            .pipe(buffer())

            // The use of sourcemaps here might not be necessary,
            // Gulp 4 has some native sourcemap support built in
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write("."))

            // Where to send the output file
            .pipe(dest(DIRS.dist))
    );
}

module.exports = jsTask;
