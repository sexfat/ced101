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

function concatCss() {
    return src('css/*.css').pipe(concat('all.css')).pipe(dest('app/css'));
}

// 所有任務
function concatall() {
    return src('css/*.css').pipe(concat('all.css')).pipe(cleanCSS()).pipe(dest('app/css'));
}
exports.concat = concatCss; //任務輸出

exports.allmission = concatall

//壓縮css


function minify() {
    return src('app/css/*.css').pipe(cleanCSS()).pipe(dest('app/css/mini'));
}
//先合併css 在壓縮css
exports.allcss = series(concatCss, minify);