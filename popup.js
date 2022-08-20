light.addEventListener("click", function () {
  chrome.storage.sync.set({ colorMode: "light-mode" });
});

dark.addEventListener("click", function () {
  chrome.storage.sync.set({ colorMode: "dark-mode" });
});

addCategoryInput.addEventListener("keypress", function (keyPressed) {
  if (keyPressed.key === "Enter") {
    keyPressed.preventDefault();
    chrome.storage.sync.set({ addCategory: addCategoryInput.value});
    addCategoryInput.value = "";
  }
});

removeCategoryInput.addEventListener("keypress", function (keyPressed) {
  if (keyPressed.key === "Enter") {
    keyPressed.preventDefault();
    chrome.storage.sync.set({ removeCategory: removeCategoryInput.value});
    removeCategoryInput.value = "";
  }
});

rei.addEventListener("click", function () {
  chrome.storage.sync.set({ centerImage: "images/main/rei.gif" });
});

skeleton.addEventListener("click", function () {
  chrome.storage.sync.set({ centerImage: "images/main/skeleton.gif" });
});

neco.addEventListener("click", function () {
  chrome.storage.sync.set({ centerImage: "images/main/neco.gif" });
});

frog.addEventListener("click", function () {
  chrome.storage.sync.set({ centerImage: "images/main/frog.gif" });
});

custom.addEventListener("click", function () {
  chrome.storage.sync.set({ centerImage: "custom" });
});

resetButton.addEventListener("click", function() {
  chrome.storage.sync.remove(["linkData"])
})
