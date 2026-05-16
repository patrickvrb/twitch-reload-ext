const POLL_FREQUENCY = 1000;

const ERROR_OVERLAY_QUERY_CLASS = 'div[data-a-target="player-overlay-content-gate"]'

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function pollForReloadButton() {
  while (true) {
    const errorOverlay = document.querySelector(ERROR_OVERLAY_QUERY_CLASS)

    if (errorOverlay) {
      console.log('Error detected. Reloading player...')
      const errorButton = errorOverlay.querySelector('button');
      errorButton.click();
    }
    await delay(POLL_FREQUENCY);
  }
}

console.log('Twitch player auto-reload initialized. v2.4.0')
pollForReloadButton();