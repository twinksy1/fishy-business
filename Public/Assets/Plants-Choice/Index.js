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

sessionStorage.setItem("plants", true);
sessionStorage.setItem("animalType", "");
let fwCard = document.createElement("div");
fwCard.className = "card";
fwCard.id = "card-choice";
let fwImg = document.createElement("img");
let fwTitle = document.createElement("h3");
fwTitle.className = "title";
fwImg.src = "/Images/freshwater-plants-selection.jpg";
fwTitle.innerText = "Freshwater Plants";

fwCard.appendChild(fwImg);
fwCard.appendChild(fwTitle);
document.getElementById("freshwater").appendChild(fwCard);

let swCard = document.createElement("div");
swCard.className = "card";
swCard.id = "card-choice";
let swImg = document.createElement("img");
let swTitle = document.createElement("h3");
swTitle.className = "title";
swImg.src = "/Images/saltwater-plants-selection.jpg";
swTitle.innerText = "Saltwater Plants";

swCard.appendChild(swImg);
swCard.appendChild(swTitle);
document.getElementById("saltwater").appendChild(swCard);