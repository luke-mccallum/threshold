light.addEventListener("click", function() {
    chrome.storage.sync.set({colorMode: 'light-mode'})
})
  
dark.addEventListener("click", function() {
    chrome.storage.sync.set({colorMode: 'dark-mode'})
})

rei.addEventListener("click", function() {
  chrome.storage.sync.set({centerImage: "images/main/rei.gif"})
})

skeleton.addEventListener("click", function() {
  chrome.storage.sync.set({centerImage: "images/main/skeleton.gif"})
})

neco.addEventListener("click", function() {
  chrome.storage.sync.set({centerImage: "images/main/neco.gif"})
})

frog.addEventListener("click", function() {
  chrome.storage.sync.set({centerImage: "images/main/frog.gif"})
})

custom.addEventListener("click", function() {
  chrome.storage.sync.set({centerImage: "custom"})
})