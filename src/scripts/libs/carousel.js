import { handleTouchEvents } from "../utils/utils";

export const carouselSwiping = (carousel) => {
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

export const makeSlider = (id, options = {}) => {
    const defaultOptions = { pause: false, interval: 5000, wrap: true };
    const currentOptions = { ...defaultOptions, ...options };
    const slider = $(id).carousel(currentOptions);

    $(id).carousel("pause");
    carouselSwiping(slider[0]);

    return slider;
};

export const initSlider = () => {
    const id = "#carouselFlat";
    const id2 = "#carouselFlatText";
    makeSlider(id);
    makeSlider(id2);

    const indicators = $(`${id}Indicators > li`);

    if (indicators) {
        const carousel = $(id);
        carousel.on("slide.bs.carousel", (e) => {
            indicators.each((i, el) => {
                el.classList.remove("active");
                if (e.to === i) {
                    el.classList.add("active");
                    $(id2).carousel(i);
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
