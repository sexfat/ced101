const {src , dest } = require('gulp');

function jstask(cb){
  console.log('打包js');
  cb();
}

function csstask(cb){
    console.log('打包css');
    cb();
  }

function move(){
    //src  來源
   return src('index.html').pipe(dest('app/')) // dest 目的地
}  

exports.copyHtml = move //任務輸出

exports.js = jstask
exports.css = csstask




