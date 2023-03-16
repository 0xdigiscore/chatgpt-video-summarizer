

function getVideoInfo() {
  const platform = window.CommonUtils.getPlatform();
  let title = '';
  let description = '';

  if (platform === 'YouTube') {
    title = document.querySelector('h1.title')?.innerText || '';
    description = document.querySelector('#description > yt-formatted-string')?.innerText || '';
  } else if (platform === 'Bilibili') {
    title = document.querySelector('h1.video-title')?.innerText || '';
    description = document.querySelector('div.intro')?.innerText || '';
  }

  return { platform, title, description };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getVideoInfo') {
    const videoInfo = getVideoInfo();
    sendResponse(videoInfo);
  }
});
