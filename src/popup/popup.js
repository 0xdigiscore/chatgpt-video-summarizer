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


async function summarizeVideo(videoUrl, max_tokens, apiKey) {
  try {
    const prompt = `Summarize the content of this video: ${videoUrl}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "Say this is a test!"}],
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      console.error('Error calling ChatGPT API:', response.statusText);
      return null;
    }

    const data = await response.json();
    const summary = data.choices && data.choices.length > 0 ? data.choices[0].text.trim() : null;
    return summary;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    return null;
  }
}