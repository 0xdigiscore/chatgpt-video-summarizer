const { fetchSummary} = require('../utils/api.js');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarizeVideo') {
    const { videoInfo, maxTokens } = request;

    // You can replace this prompt template with your own if needed.
    const prompt = `Please summarize the video titled "${videoInfo.title}" with the following description: "${videoInfo.description}".`;

    fetchSummary(videoInfo.apiKey, prompt, maxTokens)
      .then((summary) => sendResponse({ summary }))
      .catch((error) => sendResponse({ error: error.message }));

    return true; // To keep the message channel open for async response
  }
});
