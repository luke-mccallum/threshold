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
    addCategoryInput.value = "Done";
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
  listElement.appendChild(linkElement);
  return listElement;
}

function setLinks() {
  let social = createCategory("social");
  social.childNodes[1].appendChild(
    createLink("linkedin", "https://www.linkedin.com/feed/")
  );
  chrome.storage.sync.set({ linkData: social.outerHTML });
}
