const RESPONSIVE_SIZES_MOBILE = [
    {w: 640},
    {w: 960}
];

const RESPONSIVE_SIZES_DESKTOP = [
    {w: 1280},
    {w: 1920},
    {w: 2560},
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
    {
        route: '/vendor',
        dir: ["src/scripts/vendor", "src/css/vendor"],
    }
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
        src: "src/_images/*.jpg",
        dist: "dist/images",
    },
    templates: "mysite/views/**/*.(jinja|jinja2)",
};

module.exports = {
    RESPONSIVE_SIZES,
    RESPONSIVE_SIZES_MOBILE,
    RESPONSIVE_SIZES_DESKTOP,
    DIRECTORIES,
    STATICS,
    DIRS,
    proxy: proxy(),
};
