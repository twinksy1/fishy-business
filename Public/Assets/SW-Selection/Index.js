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
    console.log(response.json)
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
    if(isPlants == "true") {
        return await getSaltwaterPlants();
    } else if(animalType == "fish") {
        return await getSaltwaterFish();
    } else {
        return await getSaltwaterInvertebrates();
    }
}

function getPictureLocation(name) {
    return "/Images/fish/" + name.replace(/\s+/g, '-').toLowerCase() + ".jpg";
}

async function setup() {
    inventory = await fetchInfo();
    let i = 0;
    let results = document.getElementById("results");
    console.log(inventory);
    var rowObj;
    while(i < inventory.length) {
        let name = inventory[i].commonname;
        if(i % 3 == 0) {
            results.appendChild(document.createElement("br"));
            rowObj = document.createElement("div");
            rowObj.className = "row";
            results.appendChild(rowObj);
        }
        let col = document.createElement("div");
        col.className = "col-4";
        let result = document.createElement("div");
        result.className = "card";
        result.id = "result";
        let title = document.createElement("h5");
        title.className = "result-title";
        title.textContent = name;
        let img = document.createElement("img");
        img.src = getPictureLocation(name);
        result.appendChild(img);
        result.appendChild(title);

        let newRow = document.createElement("div");
        let col1 = document.createElement("div");
        let col2 = document.createElement("div");
        newRow.className = "row";
        newRow.id = "details-row";
        col1.className = "col-6";
        col1.id = "details-row";
        col2.className = "col-6";
        col2.id = "details-row";
        let label = document.createElement("p");
        label.className = "label";
        label.innerText = "Species:";
        let text = document.createElement("p");
        text.className = "words";
        text.innerText = inventory[i].species;
        col1.appendChild(label);
        col1.appendChild(text);
        newRow.appendChild(col1);

        label = document.createElement("p");
        label.className = "label";
        label.innerText = "Genus:";
        text = document.createElement("p");
        text.className = "words";
        text.innerText = inventory[i].genus;
        col2.appendChild(label);
        col2.appendChild(text);
        newRow.appendChild(col1);
        newRow.appendChild(col2);
        result.appendChild(newRow);

        newRow = document.createElement("div");
        col1 = document.createElement("div");
        col2 = document.createElement("div");
        newRow.className = "row";
        newRow.id = "details-row";
        col1.className = "col-6";
        col1.id = "details-row";
        col2.className = "col-6";
        col2.id = "details-row";
        label = document.createElement("p");
        label.className = "label";
        label.innerText = "PH Range:";
        text = document.createElement("p");
        text.className = "words";
        text.innerText = inventory[i].phrange;
        col1.appendChild(label);
        col1.appendChild(text);

        label = document.createElement("p");
        label.className = "label";
        label.innerText = "Price:";
        text = document.createElement("p");
        text.className = "words";
        text.innerText = "$" + inventory[i].price;
        col2.appendChild(label);
        col2.appendChild(text);
        newRow.appendChild(col1);
        newRow.appendChild(col2);
        result.appendChild(newRow);

        newRow = document.createElement("div");
        col1 = document.createElement("div");
        col2 = document.createElement("div");
        newRow.className = "row";
        newRow.id = "details-row";
        col1.className = "col-6";
        col1.id = "details-row";
        col2.className = "col-6";
        col2.id = "details-row";
        label = document.createElement("p");
        label.className = "label";
        label.innerText = "In-Stock:";
        text = document.createElement("p");
        text.className = "words";
        text.innerText = inventory[i].amount;
        col1.appendChild(label);
        col1.appendChild(text);

        newRow.appendChild(col1);
        result.appendChild(newRow);

        result.appendChild(document.createElement("hr"));

        newRow = document.createElement("div");
        newRow.className = "row";
        newRow.id = "details-row";
        text = document.createElement("p");
        text.className = "description";
        text.innerText = inventory[i].description;
        newRow.appendChild(text);
        result.appendChild(newRow);
        
        col.appendChild(result);
        rowObj.appendChild(col);

        i++;
    }
}

setup();