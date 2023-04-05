function detectPlaybackError(videoTag) {
  console.log('Creating MutationObserver...', { videoTag });
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      console.log('Change detected!!')
      mutation.addedNodes.forEach(nodeAdded => {
        if(nodeAdded.textContent.includes('reprodutor') || nodeAdded.nodeName.toLocaleLowerCase().includes('button')){
          const clickEvent = new Event('click');
          nodeAdded.dispatchEvent(clickEvent);
          console.warn('Error detected! Reloading...');
        }
      })
    })
  });
  observer.observe(videoTag, { childList: true });
}

function waitAndReturnVideoTag() {
  const videoPlayer = document.querySelector('.persistent-player');
  if(!videoPlayer) {
    console.log('Video not found, trying again...')
    setTimeout(waitAndReturnVideoTag, 1500);
  } else {
    console.log('Video tag found!');
    return detectPlaybackError(videoPlayer);
  }
}

waitAndReturnVideoTag();