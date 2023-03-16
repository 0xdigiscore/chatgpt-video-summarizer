export const getPlatform = () => {
    const url = window.location.href;
  
    if (url.includes("youtube.com")) {
      return "youtube";
    } else if (url.includes("bilibili.com")) {
      return "bilibili";
    } else {
      return null;
    }
  };
  
  export const localizeHtmlPage = () => {
    const objects = document.getElementsByTagName('html');
    for (let j = 0; j < objects.length; j++) {
      const obj = objects[j];
      const valStrH = obj.innerHTML.toString();
      const valNewH = valStrH.replace(/__MSG_(\w+)__/g, (match, v1) => {
        return v1 ? chrome.i18n.getMessage(v1) : "";
      });
  
      if (valNewH != valStrH) {
        obj.innerHTML = valNewH;
      }
    }
  };
  