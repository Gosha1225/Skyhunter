import anime from "animejs";

export function finalActionScreenAnimation() {
  return new Promise((res) => {
    anime({
      targets: ".screen",
      complete: res,
      top: "0px",
      duration: 900,
      delay: 2300,
      easing: "easeInOutQuart",
    });
  });
}

export function handAnimation() {
  anime({
    targets: ".hand",
    top: "-70px",
    duration: 1500,
    delay: 500,
    loop: true,
    easing: "easeOutQuint",
  });
}

export const finalScreenAnimation = anime({
  targets: ".screen",
  top: "0px",
  duration: 900,
  delay: 15000,
  autoplay: false,
  easing: "easeInOutQuart",
});

export function downloadBtnAnimation() {
  anime({
    targets: ".download",
    scale: [
      { value: 1 },
      { value: 1.05, duration: 2000 },
      { value: 1, duration: 2000 },
    ],
    loop: true,
    easing: "linear",
  });
}

export function iconsAnimation() {
  anime({
    targets: ".icons",
    top: "563px",
    duration: 900,
    easing: "easeOutQuart",
  });
}

export function iconsDownAnimation() {
  return new Promise((res) => {
    anime({
      targets: ".icons",
      complete: res,
      top: "920px",
      duration: 900,
      easing: "easeOutQuart",
    });
  });
}

export function sliderAnimation() {
  anime({
    targets: ".slider",
    top: "613px",
    duration: 900,
    easing: "easeOutQuart",
  });
}

export function sliderDownAnimation() {
  return new Promise((res) => {
    anime({
      targets: ".slider",
      complete: res,
      top: "960px",
      duration: 900,
      easing: "easeOutQuart",
    });
  });
}

export function goldTextAnimation() {
  anime({
    targets: ".gold-text",
    innerHTML: [500, 150],
    easing: "linear",
    round: 10, // Will round the animated value to 1 decimal
  });
}

export function scaleAnimation() {
  anime({
    targets: ".coin",
    scale: [
      { value: 0, duration: 500 },
      { value: 1, duration: 500 },
    ],
  });
}

export function summonBtnAnimation() {
  return new Promise((res) => {
    anime({
      targets: ".summon-btn",
      complete: res,
      scale: [
        { value: 1, duration: 80 },
        { value: 0.8, duration: 80 },
        { value: 1, duration: 80 },
      ],
      easing: "linear",
    });
  });
}

export function firstIconAnimation() {
  return new Promise((res) => {
    anime({
      targets: ".icon1",
      complete: res,
      scale: [
        { value: 0.35, duration: 80 },
        { value: 0.32, duration: 80 },
        { value: 0.35, duration: 80 },
      ],
      easing: "linear",
    });
  });
}

export function platformAnimation() {
  anime({
    targets: ".platform",
    duration: 800,
    scale: 1.1,
    direction: "alternate",
    loop: true,
    easing: "linear",
  });
}

export function arrowAnimation() {
  anime({
    targets: ".arrow-container",
    duration: 1000,
    top: "470px",
    direction: "alternate",
    loop: true,
    easing: "linear",
  });
}

export function chooseAnimation(target) {
  return new Promise((res) => {
    anime({
      targets: target,
      complete: res,
      scale: [
        { value: 1, duration: 80 },
        { value: 0.8, duration: 80 },
        { value: 1, duration: 80 },
      ],
      easing: "linear",
    });
  });
}

export function opacityAnimation(target) {
  anime({
    targets: target,
    opacity: [
      { value: 0, duration: 200 },
      { value: 1, duration: 200 },
    ],
    easing: "linear",
  });
}

export function armyFromAnimation() {
  return new Promise((res) =>
    anime({
      targets: ".army-from",
      complete: res,
      top: 524,
      left: 192,
      duration: 700,
      easing: "linear",
    })
  );
}

export function armyToAnimation() {
  return new Promise((res) =>
    anime({
      targets: ".army-to",
      complete: res,
      top: 314,
      left: 157,
      duration: 1700,
      easing: "linear",
    })
  );
}

export function greenBarrackAnimation() {
  return new Promise((res) => {
    anime({
      targets: ".clickbarrack",
      complete: res,
      scale: 0.44,
      duration: 150,
      easing: "linear",
    });
  });
}

export function barrackAnimation() {
  return new Promise((res) => {
    anime({
      targets: ".barrack",
      complete: res,
      scale: 1,
      duration: 400,
    });
  });
}

export function healthBarAnimation() {
  return new Promise((res) => {
    anime({
      targets: ".health",
      complete: res,
      width: [
        { delay: 200, value: "100%", duration: 0 },
        { value: "75%", duration: 350 },
        { delay: 200, value: "75%", duration: 250 },
        { value: "50%", duration: 350 },
        { delay: 200, value: "50%", duration: 250 },
        { value: "25%", duration: 350 },
        { delay: 200, value: "25%", duration: 250 },
        { value: "0%", duration: 0 },
      ],
      easing: "linear",
    });
  });
}
