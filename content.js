const DEFAULT_TIMEOUT_INTERVAL = 1000;
const LINEAR_OPEN_MESSAGE = 'The link was opened in the Linear app';
const LINEAR_URL_START = 'https://linear.app/';
const ZOOM = 'zoom';
const ZOOM_SUCCESS = 'success';
const MAX_ATTEMPTS = 30;

let attemps = 0;

const intervalId = setInterval(() => {
  if (
    // linear
    (window.location.href.startsWith(LINEAR_URL_START) && document.querySelector('span')?.textContent === LINEAR_OPEN_MESSAGE) ||
    // zoom
    (window.location.href.includes(ZOOM) && window.location.href.includes(ZOOM_SUCCESS))) {
    chrome.runtime.sendMessage({}, () => { });
    clearInterval(intervalId);
  }

  attemps += 1;
  if (attemps > MAX_ATTEMPTS) {
    clearInterval(intervalId);
  }
}, DEFAULT_TIMEOUT_INTERVAL);