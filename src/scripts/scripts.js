import { doOnVisible } from "./libs/do-on-visible";
import initPrevs from "./utils/prevs";
import Splitting from "splitting";
import { throttle, handleTouchEvents } from "./utils/utils";
import scroller, { gui } from "./libs/scroller";
// import { animSignsPrevs } from "./libs/anim-sign";
// import "./vendor/beforeafter";
// import Matrix from "./libs/matrix";
// import { randomString } from './libs/random-string';

// const animateTitle = () => {
//   const titles =
//   titles.forEach(
//     (el, idx) => {
//       console.log(el);
//       randomString(el, ".char")
//     }
//   );
// }

const callBASlider = function () {
  $(".ba-slider").each(function () {
    $(this).beforeAfter(".img-lazy");
  });

  const baseOffset = 12;
  const isAfter = (e) => e.classList.contains("right");

  // $(".prev__label").each(function (i, e) {
  //   $(e).on("click", function () {
  //     const parent = this.closest(".prBeforeAfter");
  //     const resize = $(parent).find(".resize");
  //     const handle = $(parent).find(".handle");

  //     const newOffset = `${isAfter(e) ? baseOffset : 100 - baseOffset}%`;

  //     resize.css("width", newOffset);
  //     handle.css("left", newOffset);
  //   });
  // });
};

(() => {
  document.body.classList.add("initialized");

  // animSignsPrevs('.prevs');
  // animSignsPrevs('.promo-big');

  // Matrix.init();

  const titles = Array.from(document.querySelectorAll(".section__title"));

  titles.forEach((title) => {
    title.style.opacity = 1;
  });

  Splitting({
    target: ".section__title, .left",
    by: "words",
  });

  // animateTitle();

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
      },
      cbOut: (target) => {
        // target.dataset.visible = false;
      },
      rootMargin: "-150px",
    });
  });

  // const decoFloat = (el) => {
  //   const offsetValue = .25;

  //   const translate = (ev) => {
  //     const offsetPercentageHorizontal =
  //       Math.abs(ev.clientX / window.innerHeight) * 100 * offsetValue;
  //     const offsetPercentageVertical =
  //       Math.abs(ev.clientY / window.innerHeight) * 100 * offsetValue;

  //     el.style.transform = `translate(${-offsetPercentageHorizontal}%, ${-offsetPercentageVertical}%)`;
  //   };

  //   const mouseEvents = () => {
  //     window.addEventListener("mousemove", throttle(translate, 100));
  //   };

  //   mouseEvents();
  // };

  // const elements = Array.from(
  //   document.querySelectorAll(".deco-float__wrapper")
  // );

  // elements.forEach((el) => {
  //   const onTransitionEnd = (ev) => {
  //     el.classList.remove("entering");
  //     el.removeEventListener("transitionend", onTransitionEnd);
  //     decoFloat(el);
  //   };

  //   el.addEventListener("transitionend", onTransitionEnd);
  // });

  const demo = ["#carousel-1"];
  const indicators = $(".carousel-indicators div");

  const makeSlider = (id) => {
    const slider = $(id).carousel({
      pause: false,
      interval: 5000,
      wrap: true,
    });

    $(id).carousel("pause");

    return slider;
  };

  demo.forEach((id, index) => {
    makeSlider(id);

    $(id).on("click", (e) => {
      demo.forEach((id, idx) => {
        if (id === demo[demo.length - 1]) {
          $(id).carousel("next");
        } else {
          setTimeout(() => {
            $(id).carousel("next");
          }, 250 * idx);
        }
      });
    });

    $(id).on("slide.bs.carousel", (e) => {
      indicators.each((i, el) => {
        el.classList.remove("active");
        if (e.to === i) {
          el.classList.add("active");
        }
      });
    });

    setTimeout(() => {
      $(id).carousel("cycle");
    }, 250 * index);
  });

  const carouselMobile = document.getElementById("carousel-mobile");

  const onRightSwipe = () => {
    $("#carousel-mobile").carousel("next");
  };

  const onLeftSwipe = () => {
    $("#carousel-mobile").carousel("prev");
  };

  handleTouchEvents(carouselMobile, {
    onLeftSwipe,
    onRightSwipe,
    // onTopSwipe: (val) => console.log({top: val}),
    // onDownSwipe: (val) => console.log({down: val})
  }).init();

  scroller().init();

  // indicators.each((i, el) => {
  //   el.addEventListener("click", () => {
  //     demo.forEach((id) => {
  //       $(id).carousel(i);
  //     });
  //   });
  // });

  // callBASlider();
  initPrevs();

  gui();
})();
