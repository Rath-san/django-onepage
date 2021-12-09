
export const randomString = (element, selector) => {
  const letters = "MOTIONFVXMMATRIX";
  const numbers = "2021";
  const string = numbers + letters;
  const allCounters = element.querySelectorAll(selector);

  const durationTime = 10;
  const durationTimeOffset = durationTime;
  const durationTimeFalloff = durationTime / 2;

  allCounters.forEach(function (el) {
    var duration = durationTimeOffset + Array.from(allCounters).indexOf(el) * durationTime;
    var interval = setInterval(function () {
      el.innerText = string.charAt(Math.random() * string.length);
      duration = duration - durationTimeFalloff;
      if (duration <= 0) {
        clearInterval(interval);
        el.innerText = el.getAttribute("data-char");
      }
    }, 50);
  });
};
