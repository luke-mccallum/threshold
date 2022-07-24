'use strict';

// Switching between light and dark mode
const MODE_SWITCH = document.querySelector('#mode');
MODE_SWITCH.addEventListener('click', function () {
    document.body.classList.toggle('light-mode')
    let className = document.body.className;
    if (className == "dark-mode") {
        this.textContent = "Light Mode";
    } else {
        this.textContent = "Dark Mode";
    }
    console.log("Current Theme: " + this.textContent)
});

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