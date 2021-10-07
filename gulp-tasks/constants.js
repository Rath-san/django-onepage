const BASE_WIDTH = 320;

const RESPONSIVE_SIZES_MOBILE = [
    {w: BASE_WIDTH},
    {w: BASE_WIDTH * 2},
    {w: BASE_WIDTH * 3},
    {w: BASE_WIDTH * 4},
];

const RESPONSIVE_SIZES_DESKTOP = [
    {w: BASE_WIDTH * 5},
    {w: BASE_WIDTH * 6},
    {w: BASE_WIDTH * 7},
    {w: BASE_WIDTH * 8},
];
const RESPONSIVE_SIZES = [
    ...RESPONSIVE_SIZES_MOBILE,
    ...RESPONSIVE_SIZES_DESKTOP,
];

const proxy = (options) => {
    const defaults = { url: "localhost", port: 8000 };
    const opts = { ...defaults, ...options };

    return `${opts.url}:${opts.port}`;
};

const DIRECTORIES = {
    dist: "dist",
    src: "src",
    images: {
        route: "/images",
        dir: "mysite/images",
    },
    css: {
        route: "/css",
        dir: "mysite/css",
    },
    scripts: {
        route: "/scripts",
        dir: "mysite/scripts",
    },
    static: {
        route: "/static",
        dir: "mysite/static",
    },
};

const STATICS = [
    {
        route: "/dist",
        dir: "dist",
    },
    {
        route: "/images",
        dir: "dist/images",
    },
    {
        route: "/css",
        dir: "src/css",
    },
    {
        route: "/scripts",
        dir: "src/scripts",
    },
    {
        route: "/static",
        dir: "src/static",
    },
];

const DIRS = {
    src: "src",
    dist: "dist",
    styles: {
        src: "src/scss/**/*.scss",
    },
    scripts: {
        src: "src/scripts/**/*.js",
    },
    images: {
        src: "src/images/*.jpg",
        dist: "dist/images",
    },
    templates: "mysite/views/**/*.(jinja|jinja2)",
};

module.exports = {
    BASE_WIDTH,
    RESPONSIVE_SIZES,
    RESPONSIVE_SIZES_MOBILE,
    RESPONSIVE_SIZES_DESKTOP,
    DIRECTORIES,
    STATICS,
    DIRS,
    proxy: proxy(),
};
