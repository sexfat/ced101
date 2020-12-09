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
        .pipe(dest('./app/css'));
}

exports.sass = sassStyle

function watchfile() {
    watch('sass/*.scss', sassStyle);
    watch('js/*.js', ugjs);
}


exports.watch = watchfile;