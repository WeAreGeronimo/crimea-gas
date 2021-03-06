'use strict';

const gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    minifyHTML = require('gulp-minify-html'),
    cache = require('gulp-cache'),
    del = require('del');

const path = {
    build: {
        html: 'build/',
        js: 'build/',
        css: 'build/',
        img: 'build/img',
        fonts: 'build/fonts',
        icons: 'build/',
    },
    src: {
        html: 'src/*.html',
        js: 'src/*.js',
        style: 'src/style/style.scss',
        img: 'src/img/**/*.*',
        icons: 'src/icons/**/*.*',
        fonts: 'src/style/partials/fonts/**/*.*',
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        icons: 'src/icons/**/*.*',
        fonts: 'src/style/partials/fonts/**/*.*',
    },
    clean: './build',
};

const config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 3033,
    logPrefix: "WeAreGeronimo"
};

function html () {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(minifyHTML({
            quotes: true
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
}

function js () {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
}

function style () {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass(
            {
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
}

function image () {
    return gulp.src(path.src.img)
        // .pipe(cache(imagemin([
        //     imagemin.optipng({optimizationLevel: 3}),
        //     pngquant({quality: '65-70', speed: 5})
        // ], {
        //     verbose: true
        // })))
        .pipe(gulp.dest(path.build.img));

}

function icons () {
    return gulp.src(path.src.icons)
        // .pipe(cache(imagemin([
        //     imagemin.svgo(),
        //     imagemin.optipng({optimizationLevel: 3}),
        //     pngquant({quality: '65-70', speed: 5})
        // ], {
        //     verbose: true
        // })))
        .pipe(gulp.dest(path.build.icons));
}

function fonts () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
}

function watch () {
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.style, style)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.img, image)
    gulp.watch(path.watch.icons, icons)
    gulp.watch(path.watch.fonts, fonts)
}

function webserver () {
    browserSync(config);
}

function clean() {
    return del([path.clean]);
}

const build = gulp.series(clean, gulp.parallel(html, js, style, fonts, image, icons));
const final = gulp.series(build, gulp.parallel(webserver, watch));

exports.html = html;
exports.js = js;
exports.style = style;
exports.clean = clean;
exports.build = build;
exports.fonts = fonts;
exports.image = image;
exports.icons = icons;
exports.webserver = webserver;
exports.watch = watch;

exports.default = final;
