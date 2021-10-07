import { doOnVisible } from "./libs/do-on-visible";
import initPrevs from "./utils/prevs";
import Splitting from "splitting";

(() => {
    document.body.classList.add("ready");
    Splitting({
        target: ".section__title, .left",
        by: "words",
    });
    window.addEventListener("load", () => {
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
            },
            cbOut: (target) => {
                // target.dataset.visible = false;
            },
            rootMargin: "-150px",
        });


        function onImagesReady(images, callback) {
            images.forEach(imgUrl => {
            const img = document.createElement('img');
            img.addEventListener('load', () => {
                img.remove();
                incrementCounter();
            });
            img.setAttribute('src', imgUrl);
            });
            const count = images.length;
            let counter = 0;
            function incrementCounter() {
                counter++;
                if (counter === count) {
                    callback();
                }
            }
        }

        function overlayCountdown() {
            const countdown = document.querySelector('.overlay-countdown');
            const img = countdown.querySelector('img');
            const src = img.currentSrc || img.src;

            onImagesReady([ src ], () => {
            countdown.classList.add('show');
            setTimeout(() => {
                countdown.classList.add('hide');
            }, 2300);
            });
        }

        overlayCountdown();

    });

    initPrevs();

    const makeSlider = (id) => {
        const slider = $(id).carousel({
            pause: false,
            interval: 5000,
            wrap: true,
        });

        $(id).carousel("pause");

        return slider;
    };

    const demo = ["#demo"]

    demo.forEach((id, index) => {
        makeSlider(id);

        setTimeout(() => {
            $(id).carousel("cycle");
        }, 500 * index);
    })

    const sliderIds = ["#demo2", "#demo1", "#demo3", "#demo10"];

    const sliders = sliderIds.map((sliderId, index) => {
        makeSlider(sliderId);

        setTimeout(() => {
            $(sliderId).carousel("cycle");
        }, 250 * index);
    });

    const s = ["#demoa", "#demob"];

    s.forEach((id, index) => {
        makeSlider(id);

        setTimeout(() => {
            $(id).carousel("cycle");
        }, 500 * index);
    })

})();
