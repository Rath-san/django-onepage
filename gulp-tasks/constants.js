const BASE_WIDTH = 640;

const RESPONSIVE_SIZES_MOBILE = [
  320,
  640,
  960,
  1024,
]

const RESPONSIVE_SIZES_DESKTOP = [
  1800,
  2560
]
const RESPONSIVE_SIZES = [
  // BASE_WIDTH,
  // BASE_WIDTH * 2,
  // BASE_WIDTH * 3,
  // BASE_WIDTH * 4,
  ...RESPONSIVE_SIZES_MOBILE,
  ...RESPONSIVE_SIZES_DESKTOP
];

const proxy = (options) => {
    const defaults = { url: "localhost", port: 8000 }
    const opts = {...defaults, ...options}

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
        dir: "src/images",
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
  ]

const DIRS = {
  src: 'src',
  dist: 'dist',
  styles: {
    src: 'src/scss/*.scss'
  },
  scripts: {
    src: 'src/scripts/**/*.js'
  },
  images: {
    src: 'src/images',
    dist: 'dist/images'
  },
  templates: 'mysite/views/**/*.(jinja|jinja2)'
}

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
