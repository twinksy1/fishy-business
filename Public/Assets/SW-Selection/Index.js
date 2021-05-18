function redirectSelection() {
    let animalType = sessionStorage.getItem("animalType");
    if(animalType == "invertebrate") {
        sessionStorage.setItem("animalType", "fish");
    } else {
        sessionStorage.setItem("animalType", "invertebrate");
    }
    window.location.href = "/fish-category";
}

function redirectPlants() {
    window.location.href = "/plants-category";
}

let animalType = sessionStorage.getItem("animalType");
if(animalType == "invertebrate") {
    document.getElementById("fish-btn").textContent = "Fish";
} else {
    document.getElementById("fish-btn").textContent = "Invertebrates";
}