import anime from "animejs";
import { endGame } from "..";

const wrapperContent = document.querySelector(".scalable-wrapper__content");

export function powerAnimation(target, dur) {
  anime({
    targets: target,
    duration: dur,
    left: "230px",
    easing: "linear",
  });
}

export function objectMoveForward(target, duration) {
  anime({
    targets: target,
    duration: duration,
    top: "1080px",
    easing: "linear",
  });
}

export function fastEnemy(target, duration) {
  anime({
    targets: target,
    duration: 2000,
    left: "280px",
    direction: "alternate",
    easing: "linear",
    loop: true,
  });
  anime({
    targets: target,
    duration: duration,
    top: "1080px",
    easing: "linear",
  });
}

export const scoreLineAnim = anime({
  targets: ".current-score svg rect",
  width: 507,
  duration: 30000,
  easing: "linear",
});

export function end1Anim() {
  anime({
    targets: ".black-screen",
    delay: 500,
    complete: () => {
      endGame();
      document.querySelectorAll(".enemy").forEach((el) => {
        el.parentElement.remove();
      });
    },
    opacity: [0, 0.7],
    duration: 800,
    easing: "linear",
  });
  anime({
    targets: ".endcard1",
    delay: 500,
    scale: 1,
    duration: 800,
    easing: "linear",
  });
}

export const end2Anim = anime({
  targets: ".endcard2",
  delay: 30000,
  complete: () => {
    endGame();
    document.querySelectorAll(".enemy").forEach((el) => {
      el.parentElement.remove();
    });
  },
  scale: 1,
  duration: 800,
  easing: "linear",
});

export const end2AnimBlack = anime({
  targets: ".black-screen",
  delay: 30000,
  opacity: [0, 0.7],
  duration: 800,
  easing: "linear",
});

export function bubbleAnim(target) {
  anime({
    targets: target,
    duration: 800,
    scale: [0, 1],
    easing: "easeOutBounce",
    loop: true,
  });
}

export function explosionFade(target, text) {
  anime({
    targets: target,
    complete: () => {
      target.src = "";
      target.remove();
    },
    duration: 300,
    opacity: 1,
    easing: "linear",
  });
  anime({
    targets: text,
    complete: () => {
      text.remove();
    },
    duration: 700,
    opacity: 0,
    easing: "linear",
  });
}

export const brightness = anime({
  targets: ".player-container .phoenix-power",
  duration: 700,
  filter: ["brightness(1)", "brightness(10)"],
  direction: "alternate",
  loop: true,
  easing: "linear",
});

export function fastBright(target) {
  anime({
    targets: target,
    duration: 320,
    filter: ["brightness(1)", "brightness(1.5)"],
    direction: "alternate",
    loop: true,
    easing: "linear",
  });
}

export function coinAnim() {
  const stars = document.querySelectorAll(".star");
  anime({
    targets: stars,
    complete: () => {
      stars.forEach((el) => {
        el.style.opacity = 1;
        document.querySelector(".stars").classList.add("hidden");
      });
    },
    delay: 500,
    duration: 2500,
    opacity: [1, 0],
  });
  anime({
    targets: ".star1",
    duration: 3000,
    complete: () => {
      document.querySelector(".star1").style.transform = "translateY(0)";
    },
    translateY: 200,
  });
  anime({
    targets: ".star2",
    duration: 3000,
    complete: () => {
      document.querySelector(".star2").style.transform = "translateY(0)";
      document.querySelector(".star2").style.transform = "translateX(0)";
    },
    translateY: [0, 150],
    translateX: [0, 150],
  });
  anime({
    targets: ".star3",
    duration: 3000,
    complete: () => {
      document.querySelector(".star3").style.transform = "translateX(0)";
    },
    translateX: [0, 200],
  });
  anime({
    targets: ".star4",
    duration: 3000,
    complete: () => {
      document.querySelector(".star4").style.transform = "translateY(0)";
      document.querySelector(".star4").style.transform = "translateX(0)";
    },
    translateY: [0, -150],
    translateX: [0, 150],
  });
  anime({
    targets: ".star5",
    duration: 3000,
    complete: () => {
      document.querySelector(".star5").style.transform = "translateY(0)";
      document.querySelector(".star5").style.transform = "translateX(0)";
    },
    translateY: [0, 150],
    translateX: [0, -150],
  });
  anime({
    targets: ".star6",
    duration: 3000,
    complete: () => {
      document.querySelector(".star6").style.transform = "translateY(0)";
      document.querySelector(".star6").style.transform = "translateX(0)";
    },
    translateY: [0, -150],
    translateX: [0, -150],
  });
  anime({
    targets: ".star7",
    duration: 3000,
    complete: () => {
      document.querySelector(".star7").style.transform = "translateY(0)";
    },
    translateY: [0, -200],
  });
  anime({
    targets: ".star8",
    duration: 3000,
    complete: () => {
      document.querySelector(".star8").style.transform = "translateX(0)";
    },
    translateX: [0, -200],
  });
}

export function handAnim() {
  anime({
    targets: ".hand",
    duration: 1500,
    translateX: 250,
    direction: "alternate",
    easing: "easeInOutSine",
    loop: true,
  });
}
