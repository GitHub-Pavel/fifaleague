// Import external dependences
const {
  paths,
  name
} = require('../package.json');

// Import main dependences
const gulp = require('gulp');

// Import working dependencies
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');

// Import file dependences
const rimraf = require('rimraf');

// Variables
const runTimestamp = Math.round(Date.now()/1000);
const fontName = 'icons';


/*
 * Remove all icons from the font folder
 * It is necessary to clean up old icons and make future new icon fonts.
 */
const cleanIcons = cb => {
  rimraf( paths.dist + '/fonts/icons/icons.*', cb );
  rimraf( paths.src + '/scss/_icons.scss', cb );
};


// make icons into fonts folder
const icons = () => {
  return gulp.src( paths.src + '/icons/**/*.svg', {base: '../'})
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'gulp/icons-template.scss',
      targetPath: '../.' + paths.src + '/scss/_icons.scss',
      fontPath: '../.' + paths.dist + '/icons/'
    }))
    .pipe(iconfont({
      fontName: fontName, // required
      prependUnicode: false,
      fontHeight: 1001,
      normalize: true,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
    }))
    .pipe(gulp.dest( paths.dist + '/icons/' ));
};

const icons2font = gulp.series(
  cleanIcons,
  icons
)

module.exports = icons2font;