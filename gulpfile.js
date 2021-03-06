var gulp = require('gulp');
var babel = require('gulp-babel');
var server = require('gulp-develop-server');
var wiredep = require('wiredep');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');

var config = {
  srcPath: './src/**/*.js',
  serverDistPath: './dist/server/index.js',
  clientLibDistPath: './dist/client/public',
  clientSassPath: './src/client/sass/**/*.scss'
};

gulp.task('sass-build', ['server-build'], function sassBuild() {
  return gulp.src(config.clientSassPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest(config.clientLibDistPath));
});

gulp.task('bower-generate', ['server-build'], function bowerGenerate() {
  var dep = wiredep();

  return gulp.src(dep.js)
    .pipe(concat('bundle-lib.js'))
    .pipe(gulp.dest(config.clientLibDistPath));
});

gulp.task('bower-generate-css', ['server-build'], function bowerGenerateCss() {
  var dep = wiredep();

  return gulp.src(dep.css)
    .pipe(concat('bundle-lib.css'))
    .pipe(gulp.dest(config.clientLibDistPath))

});

gulp.task('lint', function lint() {
  return gulp.src(config.srcPath)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
});

gulp.task('server-build', ['lint'], function serverBuild() {
  return gulp.src(config.srcPath)
    .pipe(babel({
      stage: 0
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('server', ['lint', 'server-build', 'bower-generate', 'bower-generate-css', 'sass-build'], function serverBuild() {
  server.listen({path: config.serverDistPath});
  gulp.watch([config.srcPath, config.clientSassPath], ['lint', 'server-build', 'sass-build', server.restart]);
});

gulp.task('build', ['server-build', 'bower-generate', 'bower-generate-css', 'sass-build']);
