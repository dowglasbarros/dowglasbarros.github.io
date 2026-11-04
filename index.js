window.onload = function () {
  let c = document.getElementById("binary-code");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  let ctx = c.getContext("2d");
  const matrix = "0100010001101111011101110110" + "0111011011000110000101110011".split(1);
  const font_size = 9;
  const columns = c.width / font_size;
  let drops = [];

  for (let x = 0; x < columns; x++) {
    drops[x] = x - 130;
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, .05)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#00DD00";
    ctx.font = font_size;

    for (let i = 0; i < drops.length; i++) {
      let text = matrix[Math.floor(Math.random() * matrix.length)];
      ctx.fillText(text, i * font_size, drops[i] * font_size);

      if (drops[i] * font_size > c.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(draw, 40);

  const projectCarousel = document.querySelector(".project-carousel");
  const projectArrows = document.querySelectorAll(".project-arrow");

  if (projectCarousel && projectArrows.length) {
    const updateProjectArrows = function () {
      const maxScroll = projectCarousel.scrollWidth - projectCarousel.clientWidth;
      projectArrows.forEach(function (arrow) {
        arrow.disabled = arrow.dataset.direction === "-1"
          ? projectCarousel.scrollLeft <= 1
          : projectCarousel.scrollLeft >= maxScroll - 1;
      });
    };

    projectArrows.forEach(function (arrow) {
      arrow.addEventListener("click", function () {
        const card = projectCarousel.querySelector(".project-card");
        if (!card) return;

        const styles = window.getComputedStyle(projectCarousel);
        const gap = parseFloat(styles.columnGap) || 0;
        projectCarousel.scrollBy({
          left: (card.getBoundingClientRect().width + gap) * Number(arrow.dataset.direction),
          behavior: "smooth"
        });
      });
    });

    projectCarousel.addEventListener("scroll", updateProjectArrows);
    window.addEventListener("resize", updateProjectArrows);
    updateProjectArrows();
  }
};