'use strict'

// Activating light or dark mode
window.onload =  function () {
    chrome.storage.sync.get(['colorMode'], function(response) {
        console.log('Successfully loaded ' + response.colorMode)
        document.body.className = (response.colorMode)
    })
}

// Google search functionality
let search = document.getElementById("searchTerm");
search.addEventListener("keypress", function (keyPressed) {
    if (keyPressed.key === 'Enter') {
        keyPressed.preventDefault();
        location.replace("https://www.google.com/search?q=" + search.value + "");
    }
});

// Date and time
const BODY = document.querySelector('body');
BODY.addEventListener('load', startTime());
function startTime() {
    const DATE = new Date();
    document.getElementById("date").innerHTML = DATE.toDateString();
    document.getElementById("time").innerHTML = DATE.toLocaleTimeString();
    setTimeout(startTime, 1000);
};