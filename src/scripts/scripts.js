import { doOnVisible } from "./libs/do-on-visible";
import initPrevs from "./utils/prevs";
import Splitting from "splitting";
import "./vendor/beforeafter";
import Matrix from "./libs/matrix";
import { randomString } from './libs/random-string';

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

  $(".prev__label").each(function (i, e) {
    $(e).on("click", function () {
      const parent = this.closest(".prBeforeAfter");
      const resize = $(parent).find(".resize");
      const handle = $(parent).find(".handle");

      const newOffset = `${isAfter(e) ? baseOffset : 100 - baseOffset}%`;

      resize.css("width", newOffset);
      handle.css("left", newOffset);
    });
  });
};

(() => {
  document.body.classList.add("initialized");

  Matrix.init();

  Splitting({
    target: ".section__title, .left",
    by: "chars",
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
        // if (target.dataset.visible) {
        //   const title = target.querySelector('.section__title');
        //   randomString(title, ".char")
        // }
        target.dataset.visible = true;
      },
      cbOut: (target) => {
        // target.dataset.visible = false;
      },
      rootMargin: "-150px",
    });
  });

  const makeSlider = (id) => {
    const slider = $(id).carousel({
      pause: "hover",
      interval: 7500,
      wrap: true,
    });

    $(id).carousel("pause");

    return slider;
  };

  const demo = ["#demo"];
  const indicators = $(".carousel-indicators div");

  demo.forEach((id, index) => {
    makeSlider(id);

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
    }, 500 * index);
  });

  indicators.each((i, el) => {
    el.addEventListener("click", () => {
      demo.forEach((id) => {
        $(id).carousel(i);
      });
    });
  });
  
  callBASlider();
  initPrevs();
})();
