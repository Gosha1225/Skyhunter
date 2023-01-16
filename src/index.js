import "../styles/reset.css";
import "../styles/global.css";
import "../styles/index.css";
import "../styles/fonts.css";
import handleResize from "./utils/resize";
import "./utils/images";
import enemyA1 from "../assets/Images/Enemy-Plane-A.png";
import enemyA2 from "../assets/Images/Enemy-Plane-A-V1.png";
import enemyAShadow from "../assets/Images/Enemy-Plane-A-Shadow.png";
import enemyB1 from "../assets/Images/Enemy-Plane-B.png";
import enemyB2 from "../assets/Images/Enemy-Plane-B-V1.png";
import enemyBShadow from "../assets/Images/Enemy-Plane-B-Shadow.png";
import { setSource } from "./utils/images";
import "./utils/url";
import { urlsSetting } from "./utils/url";
import { movePlayer, onPointerDownPlayerMove } from "./utils/playerMovement";
import createBullet from "./utils/createBullets";
import { createColumn, createWave } from "./utils/enemyCreation";
import {
  brightness,
  end1Anim,
  end2Anim,
  end2AnimBlack,
  handAnim,
  scoreLineAnim,
} from "./utils/animation";
import { createPowerUp, deathAnim } from "./utils/uponDeath";
import { cloudsAnim, enemiesAnim } from "./utils/background";
import {
  randomizeX,
  randomizeY,
  randomizeDuration,
} from "./utils/enemyCreation";
import {
  engineAudio,
  flyByAudio,
  mainAudio,
  pauseAud,
  pauseSecondaryAud,
  phoenixAudio,
  phoenixEndAudio,
  playAud,
  playSecondaryAud,
  shootAudio,
} from "./utils/audioSounds";

const isDap = false;
const wrapperContent = document.querySelector(".scalable-wrapper__content");
const playground = document.querySelector(".playground");
const player = document.querySelector(".player");
const playerCont = document.querySelector(".player-container");

let score = 0;
let enemyHit = false;
let borderHit = false;
let isPointerDown = false;
let isSuperBullet = false;
export let isPoweredUp = false;

export function scorePlus(value) {
  return score + value;
}

export function setPoweredUp() {
  !isPoweredUp ? (isPoweredUp = true) : (isPoweredUp = false);
}

export function setSuperBullet() {
  !isSuperBullet ? (isSuperBullet = true) : (isSuperBullet = false);
}

export function checkPlayerCollision(target, player) {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;

  const target_width = target.getBoundingClientRect().width / scale;
  const player_width = player.getBoundingClientRect().width / scale;

  const target_height = target.getBoundingClientRect().height / scale;
  const player_height = player.getBoundingClientRect().height / scale;

  const x_pos_target = target.getBoundingClientRect().left / scale - offsetLeft;
  const y_pos_target = target.getBoundingClientRect().top / scale - offsetTop;

  const x_pos_player = player.getBoundingClientRect().left / scale - offsetLeft;
  const y_pos_player = player.getBoundingClientRect().top / scale - offsetTop;

  const leftPos = x_pos_target - 40 + target_width >= x_pos_player;
  const rightPos = x_pos_target <= x_pos_player + player_width - 40;

  const topPos = y_pos_target + target_height - 20 >= y_pos_player;
  const bottomPos = y_pos_target <= y_pos_player + player_height;
  if (leftPos && rightPos && topPos && bottomPos) {
    if (isPoweredUp && target.classList.contains("enemy")) {
      if (target.classList.contains("A1")) {
        deathAnim(x_pos_target, y_pos_target, "A1");
      }
      if (target.classList.contains("A2")) {
        deathAnim(x_pos_target, y_pos_target, "A2");
      }
      if (target.classList.contains("B1")) {
        deathAnim(x_pos_target, y_pos_target, "B1");
      }
    }
    if (!isPoweredUp && target.classList.contains("enemy")) {
      document.querySelector(".player-container").remove();
      scoreLineAnim.pause();
      deathAnim(x_pos_player, y_pos_player, "player");
      end2AnimBlack.pause();
      end2Anim.pause();
      end1Anim();
    }
    return { collision: true, target: target };
  }
  return { collision: false, target: "" };
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

let phoenixDropped = 0;
let bulletsDropped = 0;
let canBullet = true;
let canPhoenix = true;

export function setCanBullet() {
  !canBullet ? (canBullet = true) : (canBullet = false);
}

export function setCanPhoenix() {
  !canPhoenix ? (canPhoenix = true) : (canPhoenix = false);
}

export function checkCollision(target, projectile) {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;

  const target_width = target.getBoundingClientRect().width / scale;
  const projectile_width = projectile.getBoundingClientRect().width / scale;

  const target_height = target.getBoundingClientRect().height / scale;
  const projectile_height = projectile.getBoundingClientRect().height / scale;

  const x_pos_target = target.getBoundingClientRect().left / scale - offsetLeft;
  const y_pos_target = target.getBoundingClientRect().top / scale - offsetTop;

  const x_pos_projectile =
    projectile.getBoundingClientRect().left / scale - offsetLeft;
  const y_pos_projectile =
    projectile.getBoundingClientRect().top / scale - offsetTop;

  const leftPos = x_pos_target < x_pos_projectile + projectile_width / 2;
  const rightPos =
    x_pos_target + target_width > x_pos_projectile + projectile_width / 2;

  const topPos = y_pos_target < y_pos_projectile + projectile_height / 2;
  const bottomPos = y_pos_target + target_height >= y_pos_projectile;

  if (leftPos && rightPos && topPos && bottomPos) {
    if (target.classList.contains("enemy")) {
      const { power, health, dashoffset } = target.dataset;
      if (Number(health) <= 0) {
        if (target.classList.contains("A1")) {
          deathAnim(x_pos_target, y_pos_target, "A1");
        }
        if (target.classList.contains("A2")) {
          deathAnim(x_pos_target, y_pos_target, "A2");
        }
        if (target.classList.contains("B1")) {
          deathAnim(x_pos_target, y_pos_target, "B1");
        }
        score += 367;
        document.querySelector(".score-text").innerText = score;
        if (power > 950 && phoenixDropped === 0 && canPhoenix) {
          phoenixDropped++;
          setCanBullet();
          createPowerUp("phoenix", x_pos_target, y_pos_target);
        }
        if (power > 600 && power <= 650 && bulletsDropped === 0 && canBullet) {
          setCanPhoenix();
          bulletsDropped++;
          createPowerUp("power", x_pos_target, y_pos_target);
        }
        if (power > 0 && power < 80) {
          createPowerUp("coin", x_pos_target, y_pos_target);
        }
        target.parentElement.remove();
      } else {
        if (target.classList.contains("B1")) {
          const ran = getRandomArbitrary(13, 19);
          score += 72;
          document.querySelector(".score-text").innerText = score;
          target.dataset.health = health - 40;
          target.dataset.dashoffset = Number(dashoffset) + ran;
          target.parentElement
            .querySelector("def svg circle")
            .setAttribute("stroke-dashoffset", Number(dashoffset) + ran);
        } else {
          if (target.classList.contains("A2")) {
            const ran = getRandomArbitrary(3, 8);
            score += 72;
            document.querySelector(".score-text").innerText = score;
            target.dataset.health = health - 21;
            target.dataset.dashoffset = Number(dashoffset) + ran;
            target.parentElement
              .querySelector("def svg circle")
              .setAttribute("stroke-dashoffset", Number(dashoffset) + ran);
          } else {
            const ran = getRandomArbitrary(7, 12);
            score += 72;
            document.querySelector(".score-text").innerText = score;
            target.dataset.health = health - 31;
            target.dataset.dashoffset = Number(dashoffset) + ran;
            target.parentElement
              .querySelector("def svg circle")
              .setAttribute("stroke-dashoffset", Number(dashoffset) + ran);
          }
        }
      }
    }
    return { collision: true, target: target.classList };
  }
  return { collision: false, target: "" };
}

function animate({ duration, timing, draw }) {
  return new Promise((res) => {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      // timeFraction от 0 до 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
        timeFraction = 1;
        res();
      }

      // текущее состояние анимации
      let progress = timing(timeFraction);

      draw(progress);

      if (timeFraction < 1) {
        const anim = requestAnimationFrame(animate);
      }
    });
  });
}

function moveProjectile(projectile, dur, distance, type) {
  const enemies = document.querySelectorAll(".enemy");
  const playerP = document.querySelector(".phoenix-power");
  return new Promise(async (res) => {
    const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
    const wrapperHeight = wrapperContent.getBoundingClientRect().height / scale;

    await animate({
      duration: dur / 1.5,
      timing: function linear(timeFraction) {
        return timeFraction;
      },
      draw: function (progress) {
        if (type === "bullet") {
          projectile.style.transform =
            "translateY(" + progress * distance + "px)";
          if (progress * distance === distance) {
            projectile.remove();
          }
        }

        const hitPlayer = [...enemies].reduce((acc, el) => {
          if (isPoweredUp) {
            const { collision, target } = checkPlayerCollision(el, playerP);
            if (collision) {
              acc.collision = collision;
              acc.target = target;
            }
            return acc;
          } else {
            const { collision, target } = checkPlayerCollision(el, player);
            if (collision) {
              acc.collision = collision;
              acc.target = target;
            }
            return acc;
          }
        }, {});
        const hit = [...enemies].reduce((acc, el) => {
          const { collision, target } = checkCollision(el, projectile);
          if (collision) {
            acc.collision = collision;
            acc.target = target;
          }
          return acc;
        }, {});

        if (hit.collision) {
          if (hit.target.contains("enemy")) {
            enemyHit = true;
            projectile.remove();
          }
        }
        if (hitPlayer.collision) {
          try {
            if (isPoweredUp) {
              hitPlayer.target.parentElement.remove();
              score += 367;
              document.querySelector(".score-text").innerText = score;
            } else {
              document.querySelector(".player-container").remove();
            }
          } catch (error) {}
        }
      },
    });
    res();
  });
}

function onPointerDown(event) {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  onPointerDownPlayerMove(playerCont, event.pageX / scale);
  isPointerDown = true;
}

function onPointerMove(event) {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  movePlayer(event.pageX / scale - offsetLeft);
}

function onPointerUp(event) {
  isPointerDown = false;
}

let requestId;
let frequency = 1000;
let isGameStarted = false;

function shoot(timeStamp) {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  const posX =
    player.getBoundingClientRect().left / scale +
    player.getBoundingClientRect().width / scale / 2 -
    offsetLeft;
  const posY = player.getBoundingClientRect().top / scale - offsetTop;
  // if (!isPointerDown) {
  //   if (
  //     Math.floor(timeStamp % 500) > 480 &&
  //     Math.floor(timeStamp % 500) < 520
  //   ) {
  //     createBullet(posX, posY, isSuperBullet, moveProjectile);
  //   }
  // } else {
  if (Math.floor(timeStamp % 100) > 80 && Math.floor(timeStamp % 100) < 120) {
    if (isGameStarted) {
      createBullet(posX, posY, isSuperBullet, moveProjectile);
    }
  }
  // }
  requestId = requestAnimationFrame(shoot);
}

function stopShooting() {
  cancelAnimationFrame(requestId);
}

let enemyWave;
let enemyWave1;
let enemyColumn;
let enemyColumn1;
let waveCount = 0;
let enemyWaves = [
  createW3,
  createW4,
  createC5,
  createW1,
  createW1,
  createC4,
  createW2,
  createW2,
  createC1,
  createW1,
  createC2,
  createC3,
  createC4,
];

function createW2() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  const playG = document.querySelector(".enemies");
  createWave(
    [enemyA2, enemyA2, enemyA2, enemyA2],
    [enemyAShadow, enemyAShadow, enemyAShadow, enemyAShadow],
    [94, 94, 94, 94],
    randomizeDuration(5400, 6300),
    randomizeX(),
    randomizeY(
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
      (playG.getBoundingClientRect().top / scale) * -1 - 150
    ),
    ["A2", "A2", "A2", "A2"],
    isPoweredUp
  );
}

function createW1() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  const playG = document.querySelector(".enemies");
  createWave(
    [enemyA1, enemyA1, enemyA1, enemyA1],
    [enemyAShadow, enemyAShadow, enemyAShadow, enemyAShadow],
    [40, 40, 40, 40],
    randomizeDuration(5400, 6300),
    randomizeX(),
    randomizeY(
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
      (playG.getBoundingClientRect().top / scale) * -1 - 150
    ),
    ["A1", "A1", "A1", "A1"],
    isPoweredUp
  );
}

function createW3() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  const playG = document.querySelector(".enemies");
  createWave(
    [enemyA1, enemyA1, enemyA1, enemyA1],
    [enemyAShadow, enemyAShadow, enemyAShadow, enemyAShadow],
    [40, 40, 40, 40],
    randomizeDuration(5400, 6300),
    [40, 180, 270, 410],
    [
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
      (playG.getBoundingClientRect().top / scale) * -1 - 220,
      (playG.getBoundingClientRect().top / scale) * -1 - 220,
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
    ],
    ["A1", "A1", "A1", "A1"],
    isPoweredUp
  );
}

function createW4() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  const playG = document.querySelector(".enemies");
  createWave(
    [enemyA2, enemyA2, enemyA2, enemyA2],
    [enemyAShadow, enemyAShadow, enemyAShadow, enemyAShadow],
    [94, 94, 94, 94],
    randomizeDuration(5400, 6300),
    [40, 180, 270, 410],
    [
      (playG.getBoundingClientRect().top / scale) * -1 - 220,
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
      (playG.getBoundingClientRect().top / scale) * -1 - 220,
    ],
    ["A2", "A2", "A2", "A2"],
    isPoweredUp
  );
}

function createC1() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  const playG = document.querySelector(".enemies");
  playSecondaryAud(flyByAudio);
  createColumn(
    [enemyB1, enemyB1, enemyB1],
    [enemyBShadow, enemyBShadow, enemyBShadow],
    [40, 40, 40],
    [5500, 5500, 5500],
    [150, 150, 150],
    [
      (playG.getBoundingClientRect().top / scale) * -1 - 300,
      (playG.getBoundingClientRect().top / scale) * -1 - 200,
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
    ],
    ["B1", "B1", "B1"],
    isPoweredUp
  );
  createColumn(
    [enemyB1, enemyB1, enemyB1],
    [enemyBShadow, enemyBShadow, enemyBShadow],
    [40, 40, 40],
    [5500, 5500, 5500],
    [320, 320, 320],
    [
      (playG.getBoundingClientRect().top / scale) * -1 - 300,
      (playG.getBoundingClientRect().top / scale) * -1 - 200,
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
    ],
    ["B1", "B1", "B1"],
    isPoweredUp
  );
}

function createC2() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  const playG = document.querySelector(".enemies");
  playSecondaryAud(flyByAudio);
  createColumn(
    [enemyB1, enemyB1, enemyB1],
    [enemyBShadow, enemyBShadow, enemyBShadow],
    [40, 40, 40],
    [5500, 5500, 5500],
    [420, 320, 220],
    [
      (playG.getBoundingClientRect().top / scale) * -1 - 300,
      (playG.getBoundingClientRect().top / scale) * -1 - 200,
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
    ],
    ["B1", "B1", "B1"],
    isPoweredUp
  );
  createColumn(
    [enemyB1, enemyB1, enemyB1],
    [enemyBShadow, enemyBShadow, enemyBShadow],
    [40, 40, 40],
    [5500, 5500, 5500],
    [250, 150, 50],
    [
      (playG.getBoundingClientRect().top / scale) * -1 - 300,
      (playG.getBoundingClientRect().top / scale) * -1 - 200,
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
    ],
    ["B1", "B1", "B1"],
    isPoweredUp
  );
}

function createC3() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  const playG = document.querySelector(".enemies");
  playSecondaryAud(flyByAudio);
  createColumn(
    [enemyB1, enemyB1, enemyB1],
    [enemyBShadow, enemyBShadow, enemyBShadow],
    [40, 40, 40],
    [5500, 5500, 5500],
    [220, 320, 420],
    [
      (playG.getBoundingClientRect().top / scale) * -1 - 300,
      (playG.getBoundingClientRect().top / scale) * -1 - 200,
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
    ],
    ["B1", "B1", "B1"],
    isPoweredUp
  );
  createColumn(
    [enemyB1, enemyB1, enemyB1],
    [enemyBShadow, enemyBShadow, enemyBShadow],
    [40, 40, 40],
    [5500, 5500, 5500],
    [50, 150, 250],
    [
      (playG.getBoundingClientRect().top / scale) * -1 - 300,
      (playG.getBoundingClientRect().top / scale) * -1 - 200,
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
    ],
    ["B1", "B1", "B1"],
    isPoweredUp
  );
}

function createC4() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  const playG = document.querySelector(".enemies");
  playSecondaryAud(flyByAudio);
  createColumn(
    [enemyB1, enemyB1, enemyB1],
    [enemyBShadow, enemyBShadow, enemyBShadow],
    [40, 40, 40],
    [5500, 5500, 5500],
    [235, 145, 325],
    [
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
      (playG.getBoundingClientRect().top / scale) * -1 - 150,
      (playG.getBoundingClientRect().top / scale) * -1 - 150,
    ],
    ["B1", "B1", "B1"],
    isPoweredUp
  );
  createColumn(
    [enemyB1, enemyB1, enemyB1],
    [enemyBShadow, enemyBShadow, enemyBShadow],
    [40, 40, 40],
    [5000, 5500, 5500],
    [235, 60, 410],
    [
      (playG.getBoundingClientRect().top / scale) * -1 - 300,
      (playG.getBoundingClientRect().top / scale) * -1 - 220,
      (playG.getBoundingClientRect().top / scale) * -1 - 220,
    ],
    ["B1", "B1", "B1"],
    isPoweredUp
  );
}

function createC5() {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  const playG = document.querySelector(".enemies");
  playSecondaryAud(flyByAudio);
  createColumn(
    [enemyB1, enemyB1, enemyB1],
    [enemyBShadow, enemyBShadow, enemyBShadow],
    [40, 40, 40],
    [5500, 5500, 5500],
    [145, 145, 145],
    [
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
      (playG.getBoundingClientRect().top / scale) * -1 - 170,
      (playG.getBoundingClientRect().top / scale) * -1 - 240,
    ],
    ["B1", "B1", "B1"],
    isPoweredUp
  );
  createColumn(
    [enemyB1, enemyB1, enemyB1],
    [enemyBShadow, enemyBShadow, enemyBShadow],
    [40, 40, 40],
    [5000, 5000, 5000],
    [235, 235, 235],
    [
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
      (playG.getBoundingClientRect().top / scale) * -1 - 170,
      (playG.getBoundingClientRect().top / scale) * -1 - 240,
    ],
    ["B1", "B1", "B1"],
    isPoweredUp
  );
  createColumn(
    [enemyB1, enemyB1, enemyB1],
    [enemyBShadow, enemyBShadow, enemyBShadow],
    [40, 40, 40],
    [5500, 5500, 5500],
    [325, 325, 325],
    [
      (playG.getBoundingClientRect().top / scale) * -1 - 100,
      (playG.getBoundingClientRect().top / scale) * -1 - 170,
      (playG.getBoundingClientRect().top / scale) * -1 - 240,
    ],
    ["B1", "B1", "B1"],
    isPoweredUp
  );
}

export function endGame() {
  stopShooting();
  pauseAud(shootAudio);
  try {
    clearInterval(enemyWave);
    enemyWave = null;
  } catch (error) {}
  try {
    clearInterval(enemyWave1);
    enemyWave1 = null;
  } catch (error) {}
}

function createWaves() {
  enemyWaves[waveCount]();
  waveCount++;
  enemyWave = setInterval(() => {
    if (isPoweredUp) {
      clearInterval(enemyWave);
      enemyWave = null;
      enemyWave1 = setInterval(() => {
        if (!isPoweredUp) {
          clearInterval(enemyWave1);
          enemyWave1 = null;
          enemyWave = setInterval(() => {
            if (waveCount <= enemyWaves.length - 1) {
              enemyWaves[waveCount]();
              waveCount++;
            } else {
              waveCount = 0;
              enemyWaves[waveCount]();
            }
          }, 1300);
        } else {
          if (waveCount <= enemyWaves.length - 1) {
            enemyWaves[waveCount]();
            waveCount++;
          } else {
            waveCount = 0;
            enemyWaves[waveCount]();
          }
        }
      }, 350);
    } else {
      if (waveCount <= enemyWaves.length - 1) {
        enemyWaves[waveCount]();
        waveCount++;
      } else {
        waveCount = 0;
        enemyWaves[waveCount]();
      }
    }
  }, 2000);
}

function calcAngleDegrees(x, y) {
  return (Math.atan2(y, x) * 180) / Math.PI;
}
let downX, downY;
let moveX, moveY;
let difX, difY;
let degree;

function onPointerDownStart(event) {
  downX = event.pageX;
  downY = event.pageY;
}

function onPointerMoveStart(event) {
  moveX = event.pageX;
  moveY = event.pageY;

  difX = moveX - downX;
  difY = moveY - downY;

  degree = calcAngleDegrees(difX, difY);
}

async function onPointerUpStart(event) {
  isGameStarted = true;
  document.querySelector(".swipe").remove();
  document.querySelector(".slide").remove();
  document.querySelector(".hand").remove();
  document.removeEventListener("pointerdown", onPointerDownStart);
  document.removeEventListener("pointermove", onPointerMoveStart);
  document.removeEventListener("pointerup", onPointerUpStart);
  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
  createWaves();
  scoreLineAnim.play();
  playAud(mainAudio);
  playAud(shootAudio);
  playAud(engineAudio);
  // enemiesAnim();
}
function startEvents(event) {
  document.removeEventListener("pointerdown");
}

function startApp() {
  window.addEventListener("load", (event) => {
    handleResize();
    handAnim();
    cloudsAnim();
    shoot();
    end2Anim.play();
    end2AnimBlack.play();
  });
  window.visualViewport.addEventListener("resize", (e) => {
    handleResize();
  });

  document
    .querySelector(".endcard1")
    .addEventListener("pointerdown", urlsSetting);
  document
    .querySelector(".endcard2")
    .addEventListener("pointerdown", urlsSetting);
  document.addEventListener("pointerdown", onPointerDownStart);
  document.addEventListener("pointermove", onPointerMoveStart);
  document.addEventListener("pointerup", onPointerUpStart);
}

startApp();

// if (mraid.getState() === "loading") {
//   // If the SDK is still loading, add a listener for the 'ready' event:
//   mraid.addEventListener("ready", onSdkReady);
// } else {
//   // Otherwise, if the SDK is ready, execute your function:
//   onSdkReady();
// }

// // Implement a function that shows the ad when it first renders:
// function onSdkReady() {
//   // The viewableChange event fires if the ad container's viewability status changes.
//   // Add a listener for the viewabilityChange event, to handle pausing and resuming:
//   mraid.addEventListener("viewableChange", viewableChangeHandler);
//   // The isViewable method returns whether the ad container is viewable on the screen.
//   if (mraid.isViewable()) {
//     try {
//       mraid?.getMaxSize();
//       mraid?.getState();
//     } catch (e) {}
//     // If the ad container is visible, play the ad:
//     showMyAd();
//   }
// }

// // Implement a function for executing the ad:
// function showMyAd() {
//   // Insert code for showing your playable ad.
//   startApp();
// }

// // Implement a function that handles pausing and resuming the ad based on visibility:
// function viewableChangeHandler(viewable) {
//   if (viewable) {
//     // If the ad is viewable, show the ad:
//     showMyAd();
//   } else {
//     // If not, pause the ad.
//   }
// }

//IRONSOURCE
// window.onload = function () {
//   dapi.isReady()
//     ? onReadyCallback()
//     : dapi.addEventListener("ready", onReadyCallback);
//   //here you can put other code that not related to dapi logic
// };

// function onReadyCallback() {
//   //no need to listen to this event anymore
//   dapi.removeEventListener("ready", onReadyCallback);
//   let isAudioEnabled = !!dapi.getAudioVolume();

//   if (dapi.isViewable()) {
//     adVisibleCallback({ isViewable: true });
//   }
//   dapi.isViewable() ? startGame() : false;

//   dapi.addEventListener("viewableChange", adVisibleCallback);
//   dapi.addEventListener("adResized", adResizeCallback);
//   dapi.addEventListener("audioVolumeChange", audioVolumeChangeCallback);
// }

// try {
//   mraid?.getMaxSize();
//   mraid?.getState();
// } catch (e) {}

// function startGame() {
//   var screenSize = dapi.getScreenSize();
//   startApp();
// }

// function userClickedDownloadButton() {
//   setUrls();
// }

// function adVisibleCallback(event) {
//   console.log("isViewable " + event.isViewable);
//   if (event.isViewable) {
//     const screenSize = dapi.getScreenSize();
//     //START or RESUME the ad
//   } else {
//     //PAUSE the ad and MUTE sounds
//   }
// }

// function adResizeCallback(event) {
//   const screenSize = event;
//   console.log(
//     "ad was resized width " + event.width + " height " + event.height
//   );
//   handleResize();
// }

// function audioVolumeChangeCallback(volume) {
//   let isAudioEnabled = !!volume;

//   if (volume >= 0) {
//     console.log(volume);
//   }

//   if (isAudioEnabled) {
//     //START or turn on the sound
//   } else {
//     //PAUSE the turn off the sound
//   }
// }
