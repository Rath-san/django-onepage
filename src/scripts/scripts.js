import { doOnVisible } from "./libs/do-on-visible";
import initPrevs from "./utils/prevs";
import Splitting from "splitting";

(() => {
  document.body.classList.add("ready");
  Splitting({
    target: ".section__title, .left",
    by: 'words',
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
  });

  initPrevs();

  const sliderIds = ["#demo", "#demo2", "#demo1"];

  const sliders = sliderIds.map((sliderId, index) => {
      const slider = $(sliderId).carousel({
        pause: false,
        interval: 5000,
        wrap: true
      })

      $(sliderId).carousel('pause')

        setTimeout(() => {
            $(sliderId).carousel('cycle')
        }, 250 * index);

      return slider

  });
})();
