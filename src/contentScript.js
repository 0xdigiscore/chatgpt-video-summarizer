import { getPlatform } from "./utils/common";

const injectSummary = (summary) => {
  const platform = getPlatform();
  let container;

  if (platform === "youtube") {
    container = document.querySelector("#info-contents");
  } else if (platform === "bilibili") {
    container = document.querySelector(".video-data");
  }

  if (container) {
    const summaryElement = document.createElement("div");
    summaryElement.id = "video-summary";
    summaryElement.innerHTML = `<h3>Video Summary:</h3><p>${summary}</p>`;
    container.appendChild(summaryElement);
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarizeVideo") {
    injectSummary(request.summary);
  }
});
