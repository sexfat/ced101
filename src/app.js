// import $ from 'jquery';
import { TweenMax } from 'gsap';
import './style.scss';
// import './style.css';
import Vue from 'vue';


new Vue({
    el : '#app',
    data : {
       message : '測試 vue' 
    }
})

var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})



// $('body').css('background-color' , '#444');
// gsap
TweenMax.to('.box01' , 1 , {
    x: 500,
    y: 200,
    rotation : 180,
    //backgroundColor: '#333'
});
//jquery
$('.box01').css('background-color'  , '#000');

//es6
const callsomeone =  (someone) => {
    return someone  + '你好'  
  }
  
  
document.getElementById('person').innerHTML = callsomeone('aa')

console.log('動畫執行 安裝完成');