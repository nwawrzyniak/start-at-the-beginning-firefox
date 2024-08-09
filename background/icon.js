function updateIcon() {
  browser.storage.sync.get(["isActive"]).then(result => {
    if (result.isActive === undefined) {
      browser.storage.sync.set({ isActive: true }).then(() => {
        browser.action.setIcon({ path: "/graphics/nav_bar.png" });
        console.log("satb: isActive was undefined, set to true by default.");
      });
    } else {
      if (result.isActive) {
        browser.action.setIcon({ path: "/graphics/nav_bar.png" });
      } else {
        browser.action.setIcon({ path: "/graphics/nav_bar_inactive.png" });
      }
    }
  });
}

updateIcon();
browser.runtime.onInstalled.addListener(updateIcon);
browser.runtime.onStartup.addListener(updateIcon);
