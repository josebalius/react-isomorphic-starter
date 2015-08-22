var gulp = require('gulp');
var webpack = require('gulp-webpack');
var babel = require('gulp-babel');
var server = require('gulp-develop-server');
var wiredep = require('wiredep');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

var config = {
  srcPath: './src/**/*.js',
  serverDistPath: './dist/server/index.js',
  clientLibDistPath: './dist/client/public',
  clientSassPath: './src/client/sass/**/*.scss'
};

gulp.task('sass-build', ['server-build'], function() {
  return gulp.src(config.clientSassPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest(config.clientLibDistPath));
});

gulp.task('bower-generate', ['server-build'], function() {
  var dep = wiredep();

  return gulp.src(dep.js)
    .pipe(concat('bundle-lib.js'))
    .pipe(gulp.dest(config.clientLibDistPath));
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

gulp.task('server', ['server-build', 'bower-generate', 'bower-generate-css', 'sass-build'], function() {
  server.listen({path: config.serverDistPath});
  gulp.watch([config.srcPath, config.clientSassPath], ['server-build', 'sass-build', server.restart]);
});

gulp.task('build', ['server-build', 'bower-generate', 'bower-generate-css', 'sass-build']);
