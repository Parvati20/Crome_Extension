document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["adsBlocked", "trackersBlocked", "bandwidthSaved"], (data) => {
      document.getElementById("adsBlocked").textContent = data.adsBlocked;
      document.getElementById("trackersBlocked").textContent = data.trackersBlocked;
      document.getElementById("bandwidthSaved").textContent = data.bandwidthSaved;
    });
  });
  
  