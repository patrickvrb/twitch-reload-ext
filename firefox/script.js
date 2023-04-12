function findReloadButtonAndClickIt() {
  if (document.querySelector('.content-overlay-gate__content')) {
    console.log('Error detected! Reloading player...');
    document.querySelector('.content-overlay-gate__content').querySelector('button').click();
  }
}

function detectPlaybackError() {
  console.log('Twitch video player error detection initialized.');
  const videoPlayer = document.querySelector('.video-player__default-player');
  const observer = new MutationObserver(findReloadButtonAndClickIt);
  observer.observe(videoPlayer, { childList: true, subtree: true });
}

detectPlaybackError();