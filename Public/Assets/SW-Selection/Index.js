var inventory = [];
function redirectFishSelection() {
    sessionStorage.setItem("animalType", "fish");
    sessionStorage.setItem("plants", false);
    window.location.href = "/fish-category/";
}

function redirectInvertebrateSelection() {
    sessionStorage.setItem("animalType", "invertebrate");
    sessionStorage.setItem("plants", false);
    window.location.href = "/fish-category";
}

function redirectPlants() {
    sessionStorage.setItem("plants", true);
    window.location.href = "/plants-category";
}
let member = sessionStorage.getItem("member");
if(member == undefined) {
    window.location.href = "/";
} else {
    sessionStorage.setItem("member", member);
}

function redirectHome() {
    if(member == "") {
        window.location.href = "/";
    } else {
        window.location.href = "/customer-home";
    }
}

let animalType = sessionStorage.getItem("animalType");
let isPlants = sessionStorage.getItem("plants");

if(animalType == "fish" && isPlants != "true") {
    document.getElementById("fish-btn").textContent = "Invertebrates";
    document.getElementById("fish-btn").setAttribute("onclick", "redirectInvertebrateSelection();")
} else if(isPlants == "true") {
    document.getElementById("plants-btn").textContent = "Invertebrates";
    document.getElementById("plants-btn").setAttribute("onclick", "redirectInvertebrateSelection();")
}

async function getSaltwaterFish() {
    let response = await fetch("http://localhost:3000/saltwaterFish", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    });
    return response.json();
}

async function getSaltwaterInvertebrates() {
    let response = await fetch("http://localhost:3000/saltwaterInvertebrates", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    });
    return response.json();
}

async function getSaltwaterPlants() {
    let response = await fetch("http://localhost:3000/saltwaterPlants", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    });
    return response.json();
}

async function fetchInfo() {
    let checkboxes = document.getElementsByClassName("checkbox");
    let labels = document.getElementsByClassName("label");
    if(isPlants == "true") {
        for(let i=0; i<checkboxes.length; i++) {
            switch(i) {
                case 0:
                    labels[i].textContent = "Corals";
                    checkboxes[i].value = "coral";
                    break;
                case 1:
                    labels[i].textContent = "Anemones";
                    checkboxes[i].value = "anemone";
                    break;
                case 2:
                    labels[i].textContent = "Other";
                    checkboxes[i].value = "other";
                    break;
            }
        }
        return await getSaltwaterPlants();
    } else if(animalType == "fish") {
        for(let i=0; i<checkboxes.length; i++) {
            switch(i) {
                case 0:
                    labels[i].textContent = "Clown Fish";
                    checkboxes[i].value = "clown";
                    break;
                case 1:
                    labels[i].textContent = "Tangs";
                    checkboxes[i].value = "tang";
                    break;
                case 2:
                    labels[i].textContent = "Damselfish";
                    checkboxes[i].value = "damselfish";
                    break;
            }
        }
        return await getSaltwaterFish();
    } else {
        for(let i=0; i<checkboxes.length; i++) {
            switch(i) {
                case 0:
                    labels[i].textContent = "Shrimps";
                    checkboxes[i].value = "shrimp";
                    break;
                case 1:
                    labels[i].textContent = "Snails";
                    checkboxes[i].value = "snail";
                    break;
                case 2:
                    labels[i].textContent = "Crabs";
                    checkboxes[i].value = "crab";
                    break;
            }
        }
        return await getSaltwaterInvertebrates();
    }
}

function getPictureLocation(name) {
    return "/Images/fish/" + name.replace(/\s+/g, '-').toLowerCase() + ".jpg";
}

async function setup() {
    inventory = await fetchInfo();
    await buildDisplay(inventory);
}

document.addEventListener("keydown", function(event) {
    search();
}, false);

document.addEventListener("keyup", function(event) {
    search();
}, false);

setup();