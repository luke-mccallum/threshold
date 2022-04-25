const switcher = document.querySelector('#mode');

switcher.addEventListener('click', function () {
    document.body.classList.toggle('light-mode')

    var className = document.body.className;
    if (className == "dark-mode") {
        this.textContent = "Light Mode";
    } else {
        this.textContent = "Dark Mode";
    }

    console.log("Current Theme: " + this.textContent)
});

var search = document.getElementById("searchTerm");

search.addEventListener("keypress", function (keyPressed) {
    if (keyPressed.key === 'Enter') {
        location.replace("https://www.google.com/search?q=" + search.value + "");
    }
});

search.addEventListener("click", function () {
    search.value = "";
});

const body = document.querySelector('body');
body.addEventListener('load', startTime());
function startTime() {
    const today = new Date();
    document.getElementById("date").innerHTML = today.toDateString();
    document.getElementById("time").innerHTML = today.toLocaleTimeString();
    setTimeout(startTime, 1000);
};