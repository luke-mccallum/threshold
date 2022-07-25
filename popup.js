light.addEventListener("click", function() {
    chrome.storage.sync.set({colorMode: 'light-mode'})
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
})
  
dark.addEventListener("click", function() {
    chrome.storage.sync.set({colorMode: 'dark-mode'})
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
})