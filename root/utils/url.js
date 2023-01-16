let agent;

function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    window.FBPlayableOnCTAClick();
    // ExitApi.exit();
    // openURL(
    //   "https://play.google.com/store/apps/details?id=com.ludigames.android.anmp.idle.siege&hl=ru&gl=US"
    // );
    // try {
    //   if (mraid) {
    //     mraid.open(
    //       "https://play.google.com/store/apps/details?id=com.ludigames.android.anmp.idle.siege&hl=ru&gl=US"
    //     );
    //   }
    // } catch (e) {}
    return;
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    window.FBPlayableOnCTAClick();
    // ExitApi.exit();
    // openURL(
    //   "https://apps.apple.com/us/app/idle-siege-army-tycoon-game/id1527417124"
    // );
    // try {
    //   if (mraid) {
    //     mraid.open(
    //       "https://apps.apple.com/us/app/idle-siege-army-tycoon-game/id1527417124"
    //     );
    //   }
    // } catch (e) {}
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
        window.FBPlayableOnCTAClick();
      // ExitApi.exit();
      // openURL(
      //   "https://apps.apple.com/us/app/idle-siege-army-tycoon-game/id1527417124"
      // );
      // try {
      //   if (mraid) {
      //     mraid.open(
      //       "https://apps.apple.com/us/app/idle-siege-army-tycoon-game/id1527417124"
      //     );
      //   }
      // } catch (e) {}
      return;
    }
    if (getOS() === "Windows" || getOS() === "Android" || getOS() === "Linux") {
        window.FBPlayableOnCTAClick();
      // ExitApi.exit();
      // openURL(
      //   "https://play.google.com/store/apps/details?id=com.ludigames.android.anmp.idle.siege&hl=ru&gl=US"
      // );
      // try {
      //   if (mraid) {
      //     mraid.open(
      //       "https://play.google.com/store/apps/details?id=com.ludigames.android.anmp.idle.siege&hl=ru&gl=US"
      //     );
      //   }
      // } catch (e) {}
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
