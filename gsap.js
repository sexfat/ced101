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




$('.btn_play').on('click', function(){
    
    var tl02 = new TimelineMax();

    tl02.to('.box08', 1, {
        x: 100
    }).to('.box08', 1, {
        y: 100
    }).to('.box08' , 1 , {
        x: 300
    }).to('.box08' , 1 , {
        scale : 2
    })
})




