let isDapi = false;
let agent;
const googlePlayUrl =
  "https://apps.apple.com/au/app/arcade-champion-alpha/id1439012691";
const appleUrl =
  "https://apps.apple.com/au/app/arcade-champion-alpha/id1439012691";
function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    try {
      window.FBPlayableOnCTAClick();
    } catch (error) {}
    try {
      ExitApi.exit();
    } catch (error) {}
    openURL(googlePlayUrl);
    try {
      if (mraid) {
        mraid.open(googlePlayUrl);
      }
    } catch (e) {}
    try {
      if (dapi?.isReady()) {
        dapi.openStoreUrl(googlePlayUrl);
      }
      window.open(googlePlayUrl);
    } catch (e) {}
    return;
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    try {
      window.FBPlayableOnCTAClick();
    } catch (error) {}
    try {
      ExitApi.exit();
    } catch (error) {}
    openURL(appleUrl);
    try {
      if (mraid) {
        mraid.open(appleUrl);
      }
    } catch (e) {}
    try {
      if (dapi?.isReady()) {
        dapi.openStoreUrl(appleUrl);
      }
      window.open(appleUrl);
    } catch (e) {}
    return;
  }

  agent = "unknown";

  return "unknown";
}

function getOS() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
}

export default function setUrls(event) {
  getMobileOperatingSystem();
  if (agent === "unknown") {
    if (getOS() === "iOS" || getOS() === "Mac OS") {
      try {
        window.FBPlayableOnCTAClick();
      } catch (error) {}
      try {
        ExitApi.exit();
      } catch (error) {}
      openURL(appleUrl);
      try {
        if (mraid) {
          mraid.open(appleUrl);
        }
      } catch (e) {}
      try {
        if (dapi?.isReady()) {
          dapi.openStoreUrl(appleUrl);
        }
        window.open(appleUrl);
      } catch (e) {}
      return;
    }
    if (getOS() === "Windows" || getOS() === "Android" || getOS() === "Linux") {
      try {
        window.FBPlayableOnCTAClick();
      } catch (error) {}
      try {
        ExitApi.exit();
      } catch (error) {}
      openURL(googlePlayUrl);
      try {
        if (mraid) {
          mraid.open(googlePlayUrl);
        }
      } catch (e) {}
      try {
        if (dapi?.isReady()) {
          dapi.openStoreUrl(googlePlayUrl);
        }
        window.open(googlePlayUrl);
      } catch (e) {}
      return;
    }
  }
}

function openURL(url) {
  const link = document.createElement("a");
  link.classList.add("temporary-link");
  link.href = url;
  document.querySelector("body").append(link);
  link.click();
  link.remove();
}

export async function urlsSetting() {
  if (isDapi) {
    try {
      userClickedDownloadButton();
    } catch (e) {}
  } else
    try {
      setUrls();
    } catch (e) {}
}
