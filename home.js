"use strict";

// Loading synced settings
window.onload = function () {
  chrome.storage.sync.get(
    ["colorMode", "centerImage", "linkData"],
    function (response) {
      // Loading theme
      if (response.colorMode != undefined) {
        console.log("Successfully loaded " + response.colorMode);
        document.body.className = response.colorMode;
      }
      // Loading center image
      if (
        response.centerImage != undefined &&
        response.centerImage != "custom"
      ) {
        console.log("Successfully loaded " + response.centerImage);
        document.getElementById("mainImage").src = response.centerImage;
      }
      // Loading links
      if (response.linkData != undefined) {
        console.log("Successfully loaded saved link data");
        document
          .getElementById("categories")
          .replaceChildren(parse(response.linkData));
      } else if (response.linkData === undefined) {
        console.log("Successfully loaded default link data");
        loadDefaultLinks();
      }
    }
  );
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
    } else if (key === "centerImage") {
      if (newValue === "custom") {
        let customLink = prompt("Enter a link to the source of your image/gif");
        if (customLink != null && customLink != "") {
          chrome.storage.sync.set({ centerImage: customLink });
        }
      } else {
        document.getElementById("mainImage").src = newValue;
      }
    } else if (key === "linkData") {
      if (newValue != undefined) {
        document.getElementById("categories").replaceChildren(parse(newValue));
      } else {
        loadDefaultLinks();
      }
    } else if (key === "addCategory") {
      addCategory(newValue);
    } else if (key === "removeCategory") {
      removeCategory(newValue);
    } else if (key === "addLink") {
      addLink(newValue);
    } else if (key === "removeLink") {
      removeLink(newValue);
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

// Parsing saved HTML data
function parse(htmlData) {
  let parser = new DOMParser();
  return parser.parseFromString(htmlData, "text/html").body;
}

// Creating a category
function createCategory(name) {
  let category = document.createElement("figure");
  category.setAttribute("id", name);

  let figcaption = document.createElement("figcaption");
  figcaption.innerHTML = name;
  category.appendChild(figcaption);

  let list = document.createElement("ul");
  list.setAttribute("id", name + "List");
  category.appendChild(list);
  return category;
}

// Creating a link
function createLink(name, link) {
  let listElement = document.createElement("li");
  let linkElement = document.createElement("a");
  linkElement.href = link;
  linkElement.innerHTML = name;
  listElement.id = name + "Link";
  listElement.appendChild(linkElement);
  return listElement;
}

// Adding a category to the stored values
function addCategory(name) {
  chrome.storage.sync.get(["linkData"], function (response) {
    let categories = parse(response.linkData);
    categories.childNodes[0].appendChild(createCategory(name));
    chrome.storage.sync.set({ linkData: categories.outerHTML });
  });
}

// Removing a category from stored values
function removeCategory(name) {
  chrome.storage.sync.get(["linkData"], function (response) {
    let data = parse(response.linkData);
    let categories = data.childNodes[0].childNodes;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === name) {
        data.childNodes[0].removeChild(categories[i]);
        break;
      }
    }
    chrome.storage.sync.set({ linkData: data.outerHTML });
  });
}

// Adding a link to stored values
function addLink(input) {
  chrome.storage.sync.get(["linkData"], function (response) {
    let newLink = createLink(input[0], input[2]);
    let data = parse(response.linkData);
    let categories = data.childNodes[0].childNodes;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === input[1]) {
        data.childNodes[0].childNodes[i].childNodes[1].appendChild(newLink);
        break;
      }
    }
    chrome.storage.sync.set({ linkData: data.outerHTML });
  });
}

// Removing a link from stored values
function removeLink(input) {
  chrome.storage.sync.get(["linkData"], function (response) {
    let data = parse(response.linkData);
    let categories = data.childNodes[0].childNodes;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === input[1]) {
        let links = categories[i].childNodes[1].childNodes;
        for (let j = 0; j < links.length; j++) {
          if (links[j].id === input[0] + "Link") {
            data.childNodes[0].childNodes[i].childNodes[1].removeChild(
              links[j]
            );
            break;
          }
        }
      }
    }
    chrome.storage.sync.set({ linkData: data.outerHTML });
  });
}

// Loading default links
function loadDefaultLinks() {
  // Initialising social category
  let social = createCategory("social");
  social.childNodes[1].appendChild(
    createLink("linkedin", "https://www.linkedin.com/feed/")
  );
  social.childNodes[1].appendChild(
    createLink("twitter", "https://twitter.com/home")
  );
  social.childNodes[1].appendChild(
    createLink("facebook", "https://www.facebook.com/")
  );
  social.childNodes[1].appendChild(
    createLink("pinterest", "https://www.pinterest.nz/")
  );
  social.childNodes[1].appendChild(
    createLink("reddit", "https://www.reddit.com/")
  );
  social.childNodes[1].appendChild(
    createLink("anilist", "https://anilist.co/home")
  );
  social.childNodes[1].appendChild(
    createLink("letterboxd", "https://letterboxd.com/")
  );
  social.childNodes[1].appendChild(
    createLink("last.fm", "https://www.last.fm/home")
  );
  // Initialising streaming category
  let streaming = createCategory("streaming");
  streaming.childNodes[1].appendChild(
    createLink("youtube", "https://www.youtube.com/")
  );
  streaming.childNodes[1].appendChild(
    createLink(
      "twitch",
      "https://www.twitch.tv/directory/all?sort=VIEWER_COUNT"
    )
  );
  streaming.childNodes[1].appendChild(
    createLink("netflix", "https://www.netflix.com/browse")
  );
  streaming.childNodes[1].appendChild(
    createLink("disney plus", "https://www.disneyplus.com/home")
  );
  // Initialising coding category
  let coding = createCategory("coding");
  coding.childNodes[1].appendChild(createLink("github", "https://github.com/"));
  coding.childNodes[1].appendChild(
    createLink("leetcode", "https://leetcode.com/")
  );
  coding.childNodes[1].appendChild(
    createLink("stackoverflow", "https://stackoverflow.com/")
  );
  coding.childNodes[1].appendChild(
    createLink("w3schools", "https://www.w3schools.com/")
  );
  // Combining into one div
  let newContents = document.createElement("div");
  newContents.appendChild(social);
  newContents.appendChild(streaming);
  newContents.appendChild(coding);
  // Importing into chrome storage
  chrome.storage.sync.set({ linkData: newContents.outerHTML });
}
