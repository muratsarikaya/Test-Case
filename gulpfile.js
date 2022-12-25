// Initialize modeules

const {gulp, src, dest, watch, series, parallel} = require('gulp');

// importing all gulp files
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const twig = require('gulp-twig');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const del = require('delete');
const browsersync = require("browser-sync").create();

//clean dist files
const clean = (cb) => {
    del(['dist/*'], cb)
}

// Files paths
const files = {
    nodePath: 'node_modules',
    scssPath: 'src/assets/sass/style.sass',
    jsPath: 'src/assets/js/**/*.js',
}

// Sass task
const scssTask = () => {
    return src([files.scssPath])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(concat('all.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/assets/css/'))
}

// Js task

const jsTask = () => {
    return src([
        files.jsPath,
        files.nodePath + "/swiper/swiper-bundle.min.js"
    ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('dist/assets/js')
        );
}

const htmlTask = () => {
    return src('./src/pages/*.html')
        .pipe(twig({
            base: './src/pages/'
        }))
        .pipe(dest('./dist'))
}

const copyImages = () => {
    return src('./src/assets/img/**/*')
        .pipe(dest('./dist/assets/img/'))
}

const copyFont = () => {
    return src('./src/assets/fonts/**/*')
        .pipe(dest('./dist/assets/fonts/'))
}

/** converting es6 to es5  */
// const es6Task = () => {
//     return src([
//         files.jsPath
//     ])
//         .pipe(sourcemaps.init())
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(concat('custom.js'))
//         .pipe(sourcemaps.write('.'))
//         .pipe(dest('dist/assets/js/'))
// }

const watchFiles = (done) => {
    watch(
        "./src/assets/sass/**/*.sass",
        series(scssTask, browserSyncReload)
    );
    watch("./src/assets/js/**/*.js", series(jsTask, browserSyncReload));
    //watch("./src/assets/js/**/*.js", series(es6Task, browserSyncReload));
    watch("./src/pages/*.html", series(htmlTask, browserSyncReload));
    done();
}


const browserSyncReload = (cb) => {
    browsersync.reload();
    cb();
}

// BrowserSync
const browserSync = (cb) => {
    browsersync.init({
        server: {
            baseDir: "dist"
        },
        port: 3000,
        open: {
            file: 'index.html'
        }
    });
    cb();
}

build = series(
    clean,
    parallel(scssTask),
    parallel(jsTask),
   // parallel(es6Task),
    parallel(htmlTask),
    parallel(copyImages),
    parallel(copyFont),
    parallel(watchFiles),
    browserSync
);

module.exports = {
    'default': build
}
