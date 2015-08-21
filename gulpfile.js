var gulp = require('gulp');
var webpack = require('gulp-webpack');
var babel = require('gulp-babel');
var server = require('gulp-develop-server');
var wiredep = require('wiredep');
var gutil = require('gulp-util');
var concat = require('gulp-concat');

var config = {
  srcPath: './src/**/*.js',
  serverDistPath: './dist/server/index.js',
  clientLibDistPath: './dist/client/public'
};

gulp.task('bower-generate', ['server-build'], function() {
  var dep = wiredep();

  return gulp.src(dep.js)
    .pipe(concat('bundle-lib.js'))
    .pipe(gulp.dest(config.clientLibDistPath))

});

gulp.task('bower-generate-css', ['server-build'], function() {
  var dep = wiredep();

  return gulp.src(dep.css)
    .pipe(concat('bundle-lib.css'))
    .pipe(gulp.dest(config.clientLibDistPath))

});

gulp.task('server-build', function() {
  return gulp.src(config.srcPath)
    .pipe(babel({
      stage: 0
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('server', ['server-build', 'bower-generate', 'bower-generate-css'], function() {
  server.listen({path: config.serverDistPath});
  gulp.watch([config.srcPath], ['server-build', server.restart]);
});

gulp.task('build', ['server-build', 'bower-generate', 'bower-generate-css']);

function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true })

  src._read = function () {
    this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
    this.push(null)
  }

  return src
}
