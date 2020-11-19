

gsap.to(".box", {
    scrollTrigger: {
        trigger : '.section02', // start the animation when ".box" enters the viewport (once)
        start: "50px", 
        scrub: 1,

    }, 
    x: 500
  });