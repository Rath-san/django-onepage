import { handleTouchEvents } from "../utils/utils";

const CLASSES = {
    active: "active",
    previous: "previous",
};

const sliderFighter = (element, options = {}) => {
    const defaults = {
        autoplay: true,
        interval: 4000,
        ...options,
    };

    const STATES = {
        play: "PLAY",
        pause: "PAUSE",
        stop: "STOP",
    };

    let loop;

    const autoplay = () => {
        loop = setTimeout(autoplay, defaults.interval);
        setCurrentIndex(currentIndex + 1);
    };

    const resetLoop = () => {
        clearInterval(loop);
        loop = setTimeout(autoplay, defaults.interval);
    };

    const setup = () => {
        handleTouchEvents(element, {
            onLeftSwipe: () => prev(),
            onRightSwipe: () => next(),
        }).init();

		resetLoop();
    };

    const slides = Array.from(element.querySelectorAll(".slider__item"));

    slides.forEach((s) => {
        s.addEventListener("transitionend", () => {
            slides.forEach((sl) => sl.classList.remove(CLASSES.previous));
        });
    });

    const maxIndex = slides.length - 1;

    let currentState = STATES.play;
    const setCurrentState = (newState) => {
        currentState = newState;
        change();
    };

    const selectIndex = (newIndex) => {
        if (newIndex > maxIndex) return 0;

        if (newIndex < 0) return maxIndex;

        return newIndex;
    };

    const isPlaying = () => currentState === STATES.play;

    let currentIndex = 0;
    let setCurrentIndex = (newIndex) => {
        if (!isPlaying()) return;

        currentIndex = selectIndex(newIndex);
        change();
    };

    const change = () => {
        slides.forEach((s) => {
            s.classList.remove(CLASSES.previous);
            s.classList.replace(CLASSES.active, CLASSES.previous);
            s.classList.remove(CLASSES.active);
        });
        slides[currentIndex].classList.add(CLASSES.active);
    };

    const next = () => {
        console.log("next");
        resetLoop();
        setCurrentIndex(currentIndex + 1);
    };

    const prev = () => {
        console.log("prev");
        resetLoop();
        setCurrentIndex(currentIndex - 1);
    };

    const init = () => {};
    const play = () => {
        setCurrentState(STATES.play);
    };
    const pause = () => {
        setCurrentState(STATES.stop);
    };
    const stop = () => {
        setCurrentState(STATES.stop);
    };

    setup();

    return {
        init,
        play,
        pause,
        stop,
        next,
        prev,
    };
};

$(document).ready(function () {
    const s = sliderFighter(document.querySelector(".slider"), {});
    window.changeBGImage = (num) => (num < 0 ? s.prev() : s.next());
});
