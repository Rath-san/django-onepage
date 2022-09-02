import { doOnVisible } from "./libs/do-on-visible";
// import initPrevs from "./utils/prevs";
// import Splitting from "splitting";
// import { handleTouchEvents } from "./utils/utils";
// import './vendor/menu';
// import YTPlayer from "yt-player";

// const makePlayer = (id, elementId) => {
//     const player = new YTPlayer(elementId);
//     player.load(id);
//     player.setVolume(100);
// };

// const ytTopVideos = [
//     document.getElementById('videoTrailer'),
//     document.getElementById('videoTutorial')
// ]

const lazyShow = () => {
    const imagesDocument = Array.from(document.querySelectorAll(".lazy-show"));

    imagesDocument.forEach((img) => {
        if (img.complete && img.src) {
            img.classList.add("lazy-show__active");
        }

        img.onload = () => {
            img.classList.add("lazy-show__active");
        };
    });
};

// const loadOnVisibleImages = (section) => {
//     const images = Array.from(section.querySelectorAll("picture"));

//     images.forEach((picture) => {
//         const sources = [
//             ...Array.from(picture.querySelectorAll('[data-src]')),
//             ...Array.from(picture.querySelectorAll('[data-srcset]'))
//         ]
//         sources.forEach(s => {
//             if (s.src || s.srcset) return;
//             if (s.dataset.srcset) {
//                 s.srcset = s.dataset.srcset
//             }
//             if (s.dataset.src) {
//                 s.src = s.dataset.src;
//             }
//         })
//     });
// };

// (() => {
//     document.body.classList.add("initialized");

//     const titles = [
//         ...Array.from(document.querySelectorAll(".section__title")),
//         ...Array.from(document.querySelectorAll(".section__display")),
//     ];

//     titles.forEach((title) => {
//         title.style.opacity = 1;
//     });

//     Splitting({
//         target: ".section__title, .section__display, .left",
//         by: "chars",
//     });

//     window.addEventListener("load", () => {
//         document.body.classList.add("ready");

//         const sections = [
//             ...Array.from(document.querySelectorAll("section")),
//             ...Array.from(document.querySelectorAll(".left")),
//             ...Array.from(document.querySelectorAll("footer")),
//         ];

//         sections.forEach((s) => {
//             s.dataset.visible = false;
//         });

//         doOnVisible({
//             sectionSelector: sections,
//             cbIn: (target) => {
//                 target.dataset.visible = true;
//                 loadOnVisibleImages(target);
//             },
//             cbOut: () => {
//             },
//             rootMargin: "-150px",
//         });

//         const prevCards = document.querySelectorAll(".prev-card");

//         doOnVisible({
//             sectionSelector: prevCards,
//             cbIn: (target) => {
//                 target.dataset.rowvisible = true;
//             },
//             cbOut: () => {
//             },
//             rootMargin: "-150px",
//         });

//         ytTopVideos.forEach(v => {
//             makePlayer(v.dataset.id, v);
//         });
//     });

//     const carouselSwiping = (carousel) => {
//         const carouselEntity = $(`#${carousel.id}`);
//         const onRightSwipe = () => {
//             carouselEntity.carousel("next");
//         };

//         const onLeftSwipe = () => {
//             carouselEntity.carousel("prev");
//         };

//         handleTouchEvents(carousel, {
//             onLeftSwipe,
//             onRightSwipe,
//         }).init();
//     };

//     const makeSlider = (id, options = {}) => {
//         const defaultOptions = { pause: false, interval: 5000, wrap: true };
//         const currentOptions = { ...defaultOptions, ...options };
//         const slider = $(id).carousel(currentOptions);

//         $(id).carousel("pause");
//         carouselSwiping(slider[0]);

//         return slider;
//     };

//     const initSlider = () => {
//         const id = "#carouselFlat";
//         const id2 = "#carouselFlatText";
//         makeSlider(id);
//         makeSlider(id2);

//         const indicators = $(`${id}Indicators > li`);

//         if (indicators) {
//             const carousel = $(id);
//             carousel.on("slide.bs.carousel", (e) => {
//                 indicators.each((i, el) => {
//                     el.classList.remove("active");
//                     if (e.to === i) {
//                         el.classList.add("active");
//                         $(id2).carousel(i);
//                     }
//                 });
//             });

//             indicators.each((i, el) => {
//                 el.addEventListener("click", () => {
//                     carousel.carousel(i);
//                 });
//             });
//         }
//     };

//     initSlider();
//     initPrevs();
//     lazyShow();
// })();

document.body.classList.add("body-ready");
lazyShow();

function parallaxMove(func, mainElementId, insideElementId, movement, strength) {
    var $this = $("#" + mainElementId);
    var relX = func.pageX - $this.offset().left;
    var relY = func.pageY - $this.offset().top;
  
    var x = (relX - $this.width() / 2) / $this.width() * movement;
    var y = (relY - $this.height() / 2) / $this.height() * movement;
  
    TweenMax.to(insideElementId, strength, {
      x: x,
      y: y
    });
  }
  
  
  function checkParallaxIntro() {
    var mainId = "introduction";
  
    $("#" + mainId).mousemove(function(func) {
      parallaxMove(func, mainId, ".letter-m", -60, 2);
          parallaxMove(func, mainId, ".letter-o", 80, 4);
          parallaxMove(func, mainId, ".slogan-1", -200, 2);
    });
  }
  
  function checkParallaxDemorell() {
    var mainId = "demorell";
  
    $("#" + mainId).mousemove(function(func) {
      parallaxMove(func, mainId, ".letter-t", -80, 2);
          parallaxMove(func, mainId, ".letter-i", 70, 2);
          parallaxMove(func, mainId, ".slogan-3", 100, 1,5);
    });
  }
  
  function checkParallaxArt() {
    var mainId = "art";
  
    $("#" + mainId).mousemove(function(func) {
      parallaxMove(func, mainId, ".letter-i", 80, 2);
          parallaxMove(func, mainId, ".letter-o-2", -80, 2);
          parallaxMove(func, mainId, ".slogan-2", 100, 1,5);
    });
  }
  
  function checkParallaxWork() {
    var mainId = "work";
  
    $("#" + mainId).mousemove(function(func) {
          parallaxMove(func, mainId, ".letter-o-2", -80, 2);
          parallaxMove(func, mainId, ".slogan-4", 100, 1,5);
    });
  }
  function checkParallaxCode() {
    var mainId = "code";
  
    $("#" + mainId).mousemove(function(func) {
          parallaxMove(func, mainId, ".letter-n", -100, 2);
          parallaxMove(func, mainId, ".slogan-5", 100, 1,5);
    });
  }
  
  function checkParallaxPartners() {
    var mainId = "partners";
  
    $("#" + mainId).mousemove(function(func) {
  
          parallaxMove(func, mainId, ".slogan-6", -100, 1,5);
                  parallaxMove(func, mainId, ".letter-v", 80, 2);
    });
  }
  function checkParallaxNinjas() {
    var mainId = "ninjas";
  
    $("#" + mainId).mousemove(function(func) {
          parallaxMove(func, mainId, ".letter-f", -40, 2);
          parallaxMove(func, mainId, ".slogan-7",30, 1,5);
                  parallaxMove(func, mainId, ".letter-v", 80, 2);
    });
  }
  
  function checkParallaxSupport() {
    var mainId = "support";
  
    $("#" + mainId).mousemove(function(func) {
  
    });
  }
  
  function checkParallaxFooter() {
    var mainId = "footer";
  
    $("#" + mainId).mousemove(function(func) {
          parallaxMove(func, mainId, ".letter-x", 80, 2);
    });
  }

  
  $(document).ready(function() {
      checkParallaxIntro();
      checkParallaxDemorell();
      checkParallaxArt();
      checkParallaxWork();
      checkParallaxCode();
      checkParallaxPartners();
      checkParallaxNinjas();
      checkParallaxSupport();
      checkParallaxFooter();

      const personsSection = document.querySelectorAll('.persons');
      const persons = document.querySelectorAll('.person');

      doOnVisible({
        sectionSelector: persons,
        cbIn: (target) => {
            target.dataset.visible = true;
        },
        cbOut: () => {
        },
        rootMargin: "-50px",
    });

  });
  