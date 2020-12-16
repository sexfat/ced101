// import $ from 'jquery';
import { TweenMax } from 'gsap';
import Vue from 'vue';


new Vue({
    el : '#app',
    data : {
       message : 'hello vue' 
    }
})



// $('body').css('background-color' , '#333');
TweenMax.to('.box01' , 1 , {
    x: 100,
    y: 100,
    rotation : 180
})

console.log('動畫執行 安裝完成');