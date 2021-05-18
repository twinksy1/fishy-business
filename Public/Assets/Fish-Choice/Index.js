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

sessionStorage.setItem("plants", false);
let animalType = sessionStorage.getItem("animalType");

let fwCard = document.createElement("div");
fwCard.className = "card";
fwCard.id = "card-choice";
let fwImg = document.createElement("img");
let fwTitle = document.createElement("h3");
fwTitle.className = "title";
if(animalType == "fish") {
    fwImg.src = "/Images/freshwater-fish-selection.jpg";
    fwTitle.innerText = "Freshwater Fish";
} else {
    fwImg.src = "/Images/freshwater-invertebrate-selection.jpg";
    fwTitle.innerText = "Freshwater Invertebrates";
}
fwCard.appendChild(fwImg);
fwCard.appendChild(fwTitle);
document.getElementById("freshwater").appendChild(fwCard);

let swCard = document.createElement("div");
swCard.className = "card";
swCard.id = "card-choice";
let swImg = document.createElement("img");
let swTitle = document.createElement("h3");
swTitle.className = "title";
if(animalType == "fish") {
    swImg.src = "/Images/saltwater-fish-selection.jpg";
    swTitle.innerText = "Saltwater Fish";
} else {
    swImg.src = "/Images/saltwater-invertebrate-selection.jpg";
    swTitle.innerText = "Saltwater Invertebrates";
}
swCard.appendChild(swImg);
swCard.appendChild(swTitle);
document.getElementById("saltwater").appendChild(swCard);

if(animalType == "fish") {
    document.getElementById("fish-btn").textContent = "Invertebrates";
    document.getElementById("fish-btn").setAttribute("onclick", "redirectInvertebrateSelection();")
    sessionStorage.setItem("plants", false);
} else if(animalType == "invertebrate") {
    sessionStorage.setItem("plants", false);
}