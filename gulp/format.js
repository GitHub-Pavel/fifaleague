// Import external dependences
const {
  paths
} = require('../package.json');

// Import main dependences
const gulp = require('gulp');

// Import working dependecies
const htmlbeautify = require('gulp-html-beautify');
const htmlmin      = require('gulp-htmlmin');

// Minify html
const format = () => {
  return gulp.src( paths.dist + '/*.html' )
    .pipe(htmlbeautify())
    .pipe(gulp.dest( paths.dist+'/' ));
};

module.exports = format;