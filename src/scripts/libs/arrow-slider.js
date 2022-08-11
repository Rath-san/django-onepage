import { handleTouchEvents } from "../utils/utils";

const CLASSES = {
  active: "active",
  previous: "previous",
};

const STATES = {
  play: "PLAY",
  pause: "PAUSE",
  stop: "STOP",
};

const sliderFighter = (element, options = {}) => {
  const defaults = {
    autoplay: true,
    delay: 0,
    interval: 4000,
    state: STATES.play,
    ...options,
  };

  let loop;

  const autoplay = () => {
    // loop = setTimeout(autoplay, defaults.interval);
    // setCurrentIndex(currentIndex + 1);
  };

  const resetLoop = () => {
    // clearInterval(loop);
    // loop = setTimeout(autoplay, defaults.interval);
  };

  const slides = Array.from(element.querySelectorAll(".slider-on__item"));

  const maxIndex = slides.length - 1;

  let currentState = defaults.state;
  const setCurrentState = (newState) => {
    currentState = newState;
    change();
  };

  let currentIndex = 0;
  let setCurrentIndex = (newIndex) => {
    if (!isPlaying()) return;

    currentIndex = selectIndex(newIndex);
    change();
  };

  const setup = () => {
    slides.forEach((s, index, slidesArray) => {

      s.addEventListener("transitionend", () => {
        console.log("transitionend");
        slides.forEach((sl) => sl.classList.remove(CLASSES.previous));
      });

      s.addEventListener("transitioncancel", () => {
        console.log("transitioncancel");
        slides.forEach((sl) => sl.classList.remove(CLASSES.previous));
      });

      if (s.classList.contains(CLASSES.active)) {
        currentIndex = index;
      }
    });

    // change();
  };

  const selectIndex = (newIndex) => {
    if (newIndex > maxIndex) return 0;

    if (newIndex < 0) return maxIndex;

    return newIndex;
  };

  const isPlaying = () => currentState === STATES.play;

  let removePrevTimeout;

  const change = () => {
    slides.forEach((s) => {
      s.classList.remove(CLASSES.previous);
      s.classList.replace(CLASSES.active, CLASSES.previous);
    });
    // slides[selectIndex(currentIndex - 1)].classList.add(CLASSES.previous);
    slides[currentIndex].classList.add(CLASSES.active);

    clearTimeout(removePrevTimeout);

    removePrevTimeout = setTimeout(() => {
      slides.forEach((sl) => sl.classList.remove(CLASSES.previous));
    }, 1000);
  };

  const next = () => {
    // resetLoop();
    setCurrentIndex(currentIndex + 1);
  };

  const prev = () => {
    // resetLoop();
    setCurrentIndex(currentIndex - 1);
  };

  const init = () => {};
  const play = () => {
    setCurrentState(STATES.play);
    resetLoop();
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
  const slidersSelectors = Array.from(document.querySelectorAll(".slider-on"));
  const delay = 100;
  const sliders = slidersSelectors.map((s, index) => sliderFighter(s, {}));

  const changeAllSlides = (dir) => {
    let interval;
    dir === 1
      ? sliders.forEach((s, index) => {
          clearInterval(interval);
          setTimeout(s.next, delay * index);
        })
      : sliders.forEach((s, index) => {
          clearInterval(interval);
          setTimeout(s.prev, delay * index);
        });
  };

  let loop;

  const autoplay = () => {
    loop = setTimeout(() => {
      changeAllSlides(1)
      autoplay();
    }, 4000);
  }

  autoplay();


  const handleOnSwipe = (dir) => {
    clearTimeout(loop)
    changeAllSlides(dir);
    autoplay();
  }

  const wrapper = document.querySelector(".four-pic")

  // wrapper.addEventListener('mouseenter' , () => {
  //   handleOnSwipe(1)
  // })
  // wrapper.addEventListener('mouseleave' , () => {
  //   handleOnSwipe(-1)
  // })

  handleTouchEvents(wrapper, {
    onLeftSwipe: () => handleOnSwipe(-1),
    onRightSwipe: () => handleOnSwipe(1),
  }).init();

  sliders.forEach((sl, index) => setTimeout(sl.play, delay * index));



});
