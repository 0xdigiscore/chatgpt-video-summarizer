import React, { useState, useEffect } from "react";
import { fetchSummary } from "../utils/api";
import { localizeHtmlPage } from "../utils/common";

const Popup = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localizeHtmlPage();
  }, []);

  const summarizeVideo = async () => {
    setLoading(true);
    try {
      const activeTab = await new Promise((resolve) =>
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) =>
          resolve(tab)
        )
      );
      const videoSummary = await fetchSummary(activeTab.url);
      setSummary(videoSummary);
    } catch (error) {
      setSummary(chrome.i18n.getMessage("popup_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={summarizeVideo} disabled={loading}>
        {chrome.i18n.getMessage("popup_button")}
      </button>
      {loading && <p>{chrome.i18n.getMessage("popup_loading")}</p>}
      {summary && <p>{summary}</p>}
    </div>
  );
};

export default Popup;
