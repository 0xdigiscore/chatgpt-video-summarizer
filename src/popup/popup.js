const summarizeButton = document.getElementById('summarize');
const loading = document.getElementById('loading');
const summaryElement = document.getElementById('summary');
const errorElement = document.getElementById('error');

function setLoading(loading) {
    document.getElementById('loading').style.display = loading ? 'block' : 'none';
    document.getElementById('summary').style.display = loading ? 'none' : 'block';
}

document.getElementById('summarize').addEventListener('click', async () => {
    setLoading(true);
    const videoInfo = await getVideoInfo(); // This function should be implemented in contentScript.js and get the video information from the current page
    const summaryElement = document.getElementById('summary');
  
    chrome.runtime.sendMessage({ action: 'summarize', data: videoInfo }, (response) => {
      setLoading(false);
      if (response.error) {
        summaryElement.innerHTML = `<span class="error">${response.error}</span>`;
      } else {
        summaryElement.innerHTML = response.summary || 'No summary available.';
      }
    });
});

summarizeButton.addEventListener('click', () => {
  summarizeButton.disabled = true;
  loading.style.display = 'block';
  summaryElement.textContent = '';
  errorElement.textContent = '';

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: 'getVideoInfo' }, (videoInfo) => {
      chrome.storage.sync.get(['api_key', 'max_tokens'], (data) => {
        const apiKey = data.api_key || 'your_default_api_key';
        const maxTokens = data.max_tokens || 150;

        chrome.runtime.sendMessage(
          { action: 'summarizeVideo', videoInfo: { ...videoInfo, apiKey }, maxTokens },
          (response) => {
            summarizeButton.disabled = false;
            loading.style.display = 'none';

            if (response.error) {
              errorElement.textContent = `Error: ${response.error}`;
            } else {
              summaryElement.textContent = response.summary;
            }
          }
        );
      });
    });
  });
});
localizeHtmlPage();