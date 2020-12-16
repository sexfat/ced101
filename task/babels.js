const {
    src,
    dest
} = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");

module.exports  = function babelaa() {
    return src('js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.basename += "-es5"; // 檔名
    })) // 更改名稱
    .pipe(dest('dist/js'))
}