import mainTheme from "../../assets/audio/SkyhunterTheme";
import shootingSound from "../../assets/audio/ShootSound";
import engineSound from "../../assets/audio/EngineSound";
import flyBySound from "../../assets/audio/FlyBySound";
import phoenixSound from "../../assets/audio/PhoenixSound";
import phoenixEndSound from "../../assets/audio/PhoenixEndSound";
import superBulletSound from "../../assets/audio/superBulletSound";
import coinSound from "../../assets/audio/coinSound";
import enemyExplosionSound from "../../assets/audio/enemyExplosionSound";
import playerExplosionSound from "../../assets/audio/playerExplosionSound";

export const mainAudio = new Audio(mainTheme);
export const shootAudio = new Audio(shootingSound);
export const engineAudio = new Audio(engineSound);
export const flyByAudio = new Audio(flyBySound);
export const phoenixAudio = new Audio(phoenixSound);
export const phoenixEndAudio = new Audio(phoenixEndSound);
const superBulletAudio = new Audio(superBulletSound);
const coinAudio = new Audio(coinSound);
const enemyExplosionAudio = new Audio(enemyExplosionSound);
const playerExplosionAudio = new Audio(playerExplosionSound);

export function playAud(aud) {
  aud.play();
  aud.onended = function () {
    aud.play();
  };
  document.addEventListener(
    "visibilitychange",
    function () {
      if (document.hidden) {
        aud.pause();
      } else {
        aud.play();
      }
    },
    false
  );
}

export function pauseAud(aud) {
  aud.pause();
}

export function playSecondaryAud(aud) {
  aud.play();
}

export function pauseSecondaryAud(aud) {
  aud.pause();
  aud.currentTime = 0;
}

export function enemyExplosionPlay() {
  enemyExplosionAudio.volume = 0.3;
  enemyExplosionAudio.pause();
  enemyExplosionAudio.currentTime = 0;
  enemyExplosionAudio.play();
}

export function playerExplosionPlay() {
  playerExplosionAudio.volume = 0.3;
  playerExplosionAudio.pause();
  playerExplosionAudio.currentTime = 0;
  playerExplosionAudio.play();
}

export function superBulletAudPlay() {
  superBulletAudio.volume = 0.5;
  superBulletAudio.pause();
  superBulletAudio.currentTime = 0;
  superBulletAudio.play();
}

export function coinAudPlay() {
  coinAudio.volume = 0.5;
  coinAudio.pause();
  coinAudio.currentTime = 0;
  coinAudio.play();
}
