var gulp = require('gulp');
var webpack = require('gulp-webpack');
var babel = require('gulp-babel');
var server = require('gulp-develop-server');

var config = {
  serverSrcPath: './src/server/**/*.js',
  serverDistPath: './dist/server/index.js',
  commonSrcPath: './src/common/**/*.js',
  clientSrcPath: './src/client/**/*.js'
};

gulp.task('server-build', function() {
  return gulp.src(config.serverSrcPath)
    .pipe(babel({
      stage: 0
    }))
    .pipe(gulp.dest('./dist/server'));
});

gulp.task('common-build', function() {
  return gulp.src(config.commonSrcPath)
    .pipe(babel({
      stage: 0
    }))
    .pipe(gulp.dest('./dist/common'));
});

gulp.task('client-build', function() {
  return gulp.src(config.clientSrcPath)
    .pipe(babel({
      stage: 0
    }))
    .pipe(gulp.dest('./dist/client'));
});

gulp.task('server', ['server-build', 'common-build', 'client-build'], function() {
  server.listen({path: config.serverDistPath});
  gulp.watch([config.serverSrcPath, config.commonSrcPath, config.clientSrcPath], ['server-build', 'common-build', 'client-build', server.restart]);
});

gulp.task('build', ['server-build', 'common-build', 'client-build']);
