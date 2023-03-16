document.getElementById('save').addEventListener('click', () => {
  const maxTokens = document.getElementById('max_tokens').value;
  const apiKey = document.getElementById('api_key').value;

  chrome.storage.sync.set({ max_tokens: maxTokens, api_key: apiKey }, () => {
    alert('Settings saved');
  });
});

chrome.storage.sync.get(['api_key', 'max_tokens'], (data) => {
  document.getElementById('max_tokens').value = data.max_tokens || 150;
  document.getElementById('api_key').value = data.api_key || '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';
});

localizeHtmlPage();
