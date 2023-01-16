import { bulletImg, sBulletImg, setSource } from "./images";

const wrapperContent = document.querySelector(".scalable-wrapper__content");

function createBullet(x, y, isSuperBullet, move) {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  const playground = document.querySelector(".playground");

  const bullet = document.createElement("img");

  bullet.classList.add("projectile");
  bullet.style.position = "absolute";
  playground.append(bullet);
  if (isSuperBullet) {
    bullet.style.width = "3%";
    bullet.style.height = "8%";
    bullet.style.top = y + "px";
    bullet.style.left = x - 18 / scale / 2 + "px";
    setSource(bullet, sBulletImg);
    move(bullet, 750, -740, "bullet");
  } else {
    bullet.style.width = "12px";
    bullet.style.top = y + "px";
    bullet.style.left = x - 10 / scale / 2 + "px";
    setSource(bullet, bulletImg);
    move(bullet, 750, -740, "bullet");
  }
}

export default createBullet;
