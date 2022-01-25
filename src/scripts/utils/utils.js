export const isCached = (imgUrl) => {
  var imgEle = document.createElement("img");
  imgEle.src = imgUrl;
  return imgEle.complete || imgEle.width + imgEle.height > 0;
};

export const throttle = (func, timeFrame) => {
  var lastTime = 0;
  return function (e) {
    var now = new Date();
    if (now - lastTime >= timeFrame) {
      func(e);
      lastTime = now;
    }
  };
};

export const handleTouchEvents = (selector, {
  onLeftSwipe = () => {},
  onRightSwipe = () => {},
  onTopSwipe = () => {},
  onDownSwipe = () => {}
}) => {
  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return (
      evt.touches || // browser API
      evt.originalEvent.touches
    ); // jQuery
  }
  
  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }
  
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
  
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
  
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* right swipe */
        onRightSwipe(xDiff)
      } else {
        /* left swipe */
        onLeftSwipe(xDiff)
      }
    } else {
      if (yDiff > 0) {
        /* down swipe */
        onDownSwipe(yDiff)
      } else {
        /* up swipe */
        onTopSwipe(yDiff)
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }

  const registerEvents = () => {
    selector.addEventListener("touchstart", handleTouchStart, false);
    selector.addEventListener("touchmove", handleTouchMove, false);
  }

  const init = () => {
    registerEvents();
  }

  return {
    init,
  }
}
