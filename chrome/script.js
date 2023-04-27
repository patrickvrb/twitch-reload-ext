const ERROR_BUTTON_CLASS_SELECTOR = 'ScCoreButtonDestructive';
const VIDEO_PLAYER_CLASS_SELECTOR = ".video-player__overlay";
const LEFT_PLAYER_CONTROL_CLASS_SELECTOR = "player-controls__left-control-group";
let pollsMade = 0;

const pollForReloadButton = () => {
  setTimeout(() => {
    const errorButton = document.querySelector(`button[class*="${ERROR_BUTTON_CLASS_SELECTOR}"]`);
    const videoPlayer = document.querySelector(VIDEO_PLAYER_CLASS_SELECTOR);
    const pausedButton = videoPlayer?.querySelector('button[data-a-player-state*="paused"]');
    const leftPlayerControl = document.querySelector(`div[class*="${LEFT_PLAYER_CONTROL_CLASS_SELECTOR}"]`);

    console.log('Current try: ' + pollsMade);

    if (errorButton && !leftPlayerControl) {
      if(pollsMade > 5) {
        console.log('Max tries reached. Exiting...')
        return;
      }
      pollsMade++;
      errorButton.click();
    } else if(!errorButton && leftPlayerControl) {
      pollsMade = 0;
    }

    pollForReloadButton();
  }, 1000);
}
console.log('[LOCAL]')

pollForReloadButton();