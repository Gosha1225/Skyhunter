import anime from "animejs";

const wrapperContent = document.querySelector(".scalable-wrapper__content");
const bg1 = document.querySelector(".background1");
const bg2 = document.querySelector(".background2");
const bg3 = document.querySelector(".background3");
const bg4 = document.querySelector(".background4");
const bg5 = document.querySelector(".background5");
const bg6 = document.querySelector(".background6");
const bg7 = document.querySelector(".background7");
const bg8 = document.querySelector(".background8");
const bg9 = document.querySelector(".background9");
const clouds = document.querySelector(".clouds");
const enemies = document.querySelector(".enemies");

function fastFirstBg() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  let yStart = bg1.getBoundingClientRect().top / scale - offsetTop;
  let yEnd = bg1.getBoundingClientRect().top / scale - offsetTop + 2000;
  if (yEnd > 2000) {
    yStart -= 2000;
    yEnd -= 2000;
  }
  bg1.remove();
  anime({
    targets: bg3,
    duration: 4000,
    top: [yStart, yEnd],
    easing: "linear",
    loop: true,
  });
}

function fastSecondBg() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  let yStart = bg2.getBoundingClientRect().top / scale - offsetTop;
  let yEnd = bg2.getBoundingClientRect().top / scale - offsetTop + 2000;
  if (yEnd > 0) {
    yStart -= 2000;
    yEnd -= 2000;
  }
  bg2.remove();
  anime({
    targets: bg4,
    duration: 4000,
    top: [yStart, yEnd],
    easing: "linear",
    loop: true,
  });
}

function fastThirdBg() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  let yStart = bg7.getBoundingClientRect().top / scale - offsetTop;
  let yEnd = bg7.getBoundingClientRect().top / scale - offsetTop + 2000;
  if (yEnd > 4000) {
    yStart -= 2000;
    yEnd -= 2000;
  }
  bg7.remove();
  anime({
    targets: bg8,
    duration: 4000,
    top: [yStart, yEnd],
    easing: "linear",
    loop: true,
  });
}

function returnFirstBg() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  let yStart = bg3.getBoundingClientRect().top / scale - offsetTop;
  let yEnd = bg3.getBoundingClientRect().top / scale - offsetTop + 2000;
  if (yEnd > 2000) {
    yStart -= 2000;
    yEnd -= 2000;
  }
  bg3.remove();
  anime({
    targets: bg5,
    duration: 36000,
    top: [yStart, yEnd],
    easing: "linear",
    loop: true,
  });
}

function returnSecondBg() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  let yStart = bg4.getBoundingClientRect().top / scale - offsetTop;
  let yEnd = bg4.getBoundingClientRect().top / scale - offsetTop + 2000;
  if (yEnd > 0) {
    yStart -= 2000;
    yEnd -= 2000;
  }
  bg4.remove();
  anime({
    targets: bg6,
    duration: 36000,
    top: [yStart, yEnd],
    easing: "linear",
    loop: true,
  });
}

function returnThirdBg() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  let yStart = bg8.getBoundingClientRect().top / scale - offsetTop;
  let yEnd = bg8.getBoundingClientRect().top / scale - offsetTop + 2000;
  if (yEnd > 4000) {
    yStart -= 2000;
    yEnd -= 2000;
  }
  bg8.remove();
  anime({
    targets: bg9,
    duration: 36000,
    top: [yStart, yEnd],
    easing: "linear",
    loop: true,
  });
}

const firstBg = anime({
  targets: bg1,
  duration: 36000,
  top: 2000,
  easing: "linear",
  loop: true,
});

const secondBg = anime({
  targets: bg2,
  duration: 36000,
  top: 0,
  easing: "linear",
  loop: true,
});

const thirdBg = anime({
  targets: bg7,
  duration: 36000,
  top: 4000,
  easing: "linear",
  loop: true,
});

export function backgroundsAnimations() {
  firstBg.play();
  secondBg.play();
  thirdBg.play();
}

export function pauseBackgrounds() {
  fastFirstBg();
  fastSecondBg();
  fastThirdBg();
}

export function playAgain() {
  returnFirstBg();
  returnSecondBg();
  returnThirdBg();
}

export function fastClouds() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  let yStart = clouds.getBoundingClientRect().top / scale - offsetTop;

  anime({
    targets: clouds,
    duration: 16000,
    top: [yStart, 0],
    easing: "linear",
  });
}

export function returnClouds() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  let yStart = clouds.getBoundingClientRect().top / scale - offsetTop;

  anime({
    targets: clouds,
    duration: 190000,
    top: [yStart, 0],
    easing: "linear",
    // loop: true,
  });
}

export function cloudsAnim() {
  anime({
    targets: clouds,
    duration: 190000,
    top: [-29000, 0],
    easing: "linear",
    loop: true,
  });
}

export function fastEnemies() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  let yStart = enemies.getBoundingClientRect().top / scale - offsetTop;

  anime({
    targets: enemies,
    duration: 18000,
    top: [yStart, 0],
    easing: "linear",
  });
}

export function returnEnemies() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  let yStart = enemies.getBoundingClientRect().top / scale - offsetTop;

  anime({
    targets: enemies,
    duration: 150000,
    top: [yStart, 0],
    easing: "linear",
  });
}

export function enemiesAnim() {
  anime({
    targets: enemies,
    duration: 180000,
    top: [-39000, 0],
    easing: "linear",
  });
}

// export const enemiesAllMoveAnim = anime({
//   targets: ".enemies",
//   duration: 90000,
//   top: [-39000, 0],
//   easing: "linear",
// });

export function enMove() {
  anime({
    targets: ".enemies",
    duration: 6000,
    top: [-39000, -34000],
    easing: "linear",
  });
}
