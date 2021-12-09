const matrix = () => {
  const canvas = document.getElementById("canv");
  const ctx = canvas.getContext("2d");

  const bgColor = "#0002";
  const color = "#27FF8250";

  let w = (canvas.width = document.body.offsetWidth);
  const h = (canvas.height = 1000);
  let paintInterval = 10;
  const colSize = 8;
  const cols = Math.floor(w / colSize) + 1;
  const ypos = Array(cols).fill(0);

  const setup = () => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    window.addEventListener("resize", () => {
      w = window.innerWidth;
    });
  };

  function paint() {

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = color;
    ctx.font = "8pt monospace";

    ypos.forEach((y, ind) => {
      const text = String.fromCharCode(Math.random() * 128);
      const x = ind * colSize;

      if (ind % 2 == 0) {
        ctx.fillText(text, x, y);
      }

      if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
      else ypos[ind] = y + 20;
    });

    setTimeout(() => {
        if (paintInterval < 100) {
            paintInterval += 1
        }
        paint();
    }, paintInterval);
  }

  const init = () => {
    setup();
    paint();
  };

  return {
    init,
  };
};

export default matrix();
