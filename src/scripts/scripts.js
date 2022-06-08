import { doOnVisible } from "./libs/do-on-visible";
import Splitting from "splitting";
import { handleTouchEvents } from "./utils/utils";
import "./vendor/menu";
import YTPlayer from "yt-player";
import initPrevs from "./utils/prevs";

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

const glitchLoopLogo = () => {
    const logo = document.querySelector(".header__logo");
    setInterval(() => {
        logo.classList.remove("glitch-anim-2--visible");
        // logo.style.filter = `url(#filter-music-main)`;
        void logo.offsetWidth;
        logo.classList.add("glitch-anim-2--visible");
        // turbulenceLoop('#filter-music-main');
    }, 4000);
};

const turbulenceLoop = (filter = '#filter-music') => {
    let r;
    var start = Date.now();

    var turbVal = () => ({ val: Math.random(1)});
    var turbValX = () => ({ val: Math.random(1)});
    var turb = document.querySelectorAll(`${filter} feTurbulence`)[0];

    const _req = () => {

        if (Date.now() - start < 1000) {
            turb.setAttribute("baseFrequency", turbVal().val + " " + turbValX().val);
        } else {
            turb.setAttribute("baseFrequency", 0 + " " + 0);
        }
        r = window.requestAnimationFrame(_req);

    }

    r = window.requestAnimationFrame(_req);
};

(() => {
    document.body.classList.add("initialized");

    const titles = Array.from(document.querySelectorAll(".section__title"));

    Splitting({
        target: ".section__title, .section__display, .left",
        by: "chars",
    });

    glitchLoopLogo();
    // turbulenceLoop();

    // titles.forEach((t, index) => {
    //     t.style.animationDelay = `${Math.floor(Math.random() * 2000)}ms`;
    //     t.dataset.glitch = 1;
    //     Array.from(t.querySelectorAll('.word')).forEach(c => {
    //         c.style.animationDelay = `${Math.floor(Math.random() * 2000)}ms`;
    //         c.dataset.glitchText = c.dataset.word
    //     })
    // })

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
                // if (target.dataset.visible !== 'true') {
                //     turbulenceLoop();
                // }
                target.dataset.visible = true;
                loadOnVisibleImages(target);
            },
            cbOut: () => {},
            rootMargin: "-150px",
        });

        // const updateDecoOnScroll = (deco) => {
        //     deco.style['--tt'] =
        // }

        doOnVisible({
            sectionSelector: Array.from(
                document.querySelectorAll(".deco__comp")
            ),
            cbIn: (target) => {
                target.dataset.decoActive = true;
                // console.log('deco');
                window.addEventListener(
                    "scroll",
                    (e) => {
                        // console.log(
                        //     window.scrollY
                        // );
                    },
                    { passive: true }
                );
            },
            cbOut: (target) => {
                target.dataset.decoActive = false;
            },
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

        handleTouchEvents(carousel, {
            onLeftSwipe,
            onRightSwipe,
        }).init();
    };

    const makeSlider = (id, options = {}) => {
        const defaultOptions = { pause: false, interval: 4000, wrap: true };
        const currentOptions = { ...defaultOptions, ...options };
        const slider = $(id).carousel(currentOptions);

        // console.log(slider.carousel('next'));

        // $(id).carousel("pause");
        carouselSwiping(slider[0]);

        return slider;
    };

    const initSlider = () => {
        const id = "#carouselMain";
        makeSlider(id);

        const indicators = $(`${id}Indicators > li`);

        if (indicators) {
            const carousel = $(id);
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
    };

    lazyShow();
    initSlider();
    initPrevs();
})();
