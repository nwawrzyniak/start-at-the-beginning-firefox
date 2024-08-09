function resetVideo() {
  const searchParams = new URLSearchParams(window.location.search);
  const v = searchParams.get("v");
  const t = searchParams.get("t");
  const list = searchParams.get("list");
  if (v && (!t || t != "0s")) {
    let newUrl = "/watch?v=" + v + "&t=0s";
    if (list) {
      newUrl += "&list=" + list;
    }
    console.log("satb: Reloading page to force t=0s.");
    window.location.replace(newUrl);
  }
}

function startAtTheBeginning() {
  console.info("satb: DOM fully loaded and parsed. Beginning execution of script \"satb.js\".");
  browser.storage.sync.get(["isActive"]).then(result => {
    if (result.isActive === undefined) {
      browser.storage.sync.set({ isActive: true }).then(() => {
        console.log("satb: isActive was undefined, set to true by default.");
      });
    }
  });
  browser.storage.sync.get(["isActive"]).then(result => {
    if (result.isActive) {
      let currentVideoId = null;
      function checkAndResetVideo() {
        const searchParams = new URLSearchParams(window.location.search);
        const v = searchParams.get("v");
        if (v && v !== currentVideoId) {
          currentVideoId = v;
          console.log("satb: currentVideoId has changed.");
          resetVideo();
        }
      }
      checkAndResetVideo();
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            checkAndResetVideo();
          }
        });
      });
      observer.observe(document, {
        childList: true,
        subtree: true
      });
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startAtTheBeginning);
} else {
  startAtTheBeginning();
}
