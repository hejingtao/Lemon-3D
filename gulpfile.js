// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
    gutil = require( 'gulp-util' )
    plumber = require( 'gulp-plumber' );
    webserver = require( 'gulp-webserver' ); 
    ngHtml2Js = require("gulp-ng-html2js");
    minifyHtml = require("gulp-minify-html");
function errrHandler( e ){
    // 控制台发声,错误时beep一下
    gutil.beep();
    gutil.log( e );
};

// Styles
gulp.task('styles', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe( plumber() )
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', '> 5%', 'Firefox ESR','Firefox >= 20','ie >= 8']
      }))
    .pipe(gulp.dest('dist/app/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});
// Scripts
gulp.task('angular', function() {
  return gulp.src('src/app/**/*.js')
    .pipe( plumber() )
    .pipe(concat('app.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('dist/app'))
    .pipe(notify({ message: 'angular task complete' }));
});
// js
gulp.task('js', function() {
  return gulp.src('src/js/**/*')
    .pipe( plumber() )
    .pipe(gulp.dest('dist/app/assets/js'))
    .pipe(notify({ message: 'js task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe( plumber() )
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/app/assets/images'))
    .pipe(notify({ message: 'Images task complete' }));
});
// app
gulp.task('app', function() {
  return gulp.src(['src/app/**/*','!src/app/**/*.js', '!src/app/**/template','!src/app/**/template/*.html'])
    .pipe( plumber() )
    .pipe(gulp.dest('dist/app'))
    .pipe(notify({ message: 'app task complete' }));
});
// lib
gulp.task('libs', function() {
  return gulp.src('src/libs/**/**/**')
    .pipe( plumber() )
    .pipe(gulp.dest('dist/app/assets/libs'))
    .pipe(notify({ message: 'libs task complete' }));
});
// template
gulp.task('partials', function() {
  return gulp.src("src/app/**/template/*.html")
              // .pipe(minifyHtml({
              //   empty: true,
              //   spare: true,
              //   quotes: true
              // }))
              .pipe(ngHtml2Js({
                moduleName: "Eiffel.partials",
                stripPrefix: "/template"
              }))
              .pipe(concat("partials.min.js"))
              // .pipe(uglify())
              .pipe(gulp.dest("dist/app"));
});


gulp.task('server', function() {
  gulp.src('dist/app')
    .pipe(webserver({
       host: '0.0.0.0',
      livereload: true,
      open: true,
      port: 8001
    }));
  gulp.start('watch');
});

// Clean
// gulp.task('clean', function(cb) {
//     del(['dist/assets/css/*/',  'dist/assets/images'], cb)
// });
// Default task
gulp.task('default', function() {
    gulp.run('styles', 'server', 'angular', 'images', 'app', 'js', 'libs','partials');
});



// Watch
gulp.task('watch', function() { 
  // Watch .scss files
  gulp.watch('src/sass/**/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('src/app/**/*.js', ['angular']);
  // Watch app files
  gulp.watch(['src/app/**/*','!src/app/**/*.js'], ['app']);
  // Watch libs files
  gulp.watch('src/libs/**/*', ['libs']);
  // Watch js files
  gulp.watch('src/js/**/*', ['js']);
  // Watch image files
  gulp.watch('src/images/**/*', ['images']);
// Watch template files
  gulp.watch('src/app/**/template/*.html', ['partials']);

  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);


});