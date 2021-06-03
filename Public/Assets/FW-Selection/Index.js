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

async function getFreshwaterFish() {
    let response = await fetch("http://localhost:3000/freshwaterFish", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    });
    return response.json();
}

async function getFreshwaterInvertebrates() {
    let response = await fetch("http://localhost:3000/freshwaterInvertebrates", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    });
    return response.json();
}

async function getFreshwaterPlants() {
    let response = await fetch("http://localhost:3000/freshwaterPlants", {
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
                    labels[i].textContent = "Java Ferns";
                    checkboxes[i].value = "java Fern";
                    break;
                case 1:
                    labels[i].textContent = "Moss Balls";
                    checkboxes[i].value = "moss Ball";
                    break;
                case 2:
                    labels[i].textContent = "Other";
                    checkboxes[i].value = "other";
                    break;
            }
        }
        return await getFreshwaterPlants();
    } else if(animalType == "fish") {
        for(let i=0; i<checkboxes.length; i++) {
            switch(i) {
                case 0:
                    labels[i].textContent = "Mollies";
                    checkboxes[i].value = "molly";
                    break;
                case 1:
                    labels[i].textContent = "Platys";
                    checkboxes[i].value = "platy";
                    break;
                case 2:
                    labels[i].textContent = "Guppies";
                    checkboxes[i].value = "guppy";
                    break;
            }
        }
        return await getFreshwaterFish();
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
        return await getFreshwaterInvertebrates();
    }
}

function getPictureLocation(name) {
    return "/Images/fish/" + name.replace(/\s+/g, '-').toLowerCase() + ".jpg";
}

// sessionStorage.setItem("cart", "");

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