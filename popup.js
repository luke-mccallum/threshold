light.addEventListener("click", function() {
    chrome.storage.sync.set({colorMode: 'light-mode'})
})
  
dark.addEventListener("click", function() {
    chrome.storage.sync.set({colorMode: 'dark-mode'})
})