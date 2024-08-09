function popup() {
  console.info("DOM fully loaded and parsed. Beginning execution of script \"popup.js\".");
  const checkbox = document.querySelector(".satb-switch input");
  browser.storage.sync.get(["isActive"]).then(result => {
    if (result.isActive === undefined) {
      browser.storage.sync.set({ isActive: true }).then(() => {
        checkbox.checked = true;
        console.log("isActive was undefined, set to true by default.");
      });
    } else {
      checkbox.checked = result.isActive;
    }
  });
  checkbox.addEventListener("change", function () {
    browser.storage.sync.set({ isActive: checkbox.checked }).then(() => {
      console.log("The value is set to " + checkbox.checked);
    });
    if (checkbox.checked) {
      browser.action.setIcon({ path: "/graphics/nav_bar.png" });
    } else {
      browser.action.setIcon({ path: "/graphics/nav_bar_inactive.png" });
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", popup);
} else {
  popup();
}
