'use strict'

const switcher = document.querySelector('#mode');

switcher.addEventListener('click', function() {
    document.body.classList.toggle('light-mode')

    var className = document.body.className;
    if(className == "dark-mode") {
        this.textContent = "Light";
    } else {
        this.textContent = "Dark";
    }

    console.log("Current Theme: " + this.textContent)
});