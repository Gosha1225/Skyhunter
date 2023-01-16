import enemyA1 from "../../assets/Images/Enemy-Plane-A.png";
import enemyA2 from "../../assets/Images/Enemy-Plane-A-V1.png";
import enemyAShadow from "../../assets/Images/Enemy-Plane-A-Shadow.png";
import enemyB1 from "../../assets/Images/Enemy-Plane-B.png";
import enemyB2 from "../../assets/Images/Enemy-Plane-B-V1.png";
import enemyBShadow from "../../assets/Images/Enemy-Plane-B-Shadow.png";
import enemyStroke from "../../assets/Images/Enemy-Plane-AWhite.png";
import propA from "../../assets/Images/prop_enemyA.gif";
import propB from "../../assets/Images/prop_enemyB.gif";
import { setSource } from "./images";
import anime from "animejs";
import { flyByAudio, pauseSecondaryAud, playSecondaryAud } from "./audioSounds";
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
const wrapperContent = document.querySelector(".scalable-wrapper__content");

export function enemyMovement(target, dur) {
  let dist = 1700;
  if (target.classList.contains("B1")) {
    dist = 19000;
  }
  anime({
    targets: target,
    complete: () => {
      pauseSecondaryAud(flyByAudio);
      target.remove();
    },
    duration: dur,
    translateY: dist,
    easing: "linear",
  });
}

export function enemyMovementB(target) {
  anime({
    targets: target,
    duration: 1500,
    translateX: 150,
    direction: "alternate",
    easing: "easeInOutSine",
    loop: true,
  });
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

function moveProjectileB(projectile, dur, distance, type) {
  const enemies = document.querySelectorAll(".enemy");
  return new Promise(async (res) => {
    const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
    const wrapperHeight = wrapperContent.getBoundingClientRect().height / scale;

    await animate({
      duration: dur,
      timing: function linear(timeFraction) {
        return timeFraction;
      },
      draw: function (progress) {
        if (type === "B1") {
          projectile.style.transform =
            "translateY(" + progress * distance + "px)";
          if (progress * distance === distance) {
            projectile.remove();
          }
        }
      },
    });
    res();
  });
}

function createEnemy(
  enemyImg,
  shadowImg,
  startX,
  startY,
  healthPoints,
  duration,
  enemyType,
  isPower
) {
  const enemies = document.querySelector(".enemies");

  const enemyCont = document.createElement("div");
  const enemy = document.createElement("img");
  const enemyStr = document.createElement("img");
  const enemy_shadow = document.createElement("img");
  const prop = document.createElement("img");
  const def = document.createElement("def");

  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var svgNS = svg.namespaceURI;

  var circle = document.createElementNS(svgNS, "circle");

  enemyCont.style.position = "absolute";
  enemyCont.style.width = "17%";
  enemyCont.style.top = `${startY}px`;
  enemyCont.style.left = `${startX}px`;

  def.style.position = "absolute";
  def.style.width = "100%";
  def.style.height = "100px";
  def.style.zIndex = 3;

  svg.setAttribute("height", 100);
  svg.setAttribute("width", 100);

  circle.setAttribute("cx", 50);
  circle.setAttribute("cy", 50);
  circle.setAttribute("r", 5);
  circle.setAttribute("stroke-width", 10);
  circle.setAttribute("fill", "none");
  circle.setAttribute("stroke", "aqua");
  circle.setAttribute("stroke-dasharray", 31.4);
  circle.setAttribute("stroke-dashoffset", 0);
  svg.appendChild(circle);

  enemyStr.style.height = "70px";
  enemyStr.style.left = "-2px";
  enemyStr.style.top = "-1px";
  enemyStr.style.zIndex = 1;

  enemy.classList.add("enemy");
  enemy.classList.add(enemyType);
  enemy.style.width = "100%";
  enemy.style.height = "70px";
  enemy.style.zIndex = 2;
  enemy.dataset.health = healthPoints;
  enemy.dataset.dashoffset = 0;
  enemy.dataset.power = Math.round(getRandomArbitrary(0, 1000));

  enemy_shadow.classList.add("enemy-shadow");
  enemy_shadow.style.position = "absolute";
  enemy_shadow.style.width = "50%";
  enemy_shadow.style.top = "-23px";
  enemy_shadow.style.left = "-18px";
  enemy_shadow.style.opacity = 0.5;
  enemy_shadow.style.zIndex = 1;

  prop.classList.add("prop");
  prop.style.position = "absolute";
  prop.style.width = "50%";
  prop.style.top = "55px";
  prop.style.left = "23px";

  setSource(enemy, enemyImg);
  setSource(enemy_shadow, shadowImg);
  setSource(enemyStr, enemyStroke);

  def.append(svg);
  enemyCont.append(enemy);
  enemyCont.append(enemyStr);
  enemyCont.append(enemy_shadow);
  enemyCont.append(def);
  enemyCont.append(prop);
  enemies.append(enemyCont);

  if (enemyType === "A1" || enemyType === "A2") {
    setSource(prop, propA);
    enemyStr.style.width = "104%";
    def.style.top = "-26px";
    def.style.left = "-4px";
    if (isPower) {
      enemyMovement(enemyCont, duration / 2);
    } else {
      enemyMovement(enemyCont, duration);
    }
  }

  if (enemyType === "B1") {
    enemyStr.style.top = "0.5px";
    enemyStr.style.left = "-0.5px";
    enemy.style.height = "53px";
    setSource(prop, propB);
    enemyStr.style.width = "102.3%";
    enemyStr.style.height = "54px";
    enemyCont.style.position = "absolute";
    enemyCont.style.width = "12%";
    enemyCont.style.top = `${startY}px`;
    enemyCont.style.left = `${startX}px`;
    def.style.top = "-18px";
    def.style.left = "-18.5px";
    prop.style.width = "70%";
    prop.style.left = "9px";
    prop.style.top = "38px";
    enemy_shadow.style.top = "-17px";
    if (isPower) {
      enemyMovement(enemyCont, duration / 2);
      // enemyMovementB(enemyCont);
    } else {
      enemyMovement(enemyCont, duration);
      // enemyMovementB(enemyCont);
    }
  }
}

export function randomizeX() {
  return [
    getRandomArbitrary(30, 60),
    getRandomArbitrary(128, 168),
    getRandomArbitrary(236, 276),
    getRandomArbitrary(344, 384),
  ];
}

export function randomizeY(min, max) {
  return [
    getRandomArbitrary(min, max),
    getRandomArbitrary(min, max),
    getRandomArbitrary(min, max),
    getRandomArbitrary(min, max),
  ];
}

export function randomizeDuration(min, max) {
  return [
    getRandomArbitrary(min, max),
    getRandomArbitrary(min, max),
    getRandomArbitrary(min, max),
    getRandomArbitrary(min, max),
  ];
}

export function createWave(
  enemies,
  shadows,
  health,
  duration,
  locationX,
  locationY,
  types,
  isPoweredUp
) {
  createEnemy(
    enemies[0],
    shadows[0],
    locationX[0],
    locationY[0],
    health[0],
    duration[0],
    types[0],
    isPoweredUp
  );
  createEnemy(
    enemies[1],
    shadows[1],
    locationX[1],
    locationY[1],
    health[1],
    duration[1],
    types[1],
    isPoweredUp
  );
  createEnemy(
    enemies[2],
    shadows[2],
    locationX[2],
    locationY[2],
    health[2],
    duration[2],
    types[2],
    isPoweredUp
  );
  createEnemy(
    enemies[3],
    shadows[3],
    locationX[3],
    locationY[3],
    health[3],
    duration[3],
    types[3],
    isPoweredUp
  );
}

export function createColumn(
  enemies,
  shadows,
  health,
  duration,
  locationX,
  locationY,
  types,
  isPoweredUp
) {
  createEnemy(
    enemies[0],
    shadows[0],
    locationX[0],
    locationY[0],
    health[0],
    duration[0],
    types[0],
    isPoweredUp
  );
  createEnemy(
    enemies[1],
    shadows[1],
    locationX[1],
    locationY[1],
    health[1],
    duration[1],
    types[1],
    isPoweredUp
  );
  createEnemy(
    enemies[2],
    shadows[2],
    locationX[2],
    locationY[2],
    health[2],
    duration[2],
    types[2],
    isPoweredUp
  );
}
