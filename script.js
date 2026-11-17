const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Typing name */
const typed = document.getElementById("typed");
if (!reduceMotion) {
  const chars = Array.from(typed.textContent);
  typed.textContent = "";
  let i = 0;
  (function type() {
    typed.textContent = chars.slice(0, ++i).join("");
    if (i < chars.length) setTimeout(type, 140);
  })();
}

/* Falling leaves */
if (!reduceMotion) {
  const canvas = document.getElementById("leaves");
  const ctx = canvas.getContext("2d");
  let w, h;

  const leaves = Array.from({ length: 28 }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: 3 + Math.random() * 5,
    speed: 0.25 + Math.random() * 0.5,
    sway: Math.random() * 6.28,
    rot: Math.random() * 6.28
  }));

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }
  addEventListener("resize", resize);
  resize();

  (function frame() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(250, 249, 245, 0.16)";
    for (const l of leaves) {
      l.y += l.speed / h * 2;
      l.sway += 0.01;
      l.rot += 0.01;
      if (l.y > 1.05) { l.y = -0.05; l.x = Math.random(); }
      ctx.save();
      ctx.translate(l.x * w + Math.sin(l.sway) * 30, l.y * h);
      ctx.rotate(l.rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, l.size, l.size * 0.5, 0, 0, 6.28);
      ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(frame);
  })();
}
