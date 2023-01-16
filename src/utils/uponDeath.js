import powerUp from "../../assets/Images/Pickup-PowerShot.png";
import phoenix from "../../assets/Images/Pickup-Phoenix.png";
import coinPick from "../../assets/Images/Coin.png";
import explode from "../../assets/Images/PlaneChunksA-V1.png";
import explodeB1 from "../../assets/Images/PlaneChunksB.gif";
import explodeA2 from "../../assets/Images/PlaneChunksA-V1.gif";
import star from "../../assets/Images/Warning-Missile-Back.png";
import playerExplode from "../../assets/Images/PlayerDeath.gif";
import planeCrash from "../../assets/Images/PlaneChunksA.gif";
import { setSource } from "./images";
import {
  brightness,
  bubbleAnim,
  coinAnim,
  explosionFade,
  fastBright,
  objectMoveForward,
  powerAnimation,
} from "./animation";
import {
  basicInterval,
  setBasic,
  setIdle,
  setSuperBulletFalse,
  setSuperBulletTrue,
  setSuper,
  setPoweredUp,
  checkPlayerCollision,
  setSuperBullet,
  scorePlus,
  setCanPhoenix,
  setCanBullet,
} from "..";
import {
  backgroundsAnimations,
  cloudsAnim,
  enemiesAllMoveAnim,
  enemiesAnim,
  enMove,
  fastClouds,
  fastEnemies,
  pauseBackgrounds,
  playAgain,
  returnClouds,
  returnEnemies,
} from "./background";
import { createWaves } from "./enemyCreation";
import {
  coinAudPlay,
  enemyExplosionPlay,
  pauseSecondaryAud,
  phoenixAudio,
  phoenixEndAudio,
  playerExplosionPlay,
  playSecondaryAud,
  superBulletAudPlay,
} from "./audioSounds";

const wrapperContent = document.querySelector(".scalable-wrapper__content");
const playGround = document.querySelector(".playground");

let phoenixDropped = 0;
let bulletsDropped = 0;
let coinsDropped = 0;
let powerBullets = false;

function checkCollision(target, projectile) {
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

  const leftPos = x_pos_target + target_width >= x_pos_projectile;
  const rightPos = x_pos_target <= x_pos_projectile + projectile_width;

  const topPos = y_pos_target + target_height - 20 >= y_pos_projectile;
  const bottomPos = y_pos_target <= y_pos_projectile + projectile_height;

  if (leftPos && rightPos && topPos && bottomPos) {
    if (target.classList.contains("A1")) {
      deathAnim(x_pos_target, y_pos_target, "A1");
    }
    if (target.classList.contains("A2")) {
      deathAnim(x_pos_target, y_pos_target, "A2");
    }
    if (target.classList.contains("B1")) {
      deathAnim(x_pos_target, y_pos_target, "B1");
    }
    return { collision: true, target: target };
  }
  return { collision: false, target: "" };
}

function checkPowerCollision(target, projectile) {
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

  const leftPos = x_pos_target + target_width >= x_pos_projectile;
  const rightPos = x_pos_target <= x_pos_projectile + projectile_width;

  const topPos = y_pos_target + target_height >= y_pos_projectile;
  const bottomPos = y_pos_target <= y_pos_projectile + projectile_height;

  if (leftPos && rightPos && topPos && bottomPos) {
    return { collision: true, target: target };
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
        // if (enemyHit) {
        //   cancelAnimationFrame(anim);
        //   res();
        // }

        // if (borderHit) {
        //   cancelAnimationFrame(anim);
        //   res();
        // }
      }
    });
  });
}
function moveProjectile(projectile) {
  const enemies = document.querySelectorAll(".enemy");
  return new Promise(async (res) => {
    const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
    const wrapperHeight = wrapperContent.getBoundingClientRect().height / scale;

    await animate({
      duration: 750,
      timing: function linear(timeFraction) {
        return timeFraction;
      },
      draw: function (progress) {
        projectile.style.transform = "translateY(" + progress * -800 + "px)";

        const hit = [...enemies].reduce((acc, el) => {
          const { collision, target } = checkCollision(el, projectile);
          if (collision) {
            acc.collision = collision;
            acc.target = target;
          }
          return acc;
        }, {});
        if (progress * -800 === -800) {
          projectile.remove();
          pauseSecondaryAud(phoenixEndAudio);
        }
        if (hit.collision) {
          if (hit.target.classList.contains("enemy")) {
            hit.target.parentElement.remove();
            document.querySelector(".score-text").innerText = scorePlus(367);
          }
        }
      },
    });
    res();
  });
}

function movePowerUp(target, dur) {
  const powerups = document.querySelectorAll(".powerup");
  const player = document.querySelector(".player");
  return new Promise(async (res) => {
    const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
    const wrapperHeight = wrapperContent.getBoundingClientRect().height / scale;

    await animate({
      duration: dur,
      timing: function back(timeFraction) {
        return Math.pow(timeFraction, 2) * ((1.5 + 1) * timeFraction - 1.5);
      },
      draw: function (progress) {
        target.style.transform = "translateY(" + progress * 1080 + "px)";

        const hit = [...powerups].reduce((acc, el) => {
          const { collision, target } = checkPowerCollision(el, player);
          if (collision) {
            acc.collision = collision;
            acc.target = target;
          }
          return acc;
        }, {});
        if (hit.collision) {
          target.remove();
          if (target.classList.contains("bullet")) {
            setSuperBullet();
            superBulletAudPlay();
            document.querySelectorAll(".star").forEach((el) => {
              el.style.filter = "hue-rotate(77deg)";
            });
            createStars();
            setTimeout(() => {
              setSuperBullet();
              setCanPhoenix();
            }, 7000);
          }
          if (target.classList.contains("phoenix")) {
            document.querySelector(".phoenix-power").classList.remove("hidden");
            brightness.play();
            setPoweredUp();
            enMove();
            fastClouds();
            pauseBackgrounds();
            playSecondaryAud(phoenixAudio);
            setTimeout(() => {
              setCanBullet();
              setPoweredUp();
              pauseSecondaryAud(phoenixAudio);
              playSecondaryAud(phoenixEndAudio);
              brightness.pause();
              playAgain();
              cloudsAnim();
              const phoeny = document.querySelector(".phoenix-power");
              const y = phoeny.getBoundingClientRect().top / scale - offsetTop;
              const x =
                phoeny.getBoundingClientRect().left / scale - offsetLeft;
              playGround.append(phoeny);
              phoeny.style.position = "absolute";
              phoeny.style.top = y + "px";
              phoeny.style.left = x + "px";
              phoeny.style.width = "40%";
              moveProjectile(phoeny);
            }, 6000);
          }
          if (target.classList.contains("coin")) {
            coinAudPlay();
            document.querySelectorAll(".star").forEach((el) => {
              el.style.filter = "hue-rotate(0deg)";
            });
            createStars();
          }
        }
      },
    });
    res();
  });
}

export function createStars() {
  document.querySelector(".stars").classList.remove("hidden");
  const player = document.querySelector(".player");
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  const posX = player.getBoundingClientRect().left / scale - offsetLeft;
  const posY = player.getBoundingClientRect().top / scale - offsetTop;

  document.querySelectorAll(".star").forEach((el) => {
    el.style.top = `${posY}px`;
    el.style.left = `${posX}px`;
  });
  coinAnim();
}

export function createPowerUp(type, posX, posY) {
  const playground = document.querySelector(".playground");

  if (type === "phoenix" && phoenixDropped === 0) {
    phoenixDropped++;
    const invincible = document.createElement("img");

    setSource(invincible, phoenix);
    invincible.classList.add("powerup");
    invincible.classList.add("phoenix");
    invincible.style.position = "absolute";
    invincible.style.width = "15%";
    invincible.style.top = `${posY}px`;
    invincible.style.left = `${posX}px`;

    playground.append(invincible);

    movePowerUp(invincible, 2400);
    powerAnimation(invincible, 2400);
    fastBright(invincible);
  }
  if (type === "power" && bulletsDropped === 0) {
    bulletsDropped++;
    const power = document.createElement("img");

    setSource(power, powerUp);

    power.classList.add("powerup");
    power.classList.add("bullet");
    power.style.position = "absolute";
    power.style.width = "10%";
    power.style.top = `${posY}px`;
    power.style.left = `${posX}px`;

    playground.append(power);

    movePowerUp(power, 2400);
    powerAnimation(power, 2400);
    fastBright(power);
  }

  if (type === "coin") {
    coinsDropped++;
    const coin = document.createElement("img");

    setSource(coin, coinPick);

    coin.classList.add("powerup");
    coin.classList.add("coin");
    coin.style.position = "absolute";
    coin.style.width = "6%";
    coin.style.top = `${posY}px`;
    coin.style.left = `${posX}px`;

    playground.append(coin);

    movePowerUp(coin, 2400);
    powerAnimation(coin, 2400);
    fastBright(coin);
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function deathAnim(x, y, type) {
  let explosion = new Image();
  const text = document.createElement("p");
  text.style.position = "absolute";
  text.style.top = y + 20 + "px";
  text.style.webkitTextStroke = "1px rgb(255, 255, 255)";
  text.style.color = "red";
  text.innerText = Math.floor(getRandomArbitrary(310, 390));
  text.style.opacity = 1;
  text.style.fontSize = "40pt";
  text.style.left = x + "px";
  text.style.width = "20%";
  text.style.fontFamily = "proxima";
  text.style.zIndex = 9;

  explosion.style.position = "absolute";
  explosion.style.top = y - 5 + "px";
  explosion.style.left = x - 25 + "px";
  explosion.style.width = "30%";
  explosion.style.opacity = 1;
  explosion.style.zIndex = 8;

  wrapperContent.append(explosion);
  if (type === "A1") {
    enemyExplosionPlay();
    setSource(explosion, planeCrash);
    wrapperContent.append(text);
  }
  if (type === "A2") {
    enemyExplosionPlay();
    setSource(explosion, explodeA2);
    wrapperContent.append(text);
  }
  if (type === "B1") {
    enemyExplosionPlay();
    explosion.style.left = x - 45 + "px";
    setSource(explosion, explodeB1);
    wrapperContent.append(text);
  }
  if (type === "player") {
    playerExplosionPlay();
    explosion.style.left = x + "px";
    explosion.style.top = y + "px";
    setSource(explosion, playerExplode);
  }
  explosionFade(explosion, text);
  bubbleAnim(text);
}
