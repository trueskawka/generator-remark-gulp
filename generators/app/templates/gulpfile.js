var gulp = require('gulp');
var connect = require('gulp-connect');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var scss = require('postcss-scss');
var postcssProcessors = [
  autoprefixer( { browsers: ['last 2 versions', 'ie > 10'] } )
]

var nunjucksRender = require('gulp-nunjucks-render');

// get metadata for presentation
var meta = require('./src/meta.json');

// get all slides from the slides folder
var fs = require("fs");
var slides = fs.readdirSync("./src/slides");
var data = require('gulp-data');

// generate CSS files
gulp.task('addCSS', function(callback) {
    return gulp.src('src/sass/*.scss')
        .pipe(
           postcss(postcssProcessors, { syntax: scss })
        )
        .pipe(
            sass({ outputStyle: 'compact' })
        )
        .pipe(gulp.dest('presentation/css/'));
});

// generate index.html
gulp.task('nunjucks', ['addCSS'], function() {
    return gulp.src('src/*.nunjucks')
        .pipe(data(function() {
            return {
                slides: slides,
                meta: meta
            }
        }))
        .pipe(
            nunjucksRender({
                path: ['src/', 'presentation/css/']
            })
        )
        .pipe(gulp.dest('presentation/'));
});

// set up server
gulp.task('connect', function() {
    connect.server({
        port: 8000,
        root: 'presentation',
        livereload: true
    });
});

// watch files
var filesToWatch = [
    'src/slides/*.md',
    'src/sass/*.scss',
    'src/partials/*.nunjucks',
    'src/*.nunjucks'
]

gulp.task('watch', function() {
    gulp.watch(filesToWatch, ['nunjucks']);
});

// run
gulp.task('default', ['connect', 'nunjucks', 'watch']);
