import "../styles/reset.css";
import "../styles/global.css";
import "../styles/index.css";
import "../styles/fonts.css";
import handleResize from "./utils/resize";
import "./utils/images";
import "./utils/url";
import "./utils/swiper";
import {
  finalActionScreenAnimation,
  finalScreenAnimation,
  handAnimation,
} from "./utils/animation";
import setUrls from "./utils/url";

const video = document.querySelector(".video");
const phoneVideo = document.querySelector(".phone-video");
const wrapperContent = document.querySelector(".scalable-wrapper__content");
let videoPlays = false;

function onPointerDownWindow(event) {
  video.muted = false;
  if (videoPlays) {
    video.play();
    video.pause();
  }
}

function calcAngleDegrees(x, y) {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

async function playVideo() {
  try {
    await video.play();
  } catch (err) {
    document.querySelector(".bait").classList.remove("hidden");
  }
}

async function playPhoneVideo() {
  try {
    await phoneVideo.play();
  } catch (err) {
    document.querySelector(".bait").classList.remove("hidden");
  }
}

let swiped;
let downX, downY;
let moveX, moveY;
let difX, difY;
let degree;

function onPointerDown(event) {
  downX = event.pageX;
  downY = event.pageY;
  document.querySelector(".bait").classList.remove("hidden");
}

function onPointerMove(event) {
  moveX = event.pageX;
  moveY = event.pageY;

  difX = moveX - downX;
  difY = moveY - downY;

  degree = calcAngleDegrees(difX, difY);
}

async function onPointerUp(event) {
  if (degree > -135 && degree < -45) {
    document.querySelector(".hand").classList.add("hidden");
    document.querySelector(".ft1").classList.add("hidden");
    document.querySelector(".ft2").classList.add("hidden");
    removeEventListeners();

    playVideo();
    finalScreenAnimation.pause();
    await finalActionScreenAnimation();
    document.addEventListener("pointerdown", setUrls);
    playPhoneVideo();
    videoPlays = true;
  }
}

function removeEventListeners() {
  document.removeEventListener("pointerdown", onPointerDown);
  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
  document.removeEventListener("pointerdown", onPointerDownWindow);
}

function addEventListeners() {
  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
}

function startApp() {
  window.addEventListener("load", (event) => {
    video.pause();
    handAnimation();
    finalScreenAnimation.play();
  });

  document.addEventListener("pointerdown", onPointerDownWindow);

  handleResize();

  window.visualViewport.addEventListener("resize", (e) => {
    handleResize();
  });

  addEventListeners();
}

// startApp();

if (mraid.getState() === "loading") {
  // If the SDK is still loading, add a listener for the 'ready' event:
  mraid.addEventListener("ready", onSdkReady);
} else {
  // Otherwise, if the SDK is ready, execute your function:
  onSdkReady();
}

// Implement a function that shows the ad when it first renders:
function onSdkReady() {
  // The viewableChange event fires if the ad container's viewability status changes.
  // Add a listener for the viewabilityChange event, to handle pausing and resuming:
  mraid.addEventListener("viewableChange", viewableChangeHandler);
  // The isViewable method returns whether the ad container is viewable on the screen.
  if (mraid.isViewable()) {
    try {
      mraid?.getMaxSize();
      mraid?.getState();
    } catch (e) {}
    // If the ad container is visible, play the ad:
    showMyAd();
  }
}

// Implement a function for executing the ad:
function showMyAd() {
  // Insert code for showing your playable ad.
  startApp();
}

// Implement a function that handles pausing and resuming the ad based on visibility:
function viewableChangeHandler(viewable) {
  if (viewable) {
    // If the ad is viewable, show the ad:
    showMyAd();
  } else {
    // If not, pause the ad.
  }
}
