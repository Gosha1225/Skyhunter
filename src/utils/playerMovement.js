import anime from "animejs";

const wrapperContent = document.querySelector(".scalable-wrapper__content");
const playerCont = document.querySelector(".player-container");

export function onPointerDownPlayerMove(player, x) {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  anime({
    targets: player,
    duration: 140,
    left:
      x - player.getBoundingClientRect().width / scale / 2 - offsetLeft + "px",
    easing: "linear",
  });
}

export function movePlayer(x) {
  const { offsetLeft, offsetTop, scale } = wrapperContent.dataset;
  if (x < 70 || x > 470) {
    return;
  } else {
    playerCont.style.left =
      x - playerCont.getBoundingClientRect().width / scale / 2 + "px";
  }
}
