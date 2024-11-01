chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ adsBlocked: 0, trackersBlocked: 0, bandwidthSaved: 0 });
    console.log("Extension installed, stats initialized.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateStats") {
        chrome.storage.local.get(["adsBlocked", "trackersBlocked", "bandwidthSaved"], (data) => {
            chrome.storage.local.set({
                adsBlocked: data.adsBlocked + message.adsBlocked,
                trackersBlocked: data.trackersBlocked + message.trackersBlocked,
                bandwidthSaved: (parseFloat(data.bandwidthSaved) + parseFloat(message.bandwidthSaved)).toFixed(2)
            });
            console.log("Stats updated:", message);
        });
        sendResponse({ success: true });
    }
});

  
  
