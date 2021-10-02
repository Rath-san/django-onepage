const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
// const terser = require("gulp-terser");
const browserSync = require("browser-sync").create();
const webpack = require("webpack-stream");
const { terser } = require("rollup-plugin-terser");
// const rollup = require('gulp-rollup');
// const aliases = require('gulp-style-aliases');

var sourcemaps = require("gulp-sourcemaps");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var rollup = require("@rollup/stream");

// Add support for require() syntax
var commonjs = require("@rollup/plugin-commonjs");

// Add support for importing from node_modules folder like import x from 'module-name'
var { nodeResolve } = require("@rollup/plugin-node-resolve");

const DIRS = {
  root: ".",
  src: "mysite",
  styles: "mysite/styles",
  scripts: "mysite/scripts",
  templates: "mysite/views",
};

var cache;

function scssTask(done) {
  return (
    src(`${DIRS.styles}/scss/*.scss`)
      // .pipe(aliases({
      //     "~": "node_modules/"
      // }))
      .pipe(
        sass({
          includePaths: ["node_modules"],
        })
      )
      .pipe(postcss([cssnano()]))
      .pipe(dest("dist"))
      .pipe(browserSync.stream())
  );
}

function jsTask(done) {
  // return src(`${DIRS.scripts}/**/*.js`)
  //     .pipe(rollup({
  //         // any option supported by Rollup can be set here.
  //         input: `${DIRS.scripts}/scripts.js`,
  //         output: {
  //             format: 'iife'
  //         }
  //     }))
  //     .pipe(terser())
  //     .pipe(dest("dist"))
  return (
    rollup({
      // Point to the entry file
      input: `${DIRS.scripts}/scripts.js`,

      // Apply plugins
      plugins: [commonjs(), nodeResolve(), terser()],

      // Use cache for better performance
      cache: cache,

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
      .pipe(dest("dist"))
  );
}

function browserSyncTask(cb) {
  browserSync.init({
    notify: false,
    open: false,
    serveStatic: [
      {
        route: "/dist",
        dir: "dist",
      },
      {
        route: "/images",
        dir: "mysite/images",
      },
      {
        route: "/css",
        dir: "mysite/css",
      },
      {
        route: "/scripts",
        dir: "mysite/scripts",
      },
      {
        route: "/static",
        dir: "mysite/static",
      },
    ],
    proxy: "localhost:8000",
    //   proxy: 'https://www.motionvfx.com/store,mfpsconverter,p1055.html'
  });
  cb();
}

function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

function watchTask() {
  watch(`${DIRS.templates}/**/*.(jinja|jinja2)`, browsersyncReload);
  // watch(`${DIRS.styles}/**/*.scss`, scssTask);
  // watch(`${DIRS.scripts}/**/*.js`, series(jsTask, browsersyncReload));
}

exports = {
  dev: series(browserSyncTask, watchTask),
};
