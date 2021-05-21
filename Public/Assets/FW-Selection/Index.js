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
    console.log(response.json());
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
    console.log(response.json());
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
    console.log(response.json());
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
    console.log(response.json());
}

getFreshwaterFish();