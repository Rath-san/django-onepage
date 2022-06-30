import { doOnVisible } from "./libs/do-on-visible";
import Splitting from "splitting";
// import { handleTouchEvents } from "./utils/utils";
import "./vendor/menu";
import youtube from "./vendor/youtube3";
import Swiper from "./vendor/swiper";

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

        // ytTopVideos.forEach(v => {
        //     makePlayer(v.dataset.id, v);
        // });

        youtube($("#playlist"), "PLBrUm2lGexixgXY9hShMO0GV7N3mKFHyP");

        let v;

        const load_video = () => {
            $(".swiper-container-mobile").css("display", "none");
            $(".swiper-container-desktop").css("display", "block");
            $(".swiper-container-desktop source").each(function (index) {
                v = $(this);
                v.attr("src", $(this).attr("bg-src"));
                $(".swiper-container-desktop video")[index].load();
            });
            // console.log(Swiper);
            // swiperSlider.reInit();
        };

        const load_img = () => {
            $(".swiper-container-desktop").css("display", "none");
            $(".swiper-container-mobile").css("display", "block");
            $(".swiper-container-mobile img").each(function (index) {
                $(this).attr(
                    "src",
                    $(this).attr("bg-src") + "?v=" + Math.random()
                );
                $(".swiper-container-desktop video")[index].pause();
            });
            // console.log(Swiper);
            // swiperSlider.reInit();
        };

        const mobileViewBreakpoint = 768;
        let start_mobile = 0;

        if (window.innerWidth <= mobileViewBreakpoint) {
            start_mobile = 1;
        }

        if (start_mobile) {
            load_img();
        } else {
            load_video();
        }

        const swiperSlider = new Swiper(".swiper-container", {
            autoplay: {
                delay: 3000,
            },
            loop: true,
            navigation: {
                nextEl: ".arrow-right",
                prevEl: ".arrow-left",
            },
            observer: true,
            observeParents: true,
        });

        window
            .matchMedia(`(max-width: ${mobileViewBreakpoint}px)`)
            .addEventListener("change", (e) => {
                // console.log(e.maches);
                e.matches ? load_img() : load_video();
            });

        const saveMoneyToggle = () => {
            const element = document.querySelector(".save-money");
            const animClass = "alt";
            let timeout;

            const checkAnimClass = () => {
                if (element.classList.contains(animClass)) {
                    element.classList.remove(animClass);
                } else {
                    element.classList.add(animClass);
                }
            };

            const anim = () => {
                checkAnimClass();
                timeout = setTimeout(anim, 3000);
            };

            element.addEventListener("mouseenter", () => {
                clearInterval(timeout);
                checkAnimClass();
            });

            element.addEventListener("mouseleave", () => {
                anim();
            });

            anim();
        };

        saveMoneyToggle();

        const bundleBoxHover = () => {
            const pairs = Array.from(document.querySelectorAll("[data-pair]"));

            pairs.forEach((element) => {
                const pairNumber = element.dataset.pair;

                element.addEventListener("mouseenter", () => {
                    pairs.forEach((p) => {
                        if (p.dataset.pair === pairNumber) {
                            p.classList.add("active");
                        }
                    });
                });

                element.addEventListener("mouseleave", () => {
                    pairs.forEach((p) => {
                        if (p.dataset.pair === pairNumber) {
                            p.classList.remove("active");
                        }
                    });
                });
            });
        };

        bundleBoxHover();
    });

    // $(document).ready(function() {
    //     AOS.init();

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
    // initPrevs();
})();
