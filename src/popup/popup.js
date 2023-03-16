const summarizeButton = document.getElementById('summarize');
const loadingIndicator = document.getElementById('loading');
const summaryElement = document.getElementById('summary');
const errorElement = document.getElementById('error');

function displayError(message) {
  errorElement.textContent = chrome.i18n.getMessage('error') + ' ' + message;
  errorElement.style.display = 'block';
}

summarizeButton.addEventListener('click', async () => {
  loadingIndicator.style.display = 'block';
  errorElement.style.display = 'none';
  summaryElement.textContent = '';

  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const videoUrl = tabs[0].url;

    const { api_key, max_tokens } = await new Promise((resolve) => {
      chrome.storage.sync.get(['api_key', 'max_tokens'], resolve);
    });

    const summary = await summarizeVideo(videoUrl, max_tokens, api_key);
    summaryElement.textContent = summary;
  } catch (error) {
    displayError(error.message);
  } finally {
    loadingIndicator.style.display = 'none';
  }
});

localizeHtmlPage();
