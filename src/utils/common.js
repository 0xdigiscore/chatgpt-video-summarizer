function getPlatform() {
    if (window.location.hostname.includes('youtube.com')) {
      return 'YouTube';
    } else if (window.location.hostname.includes('bilibili.com')) {
      return 'Bilibili';
    }
    return null;
  }
  
function escapeHtml(unsafe) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function localizeHtmlPage() {
  const objects = document.querySelectorAll('[data-i18n]');
  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];
    const key = obj.getAttribute('data-i18n');
    const message = chrome.i18n.getMessage(key);
    if (obj.tagName === 'INPUT') {
      obj.setAttribute('placeholder', message);
    } else {
      obj.textContent = message;
    }
  }
}
  
export { getPlatform, escapeHtml, localizeHtmlPage };
  