const carousel = document.querySelector("#carousel1");
const carouselInner = carousel.querySelector(".carousel-continous__inner");

// carouselInner.addEventListener

const carouselItems = Array.from(
  carouselInner.querySelectorAll(".carousel-continous__item")
);

const carouselTruth = carouselItems.map((el, index) => ({
  x: index * 100,
  y: 0,
  el
}));

let speed = 4;
let positionOffset = -1;
let fallbackValue = 0.75;

const carouselItemsLength = carouselTruth.length;
const wholeWidth = carouselItemsLength * 100;

const calcPos = (itemX, positionOffset) => {
  // console.log((itemX + positionOffset) % wholeWidth);

  const temp = ((itemX + positionOffset + wholeWidth + 100) % wholeWidth) - 100;

  return temp;
};

let currentStatus = "play";
let req;

const render = () => {
  if (positionOffset < -1) {
    positionOffset += fallbackValue;
  } else if (positionOffset > 1) {
    positionOffset -= fallbackValue;
  } else {
    speed = 4;
    positionOffset = -1;
  }

  carouselTruth.forEach((item) => {
    const x = calcPos(item.x, positionOffset / speed);
    item.x = x;

    item.el.style.transform = `translate3d(${x}%, 0, 0)`;
  });
};

const move = (offset) => {
  speed = 1;
  positionOffset = offset;

  render();
};

const autoplay = () => {
  render();
  req = window.requestAnimationFrame(autoplay);
};

const next = () => {
  window.cancelAnimationFrame(req);
  setTimeout(autoplay, 1000);
};

const prev = () => {
  window.cancelAnimationFrame(req);
  setTimeout(autoplay, 1000);
};

window.next = next;
window.prev = prev;

autoplay();

const setStatus = (status) => {
  if (currentStatus === status) return;
  currentStatus = status;

  switch (currentStatus) {
    case "play":
      autoplay();
      break;

    case "pause":
      window.cancelAnimationFrame(req);
      break;

    case "stop":
      window.cancelAnimationFrame(req);
      break;

    default:
      break;
  }
};

let mouseDown = false;
// let movementMax = 5

const onMouseDown = (e) => {
  e.preventDefault();
  mouseDown = true;
  setStatus("pause");
};

const onMouseUp = (e) => {
  e.preventDefault();
  if (!mouseDown) return;
  setStatus("play");
  mouseDown = false;
};

// const onMouseLeave = (e) => {
//   e.preventDefault();
//   console.log("mouseleave");
//   if (!mouseDown) return;
// };

const onMouseMove = (e) => {
  e.preventDefault();
  if (!mouseDown) return;

  move((e.movementX / wholeWidth) * 100);
};

carousel.addEventListener("mousedown", onMouseDown);
carousel.addEventListener("mousemove", onMouseMove);
carousel.addEventListener("mouseup", onMouseUp);
carousel.addEventListener("mouseleave", onMouseUp);
