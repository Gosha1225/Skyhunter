import background from "../../assets/Background.png";
import rectangle from "../../assets/Rectangle.png";
import logo from "../../assets/Logo.png";
import appStore from "../../assets/App_Store.png";
import googlePlay from "../../assets/Google_Play.png";
import phone from "../../assets/Tablet.png";
import reflection from "../../assets/Reflection.png";
import hand from "../../assets/hand.png";

setSource(document.querySelector(".background"), background);
setSource(document.querySelector(".rectangle"), rectangle);
setSource(document.querySelector(".logo"), logo);
setSource(document.querySelector(".app-store"), appStore);
setSource(document.querySelector(".google-play"), googlePlay);
setSource(document.querySelector(".phone"), phone);
setSource(document.querySelector(".reflection"), reflection);
setSource(document.querySelector(".hand"), hand);

function setSource(el, source) {
  el.src = el.src || source;
}
