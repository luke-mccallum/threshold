"use strict";

// Loading synced settings
window.onload = function () {
  chrome.storage.sync.get(["colorMode", "centerImage"], function (response) {
    // Loading theme
    if (response.colorMode != undefined) {
      console.log("Successfully loaded " + response.colorMode);
      document.body.className = response.colorMode;
    }
    // Loading center image
    if (response.centerImage != undefined || "custom") {
        console.log("Successfully loaded " + response.centerImage);
        document.getElementById("mainImage").src = response.centerImage;
    }})
};

// Live updating settings
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
      if (key === "colorMode") {
        document.body.className = newValue;
      }
      if (key === "centerImage") {
        if (newValue === "custom") {
            let customLink = prompt("Enter a link to the source of your image/gif");
            chrome.storage.sync.set({centerImage: customLink});
        } else {
            document.getElementById("mainImage").src = newValue;
        }
      }
    }
  });

// Google search functionality
let search = document.getElementById("searchTerm");
search.addEventListener("keypress", function (keyPressed) {
  if (keyPressed.key === "Enter") {
    keyPressed.preventDefault();
    location.replace("https://www.google.com/search?q=" + search.value + "");
  }
});

// Date and time
const BODY = document.querySelector("body");
BODY.addEventListener("load", startTime());
function startTime() {
  const DATE = new Date();
  document.getElementById("date").innerHTML = DATE.toDateString();
  document.getElementById("time").innerHTML = DATE.toLocaleTimeString();
  setTimeout(startTime, 1000);
}
