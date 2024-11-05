const MAX_RELOAD_TRIES = 5;
const POLL_FREQUENCY = 1000;
let pollsMade = 0;

const pollForReloadButton = () => {
  setTimeout(() => {
    const errorOverlay = document.querySelector('div[data-a-target="player-overlay-content-gate"]')
    const isTransitionState = !!document.querySelector(".player-overlay-background");

    if (errorOverlay) {
      if (pollsMade >= MAX_RELOAD_TRIES) {
        console.log('Max tries reloading player reached.')
        return;
      }
      pollsMade++;
      console.log('Error detected. Reloading player...')
      const errorButton = errorOverlay.querySelector('button');
      errorButton.click();
    } else if (!isTransitionState) { // Player running with no errors
      pollsMade = 0;
    }

    pollForReloadButton();
  }, POLL_FREQUENCY);
}


console.log('Twitch player auto-reload initialized. 123')
pollForReloadButton();