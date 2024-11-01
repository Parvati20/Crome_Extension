const adSelectors = [
    "[id*='ad']",
    "[class*='ad']",
    "iframe[src*='ads']",
    "img[src*='ad']",
    ".ad-banner",
    ".ad-container"
];
const trackerSelectors = ["[src*='tracker']", "[href*='tracker']"];

let totalBandwidthSaved = 0;

function blockElements(selectors) {
    let count = 0;
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            if (el instanceof HTMLElement) {
                count++;
                totalBandwidthSaved += el.offsetHeight * el.offsetWidth * 0.5 / 1000; // KB estimate
                el.remove();
            }
        });
    });
    return count;
}

function removeAdsAndTrackers() {
    const adsBlocked = blockElements(adSelectors);
    const trackersBlocked = blockElements(trackerSelectors);

    chrome.runtime.sendMessage({
        action: "updateStats",
        adsBlocked,
        trackersBlocked,
        bandwidthSaved: totalBandwidthSaved.toFixed(2) // KB
    }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Message sending error:", chrome.runtime.lastError.message);
        } else {
            console.log("Ad and tracker stats sent. Response:", response);
        }
    });
}

removeAdsAndTrackers();

const observer = new MutationObserver(removeAdsAndTrackers);
observer.observe(document.body, { childList: true, subtree: true });

  
  
  

  