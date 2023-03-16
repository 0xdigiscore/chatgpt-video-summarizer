import React, { useState, useEffect } from "react";
import { localizeHtmlPage } from "../utils/common";

const Options = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    localizeHtmlPage();
    chrome.storage.sync.get("apiKey", (data) => {
      if (data.apiKey) {
        setApiKey(data.apiKey);
      }
    });
  }, []);

  const saveOptions = () => {
    chrome.storage.sync.set({ apiKey: apiKey }, () => {
      const status = document.getElementById("status");
      status.textContent = chrome.i18n.getMessage("options_saved");
      setTimeout(() => {
        status.textContent = "";
      }, 750);
    });
  };

  return (
    <div>
      <label htmlFor="apiKey">
        {chrome.i18n.getMessage("options_api_key_label")}
      </label>
      <input
        type="text"
        id="apiKey"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button onClick={saveOptions}>
        {chrome.i18n.getMessage("options_save_button")}
      </button>
      <div id="status"></div>
    </div>
  );
};

export default Options;
