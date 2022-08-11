import { doOnVisible } from "./libs/do-on-visible";
import Splitting from "splitting";
// import { handleTouchEvents } from "./utils/utils";
import "./vendor/menu";
import YTPlayer from "yt-player";
import "./libs/arrow-slider";
import initPrevs from "./libs/prevs";

import Swiper, { EffectFade, Navigation, Autoplay, Pagination } from "swiper";

const makePlayer = (id, elementId) => {
    const player = new YTPlayer(elementId);
    player.load(id);
    player.setVolume(100);
};

const ytTopVideos = Array.from(document.querySelectorAll(".video-iframe"));

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

const bigMSlider = () => {
    const swiperElement = ".mSwiper";
    const mSwiperElement = ".mSwiperM";
    const transitionSwiperElement = ".transition-swiper";
    const stepsSwiperElement = ".steps-swiper";
    Swiper.use([EffectFade, Navigation, Autoplay, Pagination]);

    const swiper = new Swiper(swiperElement, {
        slidesPerView: 4,
        spaceBetween: 30,
    });

    var menu = [
        {
            title: 'Visualize key data',
            text: "Versatile infographics and more to boost your message — check!"
        },
        {
            title: 'Point out property advantages',
            text: "Rest assured you've done your best thanks to our plugin"
        },
        {
            title: 'Appeal to reason and emotions',
            text: 'This match gets real estate jobs done'
        },
        {
            title: 'Create premium buying experience',
            text: 'Prove you understand how special the moment is'
        }
    ];

    const stepsSwiper = new Swiper(stepsSwiperElement, {
        loop: true,
        autoplay: {
            delay: 3000,
        },
        pagination: {
            el: ".steps .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                const data = menu[index];
                return (
                    `
                    <div class="step ${className}">
                        <div class="step__dot">${index + 1}</div>
                        <div class="step__data">
                            <div class="step__title">${data.title}</div>
                            <div class="step__text">${data.text}</div>
                        </div>
                    </div>
                    `
                );
            },
        },
    });

    const mSwiper = new Swiper(mSwiperElement, {
        effect: "fade",
        loop: true,
    });

    const transitionSwiper = new Swiper(transitionSwiperElement, {
        // speed: 1000,
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 3000,
        },

        navigation: {
            nextEl: transitionSwiperElement + " .swiper-button-next",
            prevEl: transitionSwiperElement + " .swiper-button-prev",
        },
    });

    swiper.on("click", (e) => {
        const index = e.clickedIndex + 1;
        mSwiper.slideTo(index, 100);
    });
};

(() => {
    document.body.classList.add("initialized");

    bigMSlider();

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

    //     handleTouchEvents(document.querySelector('.promo-carousel-flat'), {
    //         onLeftSwipe,
    //         onRightSwipe,
    //     }).init();
    // };

    // const makeSlider = (id, options = {}) => {
    //     const defaultOptions = { pause: false, interval: 4000, wrap: true };
    //     const currentOptions = { ...defaultOptions, ...options };
    //     const slider = $(id).carousel(currentOptions);

    //     // console.log(slider.carousel('next'));

    //     // $(id).carousel("pause");
    //     carouselSwiping(slider[0]);

    //     return slider;
    // };

    // const initSlider = () => {
    //     const id = "#carouselFlat";
    //     makeSlider(id);

    //     const indicators = $(`${id}Indicators > li`);

    //     if (indicators) {
    //         const carousel = $(id);
    //         carousel.on("slide.bs.carousel", (e) => {
    //             indicators.each((i, el) => {
    //                 el.classList.remove("active");
    //                 if (e.to === i) {
    //                     el.classList.add("active");
    //                     // $(id2).carousel(i);
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

    lazyShow();
    // initSlider();
    initPrevs();
})();
