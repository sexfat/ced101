const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');
//js 任務 
function jstask(cb) {
    console.log('打包js');
    cb();
}
//css  任務
function csstask(cb) {
    console.log('打包css');
    cb();
}


//  搬家的
function move() {
    //src  來源
    return src('index.html').pipe(dest('app/')) // dest 目的地
}


exports.copyHtml = move //任務輸出
exports.js = jstask
exports.css = csstask
exports.all = series(jstask, csstask); //串連
exports.all2 = parallel(jstask, csstask); //並行


// 合併檔案
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");

function concatCss() {
    return src('css/*.css')
        .pipe(concat('all.css'))
        .pipe(dest('app/css'));
}

// 所有任務 合併 ＋ 壓縮  + 更改檔案名稱
function concatall() {
    return src('css/*.css')
        .pipe(concat('all.css')) // 合併
        .pipe(cleanCSS()) //壓縮
        .pipe(rename(function (path) {
            // Updates the object in-place
            path.basename += "-min"; // 檔名
            path.extname = ".css"; // 副檔名
        })) // 更改名稱
        .pipe(dest('app/css'));
}

exports.concat = concatCss; //任務輸出


//壓縮css
function minify() {
    return src('app/css/*.css').pipe(cleanCSS()).pipe(dest('app/css/mini'));
}
//先合併css 在壓縮css
exports.allcss = series(concatCss, minify);

const uglify = require('gulp-uglify');

function ugjs() {
    return src('js/*.js')
        .pipe(concat('all.js')) // 合併
        .pipe(uglify())
        .pipe(rename(function (path) {
            // Updates the object in-place
            path.basename += "-min"; // 檔名
            path.extname = ".js"; // 副檔名
        })) // 更改名稱
        .pipe(dest('app/js'))
}


exports.ugjs = ugjs;
exports.allmission = parallel(concatall, ugjs) //  所有任務整合



// sass
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

function sassStyle() {
    return src('./sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS()) //壓縮
        .pipe(sourcemaps.write())
        .pipe(dest('./dist/css'));
}

exports.sass = sassStyle




// html template

const fileinclude = require('gulp-file-include')

function includehtml() {
    return src('*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist/'))
}


exports.html = includehtml;


//刪除檔案
var clean = require('gulp-clean');

function clearCss() {
    //src  檔案路徑 
    return src('dist/css', {
            read: false, //避免 gulp 去讀取檔案內容，讓刪除效能變好
            force: true, //強制刪除
            allowEmpty: true
        })
        .pipe(clean());
}


function clearHtml() {
    //src  檔案路徑 
    return src('dist/*.html', {
            read: false, //避免 gulp 去讀取檔案內容，讓刪除效能變好
            force: true, //強制刪除
            allowEmpty: true
        })
        .pipe(clean());
}


//先清除dist/css -->  再打包scss

function watchfile() {
    watch('sass/*.scss', series(clearCss, sassStyle));
    watch(['*.html', 'layout/*.html'], series(clearHtml, includehtml))
}

exports.watch = watchfile;

//圖片壓縮

const imagemin = require('gulp-imagemin');

function img() {
    return src(['./images/*.*', 'images/**/*.*'])
        .pipe(imagemin())
        .pipe(rename(function (path) {
            // Updates the object in-place
            path.basename += "-min"; // 檔名
            // path.extname = ".png"; // 副檔名
        })) // 更改名稱
        .pipe(dest('dist/images'))
}



function clearImg() {
    //src  檔案路徑 
    return src('dist/images/', {
            read: false, //避免 gulp 去讀取檔案內容，讓刪除效能變好
            force: true, //強制刪除
            allowEmpty: true
        })
        .pipe(clean());
}


//清除舊圖片檔案 -> 在壓縮img
exports.imgmin = series(clearImg, img);


//babel es6 -> es5
const babel = require('gulp-babel');

function babels() {
    return src('js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(dest('dist/js'))
}


exports.jsbabel = babels






//整合
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

function sync() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: 'index.html'
        },
        port: 3600
    });
    watch('sass/*.scss', series(clearCss, sassStyle)).on('change', reload);
    watch(['*.html', 'layout/*.html'], series(clearHtml, includehtml)).on('change', reload);
}




exports.default = sync