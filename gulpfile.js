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
  var exec = require('child_process').exec;

  // We're hosting the api on a different domain and to avoid
  // CORS issues, use chrome with security disabled

  // http://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome
  // https://github.com/pwnall/node-open/blob/master/lib/open.js
  var cmd;
  switch (process.platform) {
    case 'darwin':
      cmd = 'open -a "Google Chrome Canary" --args --disable-web-security --url "http://localhost:3000"';
      cmd += '|| open -a "Google Chrome Canary" --args --disable-web-security --url "http://localhost:3000"'
      break;
    case 'win32':
      cmd = 'start chrome.exe "http://localhost:3000 --disable-web-security"';
      break;
  }

  browserSync.init({
    server: '.',
    port: 3000,
    open: cmd ? false : 'local'
  });

  // Listen for the `init` event to open the browser
  browserSync.emitter.on('init', function () {
    if (cmd) exec(cmd);
  });

  gulp.watch('styles/*.styl', ['compile-css']);
  gulp.watch('js/*.js', ['compile-js']);
});

gulp.task('start', ['serve']);
