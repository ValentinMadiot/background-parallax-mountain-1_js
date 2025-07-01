//* SCALE THE SCENE
const DESIGN_WIDTH = 1425;
const DESIGN_HEIGHT = 820;
const sceneEl = document.querySelector(".scene");

function scaleScene() {
  const scale = Math.max(
    window.innerWidth / DESIGN_WIDTH,
    window.innerHeight / DESIGN_HEIGHT
  );
  sceneEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
}
scaleScene();
window.addEventListener("resize", scaleScene);

//* NAV BURGER
// const burger = document.querySelector(".nav__hamburger");
// const navLinks = document.querySelector(".nav__links");

// burger?.addEventListener("click", (e) => {
//   e.preventDefault();
//   navLinks.classList.toggle("active");
// });

//* PARALLAX Animation
const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0;
let yValue = 0;
let rotateDegree = 0;

function update(cursorPosition) {
  parallax_el.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;

    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

    let zValue =
      (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

    el.style.transform = `translateX(calc(-50% + ${
      -xValue * speedx
    }px)) translateY(calc(-50% + ${
      yValue * speedy
    }px)) perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${
      rotateDegree * rotateSpeed
    }deg)`;
  });
}

update(0);

window.addEventListener("mousemove", (e) => {
  if (timeline.isActive()) return;

  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  update(e.clientX);
});

//* GSAP Animation
let timeline = gsap.timeline();

Array.from(parallax_el)
  .filter((el) => !el.classList.contains("home__text"))
  .forEach((el) => {
    timeline.from(
      el,
      {
        top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
        duration: 3.5,
        ease: "power3.out",
      },
      "1"
    );
  });

timeline
  .from(
    ".home__text h1",
    {
      y:
        window.innerHeight -
        document.querySelector(".home__text h1").getBoundingClientRect().top +
        200,
      duration: 2,
    },
    "2.5"
  )
  .from(
    ".home__text h2",
    {
      y: -150,
      opacity: 0,
      duration: 1.5,
    },
    "3"
  )
  .from(
    ".hide",
    {
      opacity: 0,
      duration: 1.5,
    },
    "3"
  );
