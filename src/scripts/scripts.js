import './vendor/jquery.fullPage';
import './vendor/ycp';
import './vendor/youtube';
import './site';
// import YTPlayer from "yt-player";

// const player = new YTPlayer("#yt-player");

// console.log(player);

// player.load("OGU-FWLqdMg");
// player.setVolume(100);

// player.on("playing", () => {
// //   console.log(player.getDuration()); // => 351.521
// });



// import { doOnVisible } from "./libs/do-on-visible";
// import initPrevs from "./utils/prevs";
// import Splitting from "splitting";
// import { handleTouchEvents } from "./utils/utils";
// // import scroller, { gui } from "./libs/scroller";
// // import { animSignsPrevs } from "./libs/anim-sign";
// import "./vendor/beforeafter";
// // import Matrix from "./libs/matrix";
// // import { randomString } from './libs/random-string';
// import './vendor/popup-tech-spec';

// // const callBASlider = function () {
// //     $(".ba-slider").each(function () {
// //         $(this).beforeAfter(".img-lazy");
// //     });

// //     const baseOffset = 12;
// //     const isAfter = (e) => e.classList.contains("right");

// //     $(".prev__label").each(function (i, e) {
// //         $(e).on("click", function () {
// //             const parent = this.closest(".prBeforeAfter");
// //             const resize = $(parent).find(".resize");
// //             const handle = $(parent).find(".handle");

// //             const newOffset = `${isAfter(e) ? baseOffset : 100 - baseOffset}%`;

// //             resize.css("width", newOffset);
// //             handle.css("left", newOffset);
// //         });
// //     });
// // };

// (() => {
//     document.body.classList.add("initialized");

//     const titles = [
//         ...Array.from(document.querySelectorAll(".section__title")),
//     ];

//     titles.forEach((title) => {
//         title.style.opacity = 1;
//         title.dataset.title = false;
//     });

//     Splitting({
//         target: ".section__title, .left",
//         by: "words",
//     });

//     // animateTitle();

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
//             },
//             cbOut: () => {
//                 // target.dataset.visible = false;
//             },
//             rootMargin: "-150px",
//         });

//         const prevCards = document.querySelectorAll('.prev-card')

//         doOnVisible({
//             sectionSelector: prevCards,
//             cbIn: (target) => {
//                 target.dataset.rowvisible = true;
//             },
//             cbOut: () => {
//                 // target.dataset.visible = false;
//             },
//             rootMargin: "-150px",
//         });
//     });

//     const carouselSwiping = (carousel) => {
//         const carouselEntity = $(`#${carousel.id}`)
//         const onRightSwipe = () => {
//             carouselEntity.carousel("next");
//         };
    
//         const onLeftSwipe = () => {
//             carouselEntity.carousel("prev");
//         };

//         handleTouchEvents(carousel, {
//             onLeftSwipe,
//             onRightSwipe,
//             // onTopSwipe: (val) => console.log({top: val}),
//             // onDownSwipe: (val) => console.log({down: val})
//         }).init();
//     }

//     const makeSlider = (id, options = {}) => {
//         const defaultOptions = { pause: false, interval: 5000, wrap: true };
//         const currentOptions = { ...defaultOptions, ...options};
//         const slider = $(id).carousel(currentOptions);

//         $(id).carousel("pause");
//         carouselSwiping(slider[0]);

//         return slider;
//     };

//     const handleSliding = (options) => (id, index) => {
//         makeSlider(id, options);

//         const indicators = $(`${id}Indicators > div`);

//         if (indicators) {
//             const carousel = $(id);
//             carousel.on("slide.bs.carousel", (e) => {
//                 indicators.each((i, el) => {
//                     el.classList.remove("active");
//                     if (e.to === i) {
//                         el.classList.add("active");
//                     }
//                 });
//             });

//             indicators.each((i, el) => {
//                 el.addEventListener("click", () => {
//                     carousel.carousel(i);
//                 });
//             });
//         }


//         setTimeout(() => {
//             $(id).carousel("cycle");
//         }, 250 * index);
//     }

//     const carouselsPromo = ['#carouselPromo'];
//     const carouselsMosaics = ["#carouselMosaic11", "#carouselMosaic12", "#carouselMosaic21"];

//     carouselsPromo.forEach(handleSliding());
//     carouselsMosaics.forEach(handleSliding({pause: "hover"}));

//     const carouselControls = document.querySelector('.mosaic-controls');
//     const [prev, next] = carouselControls.querySelectorAll('div')

//     const slideCarousel = (direction = 'next') => () => {
//         carouselsMosaics.forEach((id, idx) => {
//             setTimeout(() => {
//                 $(id).carousel(direction);
//             }, 250 * idx);
//         });
//     }

//     prev.addEventListener('click', slideCarousel('prev'))
//     next.addEventListener('click', slideCarousel('next'))
//     // scroller().init();

//     // callBASlider();
//     // initPrevs();

//     // gui();
// })();
