import { doOnVisible } from "./libs/do-on-visible";
import Splitting from "splitting";
import { handleTouchEvents } from "./utils/utils";
import "./vendor/menu";
import YTPlayer from "yt-player";
// import "./libs/arrow-slider";
import initPrevs from "./libs/prevs";

// import Swiper, { EffectFade, Navigation, Autoplay, Pagination } from "swiper";

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

(() => {
    document.body.classList.add("initialized");

    const titles = [
        ...Array.from(document.querySelectorAll(".section__title")),
        // ...Array.from(document.querySelectorAll(".section__display")),
    ];

    titles.forEach((title) => {
        title.style.opacity = 1;
    });

    Splitting({
        target: ".section__title, .left",
        by: "chars",
    });

    window.addEventListener("load", () => {
        document.body.classList.add("ready");

        const sections = [
            ...Array.from(document.querySelectorAll("section")),
            ...Array.from(document.querySelectorAll(".left")),
            ...Array.from(document.querySelectorAll("footer")),
            document.querySelector('.packs-boxes')
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

    const carouselSwiping = (carousel) => {
        const carouselEntity = $(`#${carousel.id}`);
        const onRightSwipe = () => {
            carouselEntity.carousel("next");
        };

        const onLeftSwipe = () => {
            carouselEntity.carousel("prev");
        };

        handleTouchEvents(document.querySelector(".carousel-flat-section"), {
            onLeftSwipe,
            onRightSwipe,
        }).init();
    };

    const makeSlider = (id, options = {}) => {
        const defaultOptions = { pause: false, interval: 4000, wrap: true };
        const currentOptions = { ...defaultOptions, ...options };
        const slider = $(id).carousel(currentOptions);
        carouselSwiping(slider[0]);

        return slider;
    };

    const updateCounter = (target, currentIndex, totalItems) => {
        const maxDigits = 2;
        const leadingZero = (number) => {
            return `0${number.toString()}`.slice(-maxDigits);
        };

        target.text(
            `${leadingZero(currentIndex + 1)}/${leadingZero(totalItems)}`
        );
    };

    const initSlider = (sliderId) => {
        if (!sliderId) return;
        const id = sliderId;

        makeSlider(id);

        const indicators = $(`${id}Indicators > li`);
        const counter = $(`${id}Counter`);
        const carousel = $(id);

        if (counter) {
            const totalItems = $(`${id} .carousel-item`);

            carousel.on("slide.bs.carousel", (e) => {
                updateCounter(counter, e.to, totalItems.length);
            });
        }

        if (indicators) {
            carousel.on("slide.bs.carousel", (e) => {
                indicators.each((i, el) => {
                    el.classList.remove("active");
                    if (e.to === i) {
                        el.classList.add("active");
                        // $(id2).carousel(i);
                    }
                });
            });

            indicators.each((i, el) => {
                el.addEventListener("click", () => {
                    carousel.carousel(i);
                });
            });
        }

        return carousel;
    };

    // lazyShow();
    const slidersIds = ["#carouselFlat", "#carouselFlat2", "#postersFade1", "#postersFade2", "#postersFade3", "#postersFade4", "#postersFade4m"];

    slidersIds.forEach((sliderId) => {
        initSlider(sliderId);
    });

    initSlider();
    initPrevs();
    lazyShow();
})();
