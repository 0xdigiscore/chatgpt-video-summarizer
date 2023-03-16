// src/utils/common.js

function getLocalizedString(key) {
  return chrome.i18n.getMessage(key);
}

function getApiKey() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['api_key'], (result) => {
      if (result.api_key) {
        resolve(result.api_key);
      } else {
        // Use a default API key if none is provided
        resolve('YOUR_DEFAULT_API_KEY');
      }
    });
  });
}

function localizeHtmlPage() {
  const objects = document.getElementsByTagName('html');
  for (let j = 0; j < objects.length; j++) {
    const obj = objects[j];
    const valStrH = obj.innerHTML.toString();
    const valNewH = valStrH.replace(/__MSG_(\w+)__/g, (match, v1) => {
      return v1 ? chrome.i18n.getMessage(v1) : '';
    });

    if (valNewH != valStrH) {
      obj.innerHTML = valNewH;
    }
  }
}

function getPlatform() {
  return new Promise((resolve) => {
    chrome.runtime.getPlatformInfo((platformInfo) => {
      resolve(platformInfo);
    });
  });
}

module.exports = {
  getLocalizedString,
  getApiKey,
  localizeHtmlPage,
  getPlatform
};