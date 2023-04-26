const ERROR_BUTTON_CLASS_SELECTOR = "ScCoreButtonDestructive";
const VIDEO_PLAYER_CLASS_SELECTOR = ".video-player__overlay";

function findReloadButtonAndClickIt() {
  const reloadButton = document.querySelector(
    `button[class*="${ERROR_BUTTON_CLASS_SELECTOR}"]`
  );
  if (!!reloadButton) {
    console.log("Error detected! Reloading player...");
    reloadButton.click();
  }
}

function detectPlaybackError() {
  const videoPlayer = document.querySelector(VIDEO_PLAYER_CLASS_SELECTOR);
  if (!!videoPlayer) {
    console.log("Twitch player found. \nError detection initialized.");
    const observer = new MutationObserver(findReloadButtonAndClickIt);
    observer.observe(videoPlayer, { childList: true, subtree: true });
  } else {
    console.log("Player not found. \nRetrying...");
    setTimeout(detectPlaybackError, 500);
  }
}

detectPlaybackError();
