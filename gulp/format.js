// Import external dependences
const {
  paths
} = require('../package.json');

// Import main dependences
const gulp = require('gulp');

// Import working dependecies
const htmlbeautify = require('gulp-html-beautify');
const htmlmin      = require('gulp-htmlmin');

// Minify and cache images
const format = () => {
  return gulp.src( paths.dist + '/*.html' )
    .pipe(htmlmin({ 
      collapseWhitespace: true 
    }))
    .pipe(htmlbeautify({
      "indent_size": 2,
      "brace_style": "expand",
      "break_chained_methods": true,
      "unescape_strings": true,
      "end_with_newline": true
    }))
    .pipe(gulp.dest( paths.dist+'/' ));
};

module.exports = format;