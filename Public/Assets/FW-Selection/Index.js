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
                    checkboxes[i].value = "Java Fern";
                    break;
                case 1:
                    labels[i].textContent = "Moss Balls";
                    checkboxes[i].value = "Moss Ball";
                    break;
                case 2:
                    labels[i].textContent = "Other";
                    checkboxes[i].value = "Other";
                    break;
            }
        }
        return await getFreshwaterPlants();
    } else if(animalType == "fish") {
        for(let i=0; i<checkboxes.length; i++) {
            switch(i) {
                case 0:
                    labels[i].textContent = "Mollies";
                    checkboxes[i].value = "Molly";
                    break;
                case 1:
                    labels[i].textContent = "Platys";
                    checkboxes[i].value = "Platy";
                    break;
                case 2:
                    labels[i].textContent = "Guppies";
                    checkboxes[i].value = "Guppy";
                    break;
            }
        }
        return await getFreshwaterFish();
    } else {
        for(let i=0; i<checkboxes.length; i++) {
            switch(i) {
                case 0:
                    labels[i].textContent = "Shrimps";
                    checkboxes[i].value = "Shrimp";
                    break;
                case 1:
                    labels[i].textContent = "Snails";
                    checkboxes[i].value = "Snail";
                    break;
                case 2:
                    labels[i].textContent = "Crabs";
                    checkboxes[i].value = "Crab";
                    break;
            }
        }
        return await getFreshwaterInvertebrates();
    }
}

function getPictureLocation(name) {
    return "/Images/fish/" + name.replace(/\s+/g, '-').toLowerCase() + ".jpg";
}

async function search() {
    let searchTerm = document.getElementById("searchbar").value;
    let search = [];
    for(let i=0; i<inventory.length; i++) {
        let name = inventory[i].commonname;
        if(name.indexOf(searchTerm) != -1) {
            search.push(inventory[i]);
        }
    }

    let i = 0;
    let results = document.getElementById("results");
    results.innerHTML = '';
    if(search.length === 0) {
        let message = document.createElement("h2");
        message.textContent = "No items found with that search...";
        message.id = "err-message";
        results.appendChild(message);
        return;
    }
    let amountPerRow = 3;
    var rowObj;
    while(i < search.length) {
        let name = search[i].commonname;
        if(i % amountPerRow == 0) {
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
        img.className = "card-img-top";
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
        text.innerText = search[i].species;
        col1.appendChild(label);
        col1.appendChild(text);
        newRow.appendChild(col1);

        label = document.createElement("p");
        label.className = "label";
        label.innerText = "Genus:";
        text = document.createElement("p");
        text.className = "words";
        text.innerText = search[i].genus;
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
        text.innerText = search[i].phrange;
        col1.appendChild(label);
        col1.appendChild(text);

        label = document.createElement("p");
        label.className = "label";
        label.innerText = "Price:";
        text = document.createElement("p");
        text.className = "words";
        text.innerText = "$" + search[i].price;
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
        text.innerText = search[i].amount;
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
        text.innerText = search[i].description;
        newRow.appendChild(text);
        result.appendChild(newRow);
        
        col.appendChild(result);
        rowObj.appendChild(col);

        i++;
    }

}

async function updateResults() {
    let checkboxes = document.getElementsByClassName("checkbox");
    let checked = [];
    for(let i=0; i<checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            checked.push(checkboxes[i]);
        }
    }
    if(checked.length === 0) {
        await setup();
        return;
    }
    let checkboxSearch = [];
    for(let i=0; i<checked.length; i++) {
        let value = checked[i].value;
        for(let j=0; j<inventory.length; j++) {
            let name = inventory[j].commonname;
            if(name.indexOf(value) != -1) {
                checkboxSearch.push(inventory[j]);
            }
        }
    }

    let i = 0;
    let results = document.getElementById("results");
    results.innerHTML = '';
    let amountPerRow = 3;
    var rowObj;
    while(i < checkboxSearch.length) {
        let name = checkboxSearch[i].commonname;
        if(i % amountPerRow == 0) {
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
        img.className = "card-img-top";
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
        text.innerText = checkboxSearch[i].species;
        col1.appendChild(label);
        col1.appendChild(text);
        newRow.appendChild(col1);

        label = document.createElement("p");
        label.className = "label";
        label.innerText = "Genus:";
        text = document.createElement("p");
        text.className = "words";
        text.innerText = checkboxSearch[i].genus;
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
        text.innerText = checkboxSearch[i].phrange;
        col1.appendChild(label);
        col1.appendChild(text);

        label = document.createElement("p");
        label.className = "label";
        label.innerText = "Price:";
        text = document.createElement("p");
        text.className = "words";
        text.innerText = "$" + checkboxSearch[i].price;
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
        text.innerText = checkboxSearch[i].amount;
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
        text.innerText = checkboxSearch[i].description;
        newRow.appendChild(text);
        result.appendChild(newRow);
        
        col.appendChild(result);
        rowObj.appendChild(col);

        i++;
    }
    
}

async function setup() {
    inventory = await fetchInfo();
    let i = 0;
    let results = document.getElementById("results");
    results.innerHTML = '';
    let amountPerRow = 3;
    var rowObj;
    while(i < inventory.length) {
        let name = inventory[i].commonname;
        if(i % amountPerRow == 0) {
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
        img.className = "card-img-top";
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