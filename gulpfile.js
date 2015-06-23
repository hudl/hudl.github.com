var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('compile-css', function() {
  var stylus = require('gulp-stylus');
  var concat = require('gulp-concat');
  return gulp.src('styles/directory.styl')
    .pipe(stylus())
    .pipe(concat('directory.css'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('compile-js', function() {
  var concat = require('gulp-concat');
  // FYI, we currently have no need to dependency
  // management but that might live here at some point
  return gulp.src('js/*.js')
    .pipe(concat('directory.js'))
    .pipe(gulp.dest('scripts'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['compile-css', 'compile-js'], function() {
  browserSync.init({ server: '.', port: 3000 });
  gulp.watch('styles/*.styl', ['compile-css']);
  gulp.watch('js/*.js', ['compile-js']);
});

gulp.task('start', ['serve']);
