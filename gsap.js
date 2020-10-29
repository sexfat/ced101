var controller = new ScrollMagic.Controller();


TweenMax.to('.box01', 2, {
    //y: 200,
    //x: 100,
    // ease: Power2.easeOut
    // ease : Elastic.easeOut
    //ease: Bounce.easeOut,
    rotation: 360, //旋轉
    transformOrigin: 'center center', //定位點
    // scale: 2, //放大
    //repeat : -1, //無限循環
    //repeatDelay : 2,
    // yoyo: true
    className: "+=tag"
    // width : '80%',
});

//
TweenMax.from('.box02', 2, {
    x: 400,
    repeat: 7,
    yoyo: true

});

//
TweenMax.to('.box03', 1, {
    rotation: 360,
    repeat: -1,
    ease: Power0.easeNone,
    //boxShadow:"0px 0px 20px 20px" 

});

//
TweenMax.staggerFromTo('.box04', 1, {
    x: 0,
    opacity: 0
}, {
    x: 200,
    opacity: 1
}, 0.6);



//TimelineMax

var tl01 = new TimelineMax({
    repeat: 2
});

// TweenMax.to('.box05' ,1, {
//     x: 100
// });

// TweenMax.to('.box06' ,1, {
//     y: 100
// });
// TweenMax.to('.box07' ,1, {
//     y: 100,
//     x: 100
// });
// tl01.to('.box05' ,1, {
//     x: 100,
//     rotation: 360
// }).to('.box06' ,1, {
//     y: 100,
//     scale: 2
// }).to('.box07' ,1, {
//     y: 100,
//     x: 100
// });




$('.btn_play').on('click', function () {

    var tl02 = new TimelineMax();

    tl02.to('.box08', 1, {
        x: 100
    }).to('.box08', 1, {
        y: 100
    }).to('.box08', 1, {
        x: 300
    }).to('.box08', 1, {
        scale: 2
    })
})

var tl3 = new TimelineMax({
    //onComplete: alertA, //callback function
    //repeat: 1
})


function alertA() {
    alert('完成')
}


tl3.fromTo('.b1', 1, {
    x: 0,
    opacity: 0
},{
     x: 100,
     opacity: 1
}).to('.b1', 1, {
    y: 200
}).to('.b1' , 1 , {
   x: 1500,
   rotation: 360,
   scale: 1.5 
}).to('.b1' , 1, {
    opacity: 0
})


var mv01 = new ScrollMagic.Scene({
    triggerElement: '#key01',
    offset : 0,// 改綠指標(單位px)
    triggerHook: 0.5, // 改藍色指標  0~1
    duration : '50%' //單位是px or %  動畫執行的範圍


}).setTween(tl3).addIndicators().on('leave' ,function(){
   console.log('執行function');   
}).addTo(controller);

//第二個場景

var tweenmax_c1 =  TweenMax.to('.c1' , 1 , {
    y: 200,
    x: 100
})


var mv02 = new ScrollMagic.Scene({
    triggerElement: '#key02',
    //offset : 0,// 改綠指標(單位px)
    triggerHook: 0.3, // 改藍色指標  0~1
    //duration : '50%' //單位是px or %  動畫執行的範圍
    reverse : true // 動畫執行返回

}).setClassToggle('.section03' , 'on').setTween(tweenmax_c1).addIndicators().on('enter' ,function(){
   console.log('執行function02');
}).addTo(controller);