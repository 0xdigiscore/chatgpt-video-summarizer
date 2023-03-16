import { fetchSummary } from "./utils/api";

const summarizeVideo = async (url) => {
  try {
    const summary = await fetchSummary(url);
    return summary;
  } catch (error) {
    console.error("Error summarizing video:", error);
    return "";
  }
};

chrome.action.onClicked.addListener(async (tab) => {
  const summary = await summarizeVideo(tab.url);

  if (summary) {
    chrome.tabs.sendMessage(tab.id, {
      action: "summarizeVideo",
      summary: summary,
    });
  }
});
