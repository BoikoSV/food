const { src, dest, parallel, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const fileinclude  = require('gulp-file-include');
const browserSync  = require('browser-sync').create();
const sourcemaps   = require('gulp-sourcemaps');
const ttf2woff2    = require('gulp-ttf2woff2');
const cleanCSS     = require('gulp-clean-css');
const imagemin     = require('gulp-imagemin');
const changed      = require('gulp-changed');
const uglify       = require('gulp-uglify-es').default;
const concat       = require('gulp-concat');
const scss         = require('gulp-sass')(require('sass'));
const del          = require('del');





function styles(){
    return src('./src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(scss().on('error', scss.logError))
        .pipe(cleanCSS())
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(dest('./dist/css/'))
        .pipe(browserSync.stream());
}

function scripts(){
    return src('./src/js/**/*')
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(dest('./dist/js'))
        .pipe(browserSync.stream());
}

function clear(){
    return del('./dist/**/*')
}

function watcher(){
    watch('./src/scss/**/*', styles);
    watch('./src/js/**/*', scripts);
    watch('./src/images/**/*', images);
    watch('./src/svg/**/*', svg);
    watch('./src/fonts/**/*', fonts);
    watch('./src/**/*.html', html).on('change', browserSync.reload);
}

function serve(){
    browserSync.init({
        server: './'
    })
}

function images(){
    return src('./src/images/**/*')
        .pipe(changed('./dist/images'))
        .pipe(imagemin())
        .pipe(dest('./dist/images/'))
        .pipe(browserSync.stream());
}
function svg(){
    return src('./src/svg/**/*')
        .pipe(changed('./dist/svg'))
        .pipe(imagemin())
        .pipe(dest('./dist/svg/'))
        .pipe(browserSync.stream())
}

function fonts(){
    return src('./src/fonts/**/*')
        .pipe(changed('./dist/fonts'))
        .pipe(ttf2woff2())
        .pipe(dest('./dist/fonts'))
        .pipe(browserSync.stream());
}

function html(){
    return src('./src/index.html')
        .pipe(fileinclude())
        .pipe(dest('./'))
}


exports.scripts = scripts;
exports.watcher = watcher;
exports.images  = images;
exports.styles  = styles;
exports.fonts   = fonts;
exports.clear   = clear;
exports.serve   = serve;
exports.html    = html;
exports.svg     = svg;


exports.dev   = series(clear, parallel(styles, scripts, fonts, images, svg, html, serve, watcher));
exports.build = parallel(clear, styles, scripts, fonts, images, svg, html);