import background from "../../assets/Images/Background-04.png";
import player from "../../assets/Images/Player-Plane.png";
import playerShadow from "../../assets/Images/Player-Plane-Shadow.png";
import phoenix from "../../assets/Images/Pickup-Phoenix.png";
import cloud from "../../assets/Images/Cloud.png";
import head from "../../assets/Images/PlayerCharacter.gif";
import end1 from "../../assets/Images/Button.png";
import end2 from "../../assets/Images/Button-1.png";
import bullet from "../../assets/Images/BulletRed.png";
import coin from "../../assets/Images/Coin.png";
import bulletPower from "../../assets/Images/Pickup-PowerShot.png";
import sBullet from "../../assets/Images/BulletPower.png";
import enemyA1 from "../../assets/Images/Enemy-Plane-A.png";
import enemyA2 from "../../assets/Images/Enemy-Plane-A-V1.png";
import enemyAShadow from "../../assets/Images/Enemy-Plane-A-Shadow.png";
import enemyB1 from "../../assets/Images/Enemy-Plane-B.png";
import enemyBShadow from "../../assets/Images/Enemy-Plane-B-Shadow.png";
import star from "../../assets/Images/Warning-Missile-Back.png";
import propPlayer from "../../assets/Images/prop_player.gif";
import level from "../../assets/Images/Trophy-Nice-NoStar.png";
import levelStr from "../../assets/Images/Trophy-Nice-NoStar-Stroke.png";

export const phoenixImg = phoenix;
export const bulletImg = bullet;
export const coinImg = coin;
export const bulletPowerImg = bulletPower;
export const sBulletImg = sBullet;
export const enemyA1Img = enemyA1;
export const enemyA2Img = enemyA2;
export const enemyB1Img = enemyB1;
export const enemyAShadowImg = enemyAShadow;
export const enemyBShadowImg = enemyBShadow;

document.querySelectorAll(".star").forEach((el) => {
  setSource(el, star);
});

document.querySelectorAll(".background").forEach((el) => {
  setSource(el, background);
});

document.querySelectorAll(".cloud").forEach((el) => {
  setSource(el, cloud);
});

setSource(document.querySelector(".level"), level);
setSource(document.querySelector(".level-stroke"), levelStr);
setSource(document.querySelector(".endcard1"), end1);
setSource(document.querySelector(".endcard2"), end2);
setSource(document.querySelector(".head"), head);
setSource(document.querySelector(".prop"), propPlayer);
setSource(document.querySelector(".player"), player);
setSource(document.querySelector(".player-shadow"), playerShadow);
setSource(document.querySelector(".phoenix-power"), phoenix);

export function setSource(el, source) {
  el.src = el.src || source;
}
