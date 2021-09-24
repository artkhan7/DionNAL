var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var bower = require('bower');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var naturalSort = require('gulp-natural-sort');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglify = require('gulp-uglifyjs');
var inject = require('gulp-inject');
var replace = require('gulp-replace');
var jshint = require('gulp-jshint');
var spritesmith = require('gulp.spritesmith');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var Q = require('q');
var _ = require('lodash');

var libs = require('./libs.js');

var paths = {
  sass: ['./app/**/*.scss', '!./app/bower_components/**/*.scss'],
  app: './app',
  build: './build'
};

var spriteImgFiles = paths.app + '/assets/img/sprite/**/*';
var appJS = [
  paths.app + '/**/*.js',
  '!' + paths.app + '/**/*_test.js',
  '!' + paths.app + '/bower_components/**/*.js',
  '!./app/config.tpl.js'
];

var libsJS = _.map(libs.all, function (item) {
  return paths.app + '/' + item;
});

var devLibsJS = _.map(libs.dev, function (item) {
  return paths.app + '/' + item;
});

//--- Serve

gulp.task('default', ['serve']);

gulp.task('serve', gulpsync.sync(['create-config:dev', 'build', 'index:dev', 'webserver', 'watch']));

gulp.task('webserver', function () {
  return connect.server({
    port: 8000,
    root: [paths.app],
    fallback: paths.app + '/index.html'
  });
});

gulp.task('watch', ['jsHint'], function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(spriteImgFiles, ['sprite']);
  gulp.watch(appJS, ['jsHint']);
  gulp.watch(appJS.concat(libsJS), ['index:dev']);
});

//--- Build

//Build app and make everything ready for copy
gulp.task('build', gulpsync.sync(['sprite', 'sass']));

gulp.task('build:debug', gulpsync.sync(['clean', 'create-config:dev', 'build', 'index:dev']), function () {
  gulp.src(paths.app + '/**/*')
    .pipe(gulp.dest(paths.build));
});

gulp.task('build:qa', gulpsync.sync(['clean', 'create-config:qa', 'build', 'index:dev']), function () {
  gulp.src(paths.app + '/**/*')
    .pipe(gulp.dest(paths.build));
});

gulp.task('build:release', gulpsync.sync(['clean', 'create-config:prod', 'build', 'index:prod']), function (done) {
  var uglifyAppJS = Q.defer();
  gulp.src(appJS, {base: paths.app})
    .pipe(uglify('config.js', {mangle: true}))
    .pipe(uglify('app.js', {mangle: true}))
    .pipe(gulp.dest(paths.build))
    .on('end', function () {
      uglifyAppJS.resolve();
    });

  var uglifyVendorJS = Q.defer();
  gulp.src(libsJS, {base: paths.app})
    .pipe(uglify('vendor.js', {mangle: false}))
    .pipe(gulp.dest(paths.build))
    .on('end', function () {
      uglifyVendorJS.resolve();
    });

  var cpCss = gulp.src(paths.app + '/assets/css/app.css', {base: paths.app})
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest(paths.build));

  var cpImg = gulp.src(paths.app + '/assets/img/**/*', {base: paths.app})
    .pipe(gulp.dest(paths.build));

  var cpFont = gulp.src(paths.app + '/assets/fonts/**/*', {base: paths.app})
    .pipe(gulp.dest(paths.build));

  var cpHTML = gulp.src([paths.app + '/**/*.html', '!' + paths.app + '/bower_components/**/*.html'], {base: paths.app})
    .pipe(gulp.dest(paths.build));

  var cpTranslation = gulp.src([paths.app + '/assets/translation/*.json'], {base: paths.app})
    .pipe(gulp.dest(paths.build));

  var cpFavicon = gulp.src([paths.app + '/favicon.ico'], {base: paths.app})
    .pipe(gulp.dest(paths.build));

  Q.all([uglifyAppJS.promise, uglifyVendorJS.promise, cpCss, cpImg, cpFont, cpHTML, cpTranslation, cpFavicon]).then(function () {
    gulp.src(paths.build + '/index.html')
      .pipe(inject(gulp.src([paths.build + '/assets/css/app.css', paths.build + '/vendor.js', paths.build + '/app.js']), {
        relative: true,
        addSuffix: '?' + new Date().getTime()
      }))
      .pipe(inject(gulp.src(''), {
        empty: true,
        name: 'inject-lib'
      }))
      .pipe(gulp.dest(paths.build))
      .on('end', function () {
        gulp.src(paths.build + '/**/*.html')
          .pipe(minifyHTML({
            empty: true,
            loose: true
          }))
          .pipe(gulp.dest(paths.build))
          .on('end', done);
      });
  });
});

//--- Custom

gulp.task('clean', function () {
  return gulp.src(paths.build + '/*', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('sass', function () {
  return gulp.src('./app/assets/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/assets/css'));
});

gulp.task('index:dev', function () {
  return index(libsJS.concat(devLibsJS));
});

gulp.task('index:prod', function () {
  return index(libsJS);
});

gulp.task('sprite', function () {
  var spriteData = gulp.src(spriteImgFiles, {base: paths.app}).pipe(spritesmith({
    imgName: 'assets/img/generated/sprite.png',
    cssName: 'assets/scss/_sprite.scss',
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name;
    }
  }));
  return spriteData.pipe(gulp.dest(paths.app));
});

gulp.task('jsHint', function () {
  return gulp.src(appJS)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// create dummy config file to inject it's name in index.html
gulp.task('create-config:dev', function () {
  updateBuildEnv('dev');
});

gulp.task('create-config:qa', function () {
  updateBuildEnv('qa');
});

gulp.task('create-config:prod', function () {
  updateBuildEnv('prod');
});

function updateBuildEnv(env) {
  gulp.src('app/config.tpl.js')
    .pipe(replace('__XX__', env))
    .pipe(rename('app/config.js'))
    .pipe(gulp.dest('./'));
}

function index(libJSFiles) {
  return gulp.src(paths.app + '/index.html', {base: paths.app})
    .pipe(inject(gulp.src(appJS.concat([paths.app + '/assets/css/app.css'])), {
      relative: true,
      addSuffix: '?' + new Date().getTime()
    }))
    .pipe(inject(gulp.src(libJSFiles), {
      name: 'inject-lib',
      relative: true
    }))
    .pipe(naturalSort())
    .pipe(gulp.dest(paths.app));
}
