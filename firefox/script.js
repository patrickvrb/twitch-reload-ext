const MAX_RELOAD_TRIES = 2;
const POLL_FREQUENCY = 1000;
let pollsMade = 0;

const ERROR_OVERLAY_QUERY_CLASS = 'div[data-a-target="player-overlay-content-gate"]'
const TRANSITION_STATE_QUERY_CLASS = '.player-overlay-background'

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function recoveryLoop() {
  console.log('Waiting for player to reload...');

  while (true) {
    await delay(POLL_FREQUENCY);
    const errorOverlay = document.querySelector(ERROR_OVERLAY_QUERY_CLASS)
    const errorButton = errorOverlay?.querySelector('button');
    if (!errorButton) {
      console.log('Player reloaded successfully.')
      break;
    }
  }
}

async function pollForReloadButton() {
  while (true) {
    const errorOverlay = document.querySelector(ERROR_OVERLAY_QUERY_CLASS)
    const isTransitionState = !!document.querySelector(TRANSITION_STATE_QUERY_CLASS);

    if (errorOverlay) {
      if (pollsMade >= MAX_RELOAD_TRIES) {
        console.log('Max tries reloading player reached.')
        await recoveryLoop();
        pollsMade = 0;

      } else {
        pollsMade++;
        console.log('Error detected. Reloading player...')
        const errorButton = errorOverlay.querySelector('button');
        errorButton.click();
      }
    } else if (!isTransitionState) { // Player running with no errors
      pollsMade = 0;
    }
    await delay(POLL_FREQUENCY);
  }
}
console.log('Twitch player auto-reload initialized. v2.3.0')
pollForReloadButton();