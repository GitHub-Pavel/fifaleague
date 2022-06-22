const sortCSSmq = require('sort-css-media-queries');
const mix = require('laravel-mix');
const classnames = require('classnames');

require('laravel-mix-ejs');

const {
  paths 
} = require('./package.json');

const {
  src,
  dist
} = paths;

mix.js( 
  src + '/js/main.js', 
  dist + '/js' 
);

mix.sass(
  src + '/scss/style.scss',
  dist + '/css',
  {},
  [
    require('css-mqpacker')({
      sort: sortCSSmq
    }),
    require('cssnano')({
      preset: [
        'default', 
        {
          discardCommnets: {
            removeAll: true
          }
        }
      ]
    })
  ]
).options({
  processCssUrls: false
});

mix.ejs(src + '/views', dist, 
{
  name: "FIFA League",
  placeholder: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
  classnames
},
{
  root: src+'/views/',
  partials: [src+'/views/partials', src+'/views/common'],
  rmWhitespace: true
}
);

mix.browserSync({
  files: [
    dist + '/js/main.js',
    dist + '/img/**/*',
    dist + '/fonts/*'
  ],
  server: {
    baseDir: dist,
  },
  watch: true
});