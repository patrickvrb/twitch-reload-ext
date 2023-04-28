const ERROR_BUTTON_CLASS_SELECTOR = 'ScCoreButtonDestructive';
const TRANSITION_STATE_CLASS_SELECTOR = ".player-overlay-background";
const MAX_RELOAD_TRIES = 5;
let pollsMade = 0;

const pollForReloadButton = () => {
  setTimeout(() => {
    const errorButton = document.querySelector(`button[class*="${ERROR_BUTTON_CLASS_SELECTOR}"]`);
    const isTransitionState = !!document.querySelector(TRANSITION_STATE_CLASS_SELECTOR)

    if (errorButton) {
      if(pollsMade >= MAX_RELOAD_TRIES) {
        console.error('Max tries reloading player reached.')
        return;
      }
      pollsMade++;
      console.log('Error detected. Reloading player...')
      errorButton.click();
    } else if(!errorButton && !isTransitionState) { // Player running with no errors
      pollsMade = 0;
    }

    pollForReloadButton();
  }, 1000);
}

console.log('Twitch player auto-reload initialized.')
pollForReloadButton();