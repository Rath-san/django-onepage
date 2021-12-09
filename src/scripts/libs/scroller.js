import GUI from "lil-gui";

const myObject = {
  //   myBoolean: true,
  //   myFunction: function () {},
  //   myString: "lil-gui",
  sinSpeed: 0.015,
  sinX: 4.41,
  sinAmp: 30,
  e: 1,
};

export const gui = () => {
  // const gui = new GUI();
  // const slider = gui.addFolder("Slider");
  // slider.add(myObject, "sinSpeed", 0, 0.1);
  // slider.add(myObject, "sinX", 1, 50);
  // slider.add(myObject, "sinAmp", 1, 50);
};

const BREAKPOINTS = {
  sm: 560,
  md: 768,
  lg: 1200,
};

const scroller = () => {
  let WINDOW_INNER_WIDTH = window.innerWidth;

  const onResize = (e) => {
    if (e) {
      WINDOW_INNER_WIDTH = e.target.innerWidth;
    }

    if (WINDOW_INNER_WIDTH < BREAKPOINTS.md + 1) {
      myObject.sinAmp = 0;
    } else {
      myObject.sinAmp = 50;
    }
  };

  window.addEventListener("resize", onResize);

  const setup = () => {
    onResize();
  };

  const slider = document.querySelector(".slider");
  const sliderInner = slider.querySelector(".slider-inner");
  const sliderItems = Array.from(sliderInner.querySelectorAll(".slider-item"));

  const sliderInnerLength = sliderItems.length;
  const sliderInnerWidth = 100 * sliderInnerLength;

  let positionOffset = -1;
  let speed = 0.1;
  let currentStatus = "play";

  let paused = false;

  const calcPos = (itemX, positionOffset) => {
    return (
      ((itemX + positionOffset + sliderInnerWidth + 100) % sliderInnerWidth) -
      100
    );
  };

  const sliderItemsProxy = sliderItems.map((item, idx) => {
    return {
      x: idx * 100,
      y: 0,
      el: item,
    };
  });

  let fallbackValue = 0.09;

  const render = () => {

    const posOffsetAbs = Math.abs(positionOffset)

    // console.log(posOffsetAbs);

    if (posOffsetAbs > 10) {
      fallbackValue = 1
    } else {
      fallbackValue = .09
    }

    if (positionOffset < -1) {
      positionOffset += fallbackValue;
    } else if (positionOffset > 1) {
      positionOffset -= fallbackValue;
    } else {
      speed = 0.25 / 2;
      positionOffset = -1;
    }

    sliderItemsProxy.forEach((item) => {
      const x = calcPos(item.x, positionOffset * speed);
      item.x = x;

      const y =
        Math.sin(x * myObject.sinSpeed + myObject.sinX) * myObject.sinAmp;
      item.y = y;

      item.el.style.transform = `translate3d(${x}%, ${y}%, 0)`;
    });
  };

  const autoplay = () => {
    if (paused) return;
    render();
    window.requestAnimationFrame(autoplay);
  };

  const setStatus = (status) => {
    if (currentStatus === status) return;
    currentStatus = status;

    switch (currentStatus) {
      case "play":
        paused = false;
        autoplay();
        break;

      case "pause":
        paused = true;
        break;

      //   case "stop":
      //     window.cancelAnimationFrame(req);
      //     break;

      default:
        break;
    }
  };

  const move = (offset) => {
    speed = 1;
    positionOffset = offset;
    render();
  };

  const mouseEvents = () => {
    let mouseDown = false;
    let mouseMove = false;
    // let movementMax = 5

    const onMouseDown = (e) => {
      if (!e.touches?.length) {
        e.preventDefault();
      }
      mouseDown = true;
      setStatus("pause");
    };

    let previousTouch;

    const onMouseUp = (e) => {
      if (!e.touches?.length) {
        e.preventDefault();
      }
      if (!mouseDown) return;
      setStatus("play");

      if (!mouseMove) {
        move(-5);
      }

      mouseDown = false;
      previousTouch = 0;
      mouseMove = false;
    };

    // const onMouseLeave = (e) => {
    //   e.preventDefault();
    //   console.log("mouseleave");
    //   if (!mouseDown) return;
    // };

    const onMouseMove = (e) => {
      // console.log(e);
      if (!e.touches?.length) {
        e.preventDefault();
      }
      mouseMove = true;
      if (!mouseDown) return;

      if (e.touches?.length) {
        const touch = e.touches[0];
        e.movementX = touch.pageX - previousTouch?.pageX;
        e.movementY = touch.pageY - previousTouch?.pageY ?? 0;
        previousTouch = touch;
      }

      // console.log((e.movementX / sliderInnerWidth) * 100);
      move((e.movementX / sliderInnerWidth) * 100);
      return e;
    };

    // fix on move
    // slider.addEventListener("click", () => {

    // });

    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("touchstart", onMouseDown);

    slider.addEventListener("mousemove", onMouseMove);
    slider.addEventListener("touchmove", onMouseMove);

    slider.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mouseleave", onMouseUp);
    slider.addEventListener("touchend", onMouseUp);
  };

  const init = () => {
    setup();
    autoplay();
    mouseEvents();
  };

  return {
    init,
  };
};

export default scroller;
