import { doOnVisible } from "./libs/do-on-visible";
import initPrevs from "./utils/prevs";
import Splitting from "splitting";
import { handleTouchEvents } from "./utils/utils";
import "./vendor/menu";
import YTPlayer from "yt-player";

window.$ = jQuery;
// window.gsap

const makePlayer = (id, elementId) => {
    const player = new YTPlayer(elementId);
    player.load(id);
    player.setVolume(100);
};

const ytTopVideos = [
    document.getElementById("videoTrailer"),
    document.getElementById("videoTutorial"),
];

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

const loadOnVisibleImages = (section) => {
    const images = Array.from(section.querySelectorAll("picture"));

    images.forEach((picture) => {
        const sources = [
            ...Array.from(picture.querySelectorAll("[data-src]")),
            ...Array.from(picture.querySelectorAll("[data-srcset]")),
        ];
        sources.forEach((s) => {
            if (s.src || s.srcset) return;
            if (s.dataset.srcset) {
                s.srcset = s.dataset.srcset;
            }
            if (s.dataset.src) {
                s.src = s.dataset.src;
            }
        });
    });
};

(() => {
    document.body.classList.add("initialized");

    const titles = [
        ...Array.from(document.querySelectorAll(".section__title")),
        ...Array.from(document.querySelectorAll(".section__display")),
    ];

    titles.forEach((title) => {
        title.style.opacity = 1;
    });

    Splitting({
        target: ".section__title, .section__display, .left",
        by: "chars",
    });

    // const morpher = initMorpher("section.morph .slide", {
    //     maxTop: 0.7,
    //     minBottom: 0.5,
    // });
    const slider = initMagicSlider3({ maxTop: 0.6, minBottom: 0 });

    // onVisible(
    // document.querySelector(".magicSlider"),
    //     () => {
    // morpher.pause();
    slider.play();
        // },
        // () => {
            // slider.pause();
            // morpher.play();
        // },
        // { maxTop: 0.7, minBottom: 0 };
    // );
    // morpher.play();

    window.addEventListener("load", () => {
        document.body.classList.add("ready");

        const sections = [
            ...Array.from(document.querySelectorAll("section")),
            ...Array.from(document.querySelectorAll(".left")),
            ...Array.from(document.querySelectorAll("footer")),
        ];

        sections.forEach((s) => {
            s.dataset.visible = false;
        });

        doOnVisible({
            sectionSelector: sections,
            cbIn: (target) => {
                target.dataset.visible = true;
                loadOnVisibleImages(target);
            },
            cbOut: () => {},
            rootMargin: "-150px",
        });

        const prevCards = document.querySelectorAll(".prev-card");

        doOnVisible({
            sectionSelector: prevCards,
            cbIn: (target) => {
                target.dataset.rowvisible = true;
            },
            cbOut: () => {},
            rootMargin: "-150px",
        });

        ytTopVideos.forEach((v) => {
            makePlayer(v.dataset.id, v);
        });
    });

    // const carouselSwiping = (carousel) => {
    //     const carouselEntity = $(`#${carousel.id}`);
    //     const onRightSwipe = () => {
    //         carouselEntity.carousel("next");
    //     };

    //     const onLeftSwipe = () => {
    //         carouselEntity.carousel("prev");
    //     };

    //     handleTouchEvents(carousel, {
    //         onLeftSwipe,
    //         onRightSwipe,
    //     }).init();
    // };

    // const makeSlider = (id, options = {}) => {
    //     const defaultOptions = { pause: false, interval: 5000, wrap: true };
    //     const currentOptions = { ...defaultOptions, ...options };
    //     const slider = $(id).carousel(currentOptions);

    //     $(id).carousel("pause");
    //     carouselSwiping(slider[0]);

    //     return slider;
    // };

    // const initSlider = () => {
    //     const id = "#carouselFlat";
    //     const id2 = "#carouselFlatText";
    //     makeSlider(id);
    //     makeSlider(id2);

    //     const indicators = $(`${id}Indicators > li`);

    //     if (indicators) {
    //         const carousel = $(id);
    //         carousel.on("slide.bs.carousel", (e) => {
    //             indicators.each((i, el) => {
    //                 el.classList.remove("active");
    //                 if (e.to === i) {
    //                     el.classList.add("active");
    //                     $(id2).carousel(i);
    //                 }
    //             });
    //         });

    //         indicators.each((i, el) => {
    //             el.addEventListener("click", () => {
    //                 carousel.carousel(i);
    //             });
    //         });
    //     }
    // };

    // initSlider();
    initPrevs();
    lazyShow();
})();

function initMagicSlider3(opts) {
    const slider = document.querySelector(".magicSlider");
    const slides = Array.from(document.querySelectorAll(".magicSlider .slide"));
    const slideCount = slides.length;
    let slidesPerScreen;
    function refreshSlidesPerScreen() {
        const slideSize = slides[0].getBoundingClientRect().width;
        slidesPerScreen = Math.floor(window.innerWidth / slideSize);
        slidesPerScreen = slidesPerScreen - ((slidesPerScreen + 1) % 2);
    }
    refreshSlidesPerScreen();
    window.addEventListener("resize", refreshSlidesPerScreen);

    const range = slideCount * 100;
    const max = range / 2;
    const min = -max;

    const floatDuration = 0.6 * 10;
    const floatPerSecond = 6;
    const slideDuration = 1; // change in CSS too!
    const minDelay = 0.5;
    const maxDelay = 3.3;
    const minBalance = 0.34;

    const animation = {
        x: 0,
        float: 0,
        direction: 1,
        lastSlideDirection: 0,
        scrollDelay: 1,
        autoPlay: false,
        timeline: gsap.timeline(),
        slideCall: gsap.timeline(),
        activeSlide: 0,
    };
    slides[animation.activeSlide].classList.add("active");

    gsap.set(slides, {
        xPercent: (i) => (i - 0.5 + animation.activeSlide) * 100,
    });
    gsap.to(slides, {
        repeat: -1,
        duration: 1,
        ease: "none",
        xPercent: "+=0",
        modifiers: {
            xPercent: (x) => {
                x = x + animation.x + animation.float;
                return gsap.utils.wrap(min, max, x);
            },
        },
    });

    let mouse = { x: 0 };
    function moveAction(event) {
        if (event.targetTouches && event.targetTouches[0]) {
            // event.preventDefault();
            mouse.x = event.targetTouches[0].clientX;
        } else {
            mouse.x = event.clientX;
        }
        updateAcceleration();
        updateActiveSlide(getHoverOffset());
    }
    slider.addEventListener("mousemove", moveAction);
    slider.addEventListener("mousedown", () => updateAcceleration(true));

    function getHoverOffset() {
        return animation.autoPlay ? -animation.direction : 0;
    }

    function updateAcceleration(clicked = false) {
        let balance = (2 * mouse.x) / window.innerWidth - 1;
        balance = Math.min(Math.max(-1, balance * 1.2), 1);
        const absBalance = Math.abs(balance);
        animation.direction = balance < 0 ? 1 : -1;
        const autoPlay = absBalance > minBalance;
        animation.scrollDelay = maxDelay - (maxDelay - minDelay) * absBalance;
        if (
            clicked ||
            (autoPlay && animation.direction !== animation.lastSlideDirection)
        ) {
            if (animation.direction !== animation.lastSlideDirection) {
                animation.lastSlideDirection = animation.direction;
                floatSlider();
            }
            animation.autoPlay = autoPlay;
            animation.slideCall.kill();
            animation.timeline.kill();
            animation.timeline = gsap.timeline();
            switchSlide(clicked);
        }
        animation.autoPlay = autoPlay;
    }

    function switchSlide(clicked = false) {
        let currentX = animation.x + animation.float;
        let x = animation.x;
        if (animation.autoPlay) {
            let targetX = currentX + animation.direction * 149;
            targetX = gsap.utils.snap(100, targetX);
            // console.log("swit" + animation.direction + " " + targetX);
            x = targetX - animation.float;
            x -=
                animation.direction *
                floatPerSecond *
                (slideDuration + floatDuration);
        }
        animation.timeline.to(animation, {
            x,
            duration: slideDuration,
            ease: "power2.out",
            onComplete() {
                animation.slideCall = gsap.delayedCall(
                    animation.scrollDelay,
                    switchSlide
                );
            },
        });
    }
    function floatSlider() {
        if (animation.floatTimeline) animation.floatTimeline.kill();
        animation.floatTimeline = gsap.to(animation, {
            float:
                animation.float +
                animation.direction * floatPerSecond * floatDuration,
            duration: floatDuration,
            ease: "none",
            onStart() {
                if (!animation.autoPlay) {
                    updateActiveSlide();
                }
            },
            onComplete() {
                floatSlider();
            },
        });
    }

    function mod(x, r) {
        return ((x % r) + r) % r;
    }

    function getCenterSlideIndex(offset = 0) {
        let currentX = animation.x + animation.float;
        const i = mod(
            Math.round(mod(-currentX, range) / 100) + offset,
            slideCount
        );
        return i;
    }

    function updateActiveSlide(offset) {
        const i = getCenterSlideIndex(offset);
        if (animation.activeSlide !== i) {
            slides[animation.activeSlide].classList.remove("active");
            animation.activeSlide = i;
            slides[animation.activeSlide].classList.add("active");
        }
    }

    function playFloat() {
        floatSlider();
    }
    function pauseFloat() {
        animation.floatTimeline.kill();
        animation.timeline.pause();
        animation.lastSlideDirection = 0;
    }
    return {
        play: playFloat,
        pause: pauseFloat,
    };
}

// function initMorpher(target = "section.morph .slide", opts) {
//     let activeSlide = 1;
//     let slideDelay = 3500;
//     let slideDuration = 1000;
//     let autoPlay = false;
//     let timeout;

//     let isDesktop = window.innerWidth > 600;

//     const slides = $(target);
//     const root = $("section.morph");

//     let morpher;

//     let path =
//         "https://s3.motionvfx.com/mvfxpublic/products/templates/1329/media/mLogoCinematic_";
//     let json = {
//         images: [
//             {
//                 points: [
//                     { x: 254, y: 244 },
//                     { x: 850, y: 244 },
//                     { x: 1154, y: 1093 },
//                     { x: 607, y: 1095 },
//                     { x: 0, y: 0 },
//                     { x: 1400, y: 0 },
//                     { x: 1400, y: 1400 },
//                     { x: 0, y: 1400 },
//                     { x: 643, y: 124 },
//                     { x: 862, y: 1223 },
//                     { x: 1221, y: 633 },
//                     { x: 192, y: 719 },
//                 ],
//                 src: "logo_1.jpg",
//                 x: 0,
//                 y: 0,
//             },
//             {
//                 points: [
//                     { x: 444, y: 234 },
//                     { x: 970, y: 234 },
//                     { x: 968, y: 1045 },
//                     { x: 422, y: 1046 },
//                     { x: 0, y: 0 },
//                     { x: 1400, y: 0 },
//                     { x: 1400, y: 1400 },
//                     { x: 0, y: 1400 },
//                     { x: 715, y: 112 },
//                     { x: 689, y: 1156 },
//                     { x: 1173, y: 650 },
//                     { x: 232, y: 660 },
//                 ],
//                 src: "logo_2.jpg",
//                 x: 0,
//                 y: 0,
//             },
//             {
//                 points: [
//                     { x: 314, y: 243 },
//                     { x: 1084, y: 245 },
//                     { x: 1085, y: 1087 },
//                     { x: 314, y: 1090 },
//                     { x: 0, y: 0 },
//                     { x: 1400, y: 0 },
//                     { x: 1400, y: 1400 },
//                     { x: 0, y: 1400 },
//                     { x: 690, y: 107 },
//                     { x: 698, y: 1226 },
//                     { x: 1259, y: 657 },
//                     { x: 160, y: 716 },
//                 ],
//                 src: "logo_3.jpg",
//                 x: 0,
//                 y: 0,
//             },
//         ],
//         triangles: [
//             [0, 1, 3],
//             [3, 2, 1],
//             [5, 4, 8],
//             [0, 4, 8],
//             [5, 1, 8],
//             [0, 1, 8],
//             [2, 3, 9],
//             [7, 3, 9],
//             [2, 6, 9],
//             [7, 6, 9],
//             [6, 5, 10],
//             [1, 5, 10],
//             [6, 2, 10],
//             [1, 2, 10],
//             [7, 4, 11],
//             [0, 4, 11],
//             [7, 3, 11],
//             [0, 3, 11],
//         ],
//     };

//     let slideCount = json.images.length;

//     const slider = $(root).find(".slider").get(0);

//     slider.addEventListener("click", () => {
//         clearTimeout(timeout);
//         switchSlide();
//     });

//     function play(delay = slideDelay) {
//         if (!autoPlay) {
//             autoPlay = true;
//             timeout = setTimeout(switchSlide, delay);
//         }
//     }
//     function playFirst() {
//         play(1500);
//     }
//     function pause() {
//         autoPlay = false;
//         clearTimeout(timeout);
//     }

//     function easeInOutCubic(x) {
//         return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
//     }
//     function switchSlide() {
//         if (activeSlide >= 0) {
//             slides[activeSlide].classList.remove("active");
//         }
//         activeSlide = (activeSlide + 1) % slideCount;
//         slides[activeSlide].classList.add("active");

//         const factors = json.images.map((img, i) =>
//             i === activeSlide ? 1 : 0
//         );
//         if (isDesktop) {
//             morpher.animate(factors, slideDuration, easeInOutCubic);
//         }
//         if (autoPlay) {
//             timeout = setTimeout(switchSlide, slideDelay);
//         }
//     }
//     function init() {
//         slides[activeSlide].classList.add("active");
//         const factors = json.images.map((img, i) =>
//             i === activeSlide ? 1 : 0
//         );
//         if (isDesktop) {
//             morpher.set(factors);
//         }
//     }

//     if (isDesktop) {
//         const w = 1400;
//         const w2 = 700;
//         const scale = w2 / w;

//         json.images.forEach((i) => {
//             i.src = path + i.src;
//             i.points = i.points.map((p) => ({
//                 x: p.x * scale,
//                 y: p.y * scale,
//             }));
//         });
//         morpher = new Morpher(json);
//         const canvas = $(root).find("canvas").get(0);
//         morpher.setCanvas(canvas);

//         function isPlaying() {
//             return morpher.t0 != null;
//         }
//     }
//     onImageReady(slides[0].querySelector("img").src, () =>
//         setTimeout(() => {
//             init();
//             slider.classList.add("ready");
//         })
//     );

//     return { play, pause };
//     // onVisible(slider, playFirst, pause, opts);
// }
