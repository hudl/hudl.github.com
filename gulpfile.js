var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('compile-css', function() {
  var stylus = require('gulp-stylus');
  return gulp.src('styles/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});


gulp.task('serve', ['compile-css'], function() {
  browserSync.init({ server: '.' });
  gulp.watch('styles/*.styl', ['compile-css']);
});

gulp.task('start', ['serve']);
