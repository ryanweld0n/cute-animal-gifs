var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ts = require('gulp-typescript'),
    watch = require('gulp-watch');

var watchFiles = [
    './public/app/*.ts',
    './public/app/**/*.ts',
    './public/style/css/*.scss',
    './public/style/css/modules/*.scss'
];

var sassFilesToCompress = [
    './public/style/css/*.scss',
    './public/style/css/modules/*.scss'
];

var jsFiles = [
    './public/app/**/**/*.ts',
    './public/app/*.ts'
];

//watch subtasks
gulp.task('css', function () {
    gulp.src(sassFilesToCompress)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('ts', function(){
  gulp.src(jsFiles)
  .pipe(ts({
  	target: 'ES5',
  	out: 'app.js'
  }))
  //.pipe(uglify())
  .pipe(gulp.dest('./public/dist'));
});

gulp.task('watch', function () {
    gulp.watch(watchFiles, ['css', 'ts'])
});
